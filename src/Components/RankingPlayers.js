import React, { Component } from 'react';
import gravatar from '../0-Services/gravatarAPI';

class RankingPlayers extends Component {
getPlayers = () => {
  const players = JSON.parse(localStorage.getItem('user'));
  if (players !== null) {
    return players;
  }
  return [];
}

render() {
  return (
    <div>
      {(this.getPlayers().sort((a, b) => b - a)).map((player, index) => (
        <div
          key={ index }
        >
          <img
            data-testid="header-profile-picture"
            src={ gravatar.getImage(player.gravatarEmail) }
            alt={ player.name }
          />
          <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
          <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
        </div>
      ))}

    </div>
  );
}
}

export default RankingPlayers;
