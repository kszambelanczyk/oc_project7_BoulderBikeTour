import React from 'react';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import userIcon from '@iconify/icons-el/user';
import mapMarker from '@iconify/icons-mdi/map-marker';

// import 'simplebar/dist/simplebar.min.css';

class RidersList extends React.Component {
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

  riderClicked = (r,e) => {
    e.preventDefault()
    this.setState(prevState => ({currentRider: r}))
  }

  riderPositionClicked = (r,e) => {
    console.log(`posiotion of ${r.first_name}`)
    e.preventDefault()
  }

  resetSelectedRider = () => {
    this.setState(prevState => ({currentRider: null}))
  }  

  render() {
    const { riders, currentRider } = this.state;
    // console.log(currentRider);
    const ridersRows = riders.map((r)=> 
      <div key={r.id} className="riders-row">
        <div>{r.id}</div>
        <div><a onClick={(e)=> {this.riderClicked(r,e)}}>{r.first_name} {r.last_name}</a></div>
        <div><a onClick={(e)=> {this.riderPositionClicked(r,e)}}><Icon icon={mapMarker} /></a></div>
      </div>
    );

    let currentRiderPlace;
    if(currentRider) {
      currentRiderPlace = (
        <div className="rider-data">
          <p>
            <Icon icon={userIcon} />
          </p>
          <p>
            {currentRider.first_name} {currentRider.last_name}
          </p>
          <p>
            {currentRider.city}, {currentRider.state}
          </p>
          <p>
          <a onClick={(e)=> {this.riderPositionClicked(currentRider,e)}}>show on map</a>
          </p>
        </div>
      );
    } else {
      currentRiderPlace = <div></div>;
    }

    return (
      <>
        <h2>Riders</h2>
        <div className="parent-container">
          <div className={`riders-wrapper ${currentRider ? "hide" : "active"}`}>
            <div className="list-header">
              <div>Participants: {riders.length}</div>
              <div><input type="text" placeholder="Find"/></div>
            </div>
            <SimpleBar style={{ maxHeight: 400 }} className="riders-list-wrapper">
              <div className="riders-grid">
                  {ridersRows}
              </div>
            </SimpleBar>
          </div>

          <div className={`details-wrapper ${currentRider ? "active" : "hide"}`}>
            <a onClick={this.resetSelectedRider}>&lt;- return to list</a>
            {currentRiderPlace}
          </div>
        </div>
      </>
    );
  }
}

export default RidersList;