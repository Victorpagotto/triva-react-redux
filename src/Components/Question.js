import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../3-actions';
import '../CSS/AnswersStyle.css';
import counterKit from '../0-Services/counterKit';

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
    paused: false,
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

  calculateScore = () => {
    const { timer, difficulties } = this.state;
    const { ask } = this.props;
    const BASESCORE = 10;
    return BASESCORE + (timer * difficulties[ask.difficulty]);
  }

  answerQuestion = ({ target: { value } }) => {
    const { addAssertions, updateScore } = this.props;
    const { paused } = this.state;
    this.setState({ timeOut: true }, () => {
      counterKit.pauseControl(this, paused);
      if (value === 'true') {
        // atualizar assertions
        addAssertions();
        updateScore(this.calculateScore());
        this.setState({ styleFalse: 'false', styleTrue: 'true' });
        // aparecer botão next para prox pergunta
      } else {
        this.setState({ styleFalse: 'false', styleTrue: 'true' });
        // parar o timer
        // aparecer botão next para prox pergunta
      }
    });
  }

  render() {
    const { ask, answers, nextQuestion } = this.props;
    const { styleFalse, styleTrue, timer, timeOut } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ask.category}</p>
        <p data-testid="question-text">{ask.question}</p>
        <p>
          Tempo Restante:
          <span>
            { timeOut ? 'over' : timer }
          </span>
        </p>
        <div data-testid="answer-options">
          {
            answers.map((option) => (
              <button
                type="button"
                key={ option.index }
                value={ option.isCorrect }
                onClick={ this.answerQuestion }
                disabled={ timeOut }
                className={
                  option.isCorrect
                    ? styleTrue
                    : styleFalse
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
