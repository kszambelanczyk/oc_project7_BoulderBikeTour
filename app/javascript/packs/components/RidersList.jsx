import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import userIcon from '@iconify/icons-el/user';
import mapMarker from '@iconify/icons-mdi/map-marker';
import { setRiders, showLocation } from '../redux/actions';

// import 'simplebar/dist/simplebar.min.css';

class RidersList extends React.Component {
  state = {
    // riders: [],
    currentRider: null
  };

  componentDidMount() {
    axios.get(`/api/riders`)
      .then(res => {
        const {riders, bounds} = res.data;
        // this.setState({ riders });
        this.props.setRiders([...riders],{...bounds});
      });
  }

  riderClicked = (r,e) => {
    e.preventDefault()
    this.setState(prevState => ({currentRider: r}))
  }

  riderPositionClicked = (r,e) => {
    e.preventDefault()

    let mapEl = document.getElementById("riders-map");
    mapEl.scrollIntoView();
    this.props.showLocation(r.id)
  }

  resetSelectedRider = () => {
    this.setState(prevState => ({currentRider: null}))
  }  

  render() {
    const { riders } = this.props;
    const { currentRider } = this.state;
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


const mapStateToProps = state => {
  return {
    riders: state.riders
  }  
}
const mapDispatchToProps = dispatch => ({
  setRiders: (riders,bounds) => dispatch(setRiders(riders,bounds)),
  showLocation: (riderId) => dispatch(showLocation(riderId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RidersList);