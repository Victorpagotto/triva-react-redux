import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Game extends Component {
  render() {
    return (
      <Header />
    );
  }
}

Game.propTypes = {

};

export default connect()(Game);
