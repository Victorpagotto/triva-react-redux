import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameHeader from '../Components/GameHeader';

class Game extends Component {
  render() {
    return (
      <GameHeader />
    );
  }
}

Game.propTypes = {

};

export default connect()(Game);
