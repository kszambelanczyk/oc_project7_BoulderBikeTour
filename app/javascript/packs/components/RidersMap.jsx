import React from 'react';
import { connect } from 'react-redux';

class RidersMap extends React.Component {
  state = {
    zoom: 13,
    lat: 39.5,
    lng: 40.5,
    map: null,
    markers: []
  }

  componentDidMount() {
    L.mapquest.key = 'j5fTR26X7EY4LthgZiw5hFFFLGplqQWE';

    let directions = L.mapquest.directions();
    directions.route({
      start: [40,-105],
      end: [39.93,-105.5]
    }, (err, response)=>{

      let mymap = L.mapquest.map('mapquest-place', {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
      });
  
      this.setState(()=>({map: mymap}));

      let customLayer = L.mapquest.directionsLayer({
        startMarker: {
          icon: 'circle',
          iconOptions: {
            size: 'sm',
            primaryColor: '#1fc715',
            secondaryColor: '#1fc715',
            symbol: 'S',
            draggable: false
          },
          title: 'START'
        },
        endMarker: {
          icon: 'circle',
          iconOptions: {
            size: 'sm',
            primaryColor: '#e9304f',
            secondaryColor: '#e9304f',
            symbol: 'F',
            draggable: false
          },
          title: 'FINISH'
        },
        routeRibbon: {
          color: "#2aa6ce",
          opacity: 1.0,
          showTraffic: false,
          draggable: false
        },
        viaMarker: {
          draggable: false
        },
        directionsResponse: response
      });
      customLayer.addTo(mymap);    
      
      const { riders } = this.props;
      if(riders.length>0){
        this.generaterMarkers();
        this.centerMap();
      }

    });

  }


  componentDidUpdate(prevProps) {
    if (prevProps.riders !== this.props.riders && this.props.riders.length>0) {
      const { map } = this.state;
      if(map) { // map could not exist yet
        this.generaterMarkers();
        this.centerMap();
      }
    }

    if (prevProps.showRiderId !== this.props.showRiderId && this.props.showRiderId!=null) {
      this.zoomToRider();
    }
  }

  zoomToRider(){
    const { showRiderId, riders } = this.props;
    const { map } = this.state;
    let rider = riders.find((r)=>(r.id==showRiderId));
    map.flyTo(L.latLng(rider.lat, rider.lng), 13);
   }

  generaterMarkers(){
    const { riders } = this.props;
    const { map } = this.state;
    let markers = riders.map((r)=>{
      const marker = L.marker([r.lat, r.lng],{

      }).addTo(map);
      marker.bindPopup(`${r.first_name} ${r.last_name}`);
      return marker;
    });
    this.setState(()=>({markers: markers}));
  }

  centerMap(){
    const { map } = this.state;
    const { bounds } = this.props;
    const corner1 = L.latLng(bounds.min_lat, bounds.min_lng);
    const corner2 = L.latLng(bounds.max_lat, bounds.max_lng);
    map.fitBounds(L.latLngBounds(corner1, corner2));
  }

  render() {
    // const { riders, bounds, showRiderId } = this.props;
    // const boundsData = [[bounds.min_lat, bounds.min_lng], [bounds.max_lat, bounds.max_lng]];
    // let position = null;

    // if(showRiderId){
    //   let rider = riders.find((r)=>(r.id==showRiderId));
    //   position = [rider.lat, rider.lng];
    // }

    return (
      <>
        <h2>Rider locations</h2>
        <div id="mapquest-place"></div>
        {/* <Map center={position} zoom={this.state.zoom} bounds={boundsData} >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerList riders={riders} />
        </Map> */}


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
