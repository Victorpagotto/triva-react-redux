import React, { Component } from 'react';

class RankingPlayers extends Component {
  render() {
    return (
      <div>
        <div
          key={ index }
        >
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt={ players.name }
          />
          <h3>{players.name}</h3>
          <h3>{players.score}</h3>
        </div>

      </div>
    );
  }
}

RankingPlayers.propTypes = {
  player: PropTypes.shape({
    map: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(RankingPlayers);
