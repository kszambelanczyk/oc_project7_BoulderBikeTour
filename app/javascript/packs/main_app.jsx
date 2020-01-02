// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import RidersList from './components/RidersList';
import RidersMap from './components/RidersMap';
import Photos from './components/Photos';
import Counter from './components/Counter';

// const Hello = props => (
//   <div>Hello {props.name}!</div>
// )

// Hello.defaultProps = {
//   name: 'David'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

// const Hello2 = () => (
//   <div>Hello2!</div>
// )

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <RidersList />,
    document.getElementById('riders-list-place'),
  )

  ReactDOM.render(
    <RidersMap />,
    document.getElementById('riders-map-place'),
  )

  ReactDOM.render(
    <Photos />,
    document.getElementById('photos-map-place'),
  )

  ReactDOM.render(
    <Counter />,
    document.getElementById('counter-app'),
  )

})


