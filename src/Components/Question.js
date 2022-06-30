import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../3-actions';
import '../CSS/AnswersStyle.css';

const mapDispatchToProps = (dispatch) => ({
  addAssertions: () => dispatch(actions.addAssertion()),
});
class Question extends Component {
state = {
  styleTrue: '',
  styleFalse: '',
}

  handleClick = ({ target: { value } }) => {
    const { addAssertions } = this.props;
    if (value === 'true') {
      // atualizar assertions
      addAssertions();
      this.setState({ styleFalse: 'false', styleTrue: 'true' });
      // parar timer
      // aparecer botão next para prox pergunta
    } else {
      this.setState({ styleFalse: 'false', styleTrue: 'true' });
      // parar o timer
      // aparecer botão next para prox pergunta
    }
  }

  manageAnswer = (ask) => {
    const correctAnswer = {
      isCorrect: true,
      index: ask.incorrect_answers.length,
      answer: ask.correct_answer,
    };
    const wrongAnswers = ask.incorrect_answers.map((answer, i) => ({
      isCorrect: false,
      index: i,
      answer,
    }));
    const answerList = [...wrongAnswers, correctAnswer];
    return answerList;
  }

  shuffleQuestions = (answers) => {
    const managedAnswers = this.manageAnswer(answers);
    let copy = [...managedAnswers];
    const shuffledAnswers = managedAnswers.map(() => {
      const position = Math.floor(Math.random() * copy.length);
      const selectedAnswer = copy[position];
      copy[position] = '';
      copy = copy.filter((item) => item !== '');
      return selectedAnswer;
    });
    return shuffledAnswers;
  }

  render() {
    const { ask } = this.props;
    const { styleFalse, styleTrue } = this.state;
    return (
      <div>
        <p datatest-id="question-category">{ask.category}</p>
        <p datatest-id="question-text">{ask.question}</p>
        <div>
          {
            this.shuffleQuestions(ask).map((option) => (
              <button
                type="button"
                key={ option.index }
                value={ option.isCorrect }
                onClick={ this.handleClick }
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
  addAssertions: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Question);
