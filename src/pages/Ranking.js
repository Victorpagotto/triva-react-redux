import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        <h1>Ranking</h1>
        <img src="" alt="Imagem do Jogador" />
        <h3 data-testid="player-name">{name}</h3>
        <h3 data-testid="player-score">{score}</h3>

        <Link to="/Login">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Go home
          </button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Ranking);
