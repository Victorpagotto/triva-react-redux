import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import GameHeader from '../Components/GameHeader';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const RATE = 3;
    return (
      <div>
        <GameHeader />
        <div>
          <p data-testid="feedback-text">
            {
              assertions >= RATE
                ? 'Well Done!'
                : 'Could be better...'
            }
          </p>
        </div>
        <div>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{assertions}</span>
            questões,
          </p>
          <p>
            obtendo um total de
            <span data-testid="feedback-total-score">{score}</span>
            pontos!
          </p>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/Ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { assertions, score } = state.player;
  return {
    assertions,
    score,
  };
};

export default connect(mapStateToProps)(Feedback);
