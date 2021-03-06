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
import Contest from './components/Contest';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './redux/reducers';

const store = createStore(reducer);


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <RidersList />
    </Provider>,
    document.getElementById('riders-list-place'),
  )

  ReactDOM.render(
    <Provider store={store}>
      <RidersMap />
    </Provider>,
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

  ReactDOM.render(
    <Contest />,
    document.getElementById('contest-place'),
  )

})


