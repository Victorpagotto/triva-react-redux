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
    const playersSortedByScore = this.getPlayers().sort((a, b) => b.score - a.score);
    return (
      <div className="rank-list-container">
        {playersSortedByScore.map((player, index) => (
          <div
            key={ index }
            className="rank-container"
          >
            <div className="rank">
              <p>{ `${index + 1}º` }</p>
            </div>
            <img
              data-testid="header-profile-picture"
              src={ gravatar.getImage(player.gravatarEmail) }
              alt={ player.name }
              className="player-img-ranking"
            />
            <h3
              data-testid={ `player-name-${index}` }
              className="playername-ranking"
            >
              {player.name}
            </h3>
            <h3
              data-testid={ `player-score-${index}` }
              className="player-score-ranking"
            >
              {player.score}
            </h3>
          </div>
        ))}
      </div>
    );
  }
}

export default RankingPlayers;
