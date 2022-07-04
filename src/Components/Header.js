import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gravatar from '../0-Services/gravatarAPI';
import '../CSS/header.css';

const mapStateToProps = (state) => ({ player: state.player, score: state.score });

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    return (
      <header className="header-profile">
        <div className="profile-container">
          <img
            data-testid="header-profile-picture"
            src={ gravatar.getImage(gravatarEmail) }
            alt={ name }
            className="header-profile-img"
          />
          <h2 data-testid="header-player-name" className="profile-name">{name}</h2>
        </div>
        <p data-testid="header-score" className="profile-score">{score}</p>
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
