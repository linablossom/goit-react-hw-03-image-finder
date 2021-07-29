import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    page: 1,
    query: "",
    showModal: false,
    activeImageId: 0,
    loading: false,
  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data !== prevState.data) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  getImages = async () => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=22358889-96b0c16e8ac0685cc0e479941&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        data: [...this.state.data, ...response.data.hits],
        page: this.state.query ? 1 : this.state.page,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchImages = (keyword) => {
    console.log(keyword);
    if (keyword) {
      return this.setState({ query: keyword, data: [] }, this.getImages);
    }
  };

  loadMoreImages = () => {
    this.setState({ page: this.state.page + 1 }, this.getImages);
  };

  openModal = (e) => {
    const id = e.target.dataset.imageid;
    this.setState({
      showModal: true,
      activeImageId: id,
    });
  };

  closeModal = (e) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { data, showModal, activeImageId, loading } = this.state;
    const searchImages = this.searchImages;
    const loadMoreImages = this.loadMoreImages;
    const openModal = this.openModal;
    const closeModal = this.closeModal;

    return (
      <>
        <Searchbar onSubmit={searchImages} />
        {data ? <ImageGallery images={data} onClick={openModal} /> : null}
        {showModal && (
          <Modal images={data} imgId={activeImageId} onClick={closeModal} />
        )}
        {loading ? <Loader /> : <Button onClick={loadMoreImages} />}
      </>
    );
  }
}

export default App;
