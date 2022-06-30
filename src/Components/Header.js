import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gravatar from '../0-Services/gravatarAPI';

const mapStateToProps = (state) => ({ player: state.player });

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatar.getImage(gravatarEmail) }
          alt={ name }
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}
Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, null)(Header);
