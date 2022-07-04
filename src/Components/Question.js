import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../3-actions';
import counterKit from '../0-Services/counterKit';
import '../CSS/game.css';
import '../CSS/AnswersStyle.css';

const mapDispatchToProps = (dispatch) => ({
  addAssertions: () => dispatch(actions.addAssertion()),
  updateScore: (score) => dispatch(actions.updateScore(score)),
});

class Question extends Component {
  state = {
    styleTrue: '',
    styleFalse: '',
    timer: 10,
    timeOut: false,
    difficulties: {
      easy: 1,
      medium: 2,
      hard: 3,
    },
  }

  counter = null

  componentDidMount() {
    counterKit.startControl(this);
  }

  componentWillUnmount() {
    counterKit.pauseControl(this);
  }

  calculateScore = () => {
    const { timer, difficulties } = this.state;
    const { ask } = this.props;
    const BASESCORE = 10;
    return BASESCORE + (timer * difficulties[ask.difficulty]);
  }

  answerQuestion = ({ target: { value } }) => {
    const { addAssertions, updateScore } = this.props;
    this.setState({ timeOut: true }, () => {
      counterKit.pauseControl(this);
      this.setState({ styleFalse: 'false', styleTrue: 'true' });
      if (value === 'true') {
        // atualizar assertions
        addAssertions();
        updateScore(this.calculateScore());
        // aparecer botão next para prox pergunta
      }
    });
  }

  render() {
    const { ask, answers, nextQuestion } = this.props;
    const { styleFalse, styleTrue, timer, timeOut } = this.state;
    const REDTIMER = 11;
    return (
      <div className="game-container">
        <p
          data-testid="question-category"
          className="category-name"
        >
          {ask.category}
        </p>
        <p
          className={ `${timer < REDTIMER || timeOut
            ? 'timer-color-ending'
            : 'timer-color-normal'} timer-text` }
        >
          { timeOut ? 'OVER' : timer }
        </p>
        <p data-testid="question-text" className="question-text">{ask.question}</p>
        <div data-testid="answer-options" className="answer-list-container">
          {
            answers.map((option) => (
              <button
                type="button"
                key={ option.index }
                value={ option.isCorrect }
                onClick={ this.answerQuestion }
                disabled={ timeOut }
                className={
                  `${option.isCorrect
                    ? styleTrue
                    : styleFalse} answer-container`
                }
                data-testid={
                  option.isCorrect
                    ? 'correct-answer'
                    : `wrong-answer-${option.index}`
                }
              >
                { option.answer }
              </button>
            ))
          }
        </div>
        <div>
          { timeOut
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => nextQuestion() }
              className="next-button"
            >
              Next
            </button>
          ) }
        </div>
      </div>
    );
  }
}
Question.propTypes = {
  ask: propTypes.shape({
    category: propTypes.string.isRequired,
    question: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    difficulty: propTypes.string.isRequired,
    correct_answer: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  answers: propTypes.arrayOf(propTypes.object).isRequired,
  addAssertions: propTypes.func.isRequired,
  updateScore: propTypes.func.isRequired,
  nextQuestion: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Question);
