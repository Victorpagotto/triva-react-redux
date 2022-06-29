import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ player: state.player });

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
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
