import React from 'react';
import axios from 'axios';


class Photos extends React.Component {
  state = {
    riders: [],
    currentRider: null,
  };

  componentDidMount() {
    axios.get(`/api/riders`)
      .then(res => {
        const {riders} = res.data;
        this.setState({ riders });
      });
  }


  render() {

    return (
      <>
        <h2>Photos</h2>
      </>
    );
  }
}

export default Photos;