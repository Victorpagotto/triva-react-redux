import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import '../CSS/feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const RATE = 3;
    return (
      <div className="feedback-page">
        <Header />
        <div className="feedback-container">
          <div className="feedback-text">
            <p data-testid="feedback-text">
              {
                assertions >= RATE
                  ? 'Well Done!'
                  : 'Could be better...'
              }
            </p>
          </div>
          <div className="feedback-assertion">
            <p>
              <span data-testid="feedback-total-question">{assertions}</span>
              questions were right,
            </p>
            <p className="feedback-score">
              obtaining a total of
              <span data-testid="feedback-total-score">{score}</span>
              points!
            </p>
          </div>
          <div className="feedback-button-container">
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
