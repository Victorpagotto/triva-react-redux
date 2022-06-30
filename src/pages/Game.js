import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
// import Score from '../Components/Score';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Game.propTypes = {

};

export default connect()(Game);
