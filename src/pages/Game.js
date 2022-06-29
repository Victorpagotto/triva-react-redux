import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameHeader from '../Components/Header';

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
