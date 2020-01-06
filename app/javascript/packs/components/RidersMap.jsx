import React from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


const MyPopupMarker = (props) => {
  const { position, content } = props;
  return (
    <Marker position={position}>
      <Popup>{content}</Popup>
    </Marker>
  )
}

const MarkerList = (props)=> {
  const items = props.riders.map((r) => {
    return (
      <MyPopupMarker key={r.id} position={[r.lat, r.lng]} content={`${r.first_name} ${r.last_name}`}/>
    )
  })
  return <>{items}</>  
}

class RidersMap extends React.Component {
  state = {
    zoom: 13,
    lat: 39.5,
    lng: 40.5
  }

  render() {
    const { riders, bounds, showRiderId } = this.props;
    const boundsData = [[bounds.min_lat, bounds.min_lng], [bounds.max_lat, bounds.max_lng]];
    let position = null;

    if(showRiderId){
      let rider = riders.find((r)=>(r.id==showRiderId));
      position = [rider.lat, rider.lng];
    }

    return (
      <>
        <h2>Rider locations</h2>
        <Map center={position} zoom={this.state.zoom} bounds={boundsData} >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerList riders={riders} />
        </Map>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    riders: state.riders,
    bounds: state.bounds,
    showRiderId: state.showRiderId,
  }  
}

export default connect(
  mapStateToProps,
  null
)(RidersMap);
