import React from 'react';
import axios from 'axios';
import Gallery from 'react-grid-gallery';

class Photos extends React.Component {
  state = {
    loading: false,
    riders: [],
    currentRider: null,
    flickrMethod: 'flickr.photos.search',
    photosPerPage: 10,
    page: 1,
    maxPage: 0,
    tags: 'bikerace,BoulderBikeTour',
    images: [],
    isLoading: true,
  };

  componentDidMount() {
    const { page } = this.state;
    this.loadImages(page);
  }

  loadImages = (page) => {
    const { flickrMethod, photosPerPage, tags } = this.state;
    this.setState(() => ({isLoading: true}),()=>{
      try {
        axios.get(`https://api.flickr.com/services/rest/?api_key=f4e01b75130e0c7dc07478c3b1ed7fa7&format=json&nojsoncallback=true&method=${flickrMethod}&per_page=${photosPerPage}&page=${page}&extras=o_dims,url_l,url_s&tags=${tags}`)
        .then(res => {
          if(res.status==200 && res.data.stat=="ok"){
            this.fillImages(res.data.photos);
          }
        });
      } 
      catch(error) {
        console.error(error);
      }
      finally {
        this.setState(() => ({isLoading: false}));
      }
    });
  }

  fillImages = (data) => {
    this.setState(() => ({
      images: data.photo.map((item)=>({
        src: item.url_l || item.url_s,
        thumbnail: item.url_s,
        thumbnailWidth: item.width_s,
        thumbnailHeight: item.height_s
      })),
      maxPage: data.pages,
      page: data.page
    }));
  }

  nextClicked = () => {
    let {page, maxPage, isLoading} = this.state;
    if(isLoading){ return };
    if(page<maxPage){
      this.loadImages(page+1);
    }

  }

  prevClicked = () => {
    const {page, isLoading} = this.state;
    if(isLoading){ return };
    if(page>1){
      this.loadImages(page-1);
    }
  }


  render() {
    const { images, page, isLoading } = this.state;

    let loadingIndicator = <div></div>;
    if(isLoading){
      loadingIndicator =  (
        <div className="overlay">Loading...</div>
      )
    }
  
    return (
      <>
        <h2>Photos</h2>
        <div className="gallery-place">
          <Gallery images={images} enableImageSelection={false}/>
          {loadingIndicator}
        </div>
        <div className="gallery-links">
          <span>Page {page}</span>
          <span><a onClick={()=>{this.prevClicked()}}>Prev</a></span>
          <span><a onClick={()=>{this.nextClicked()}}>Next</a></span>
        </div>
      </>
    );
  }
}

export default Photos;