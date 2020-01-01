import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { withRouter } from 'react-router';

// import Header from './Header';
// import Three from './Three';
// import MainTitle from './MainTitle';
// import Footer from './Footer';
// import About from './About';
// import Contact from './Contact';
// import Portfolio from './Portfolio';

class Main extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {

    return (
      <div className="main-container">
        Main app

      </div>
    );
  }
}

export default withRouter(Main);