import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../3-actions';

const mapDispatchToProps = (dispatch) => ({
  addAssertions: () => dispatch(actions.addAssertion()),
});

class Question extends Component {

  generateBtt = () => {
    // declara uma array vazio
    // declarei uma função de numero aleatorio de 1 a 4
    // declara uma função pra preencher o array
    // retorna 4 botoẽs;
  }
  handleClick = (e) => {
    const { addAssertions } = this.props;
    if (e.target['data-testid'] === 'correct-answer') {
      // atualizar assertions
      addAssertions();
      // mudar cor respostas
      // parar timer
      // aparecer botão next para prox pergunta
    } else {
      // mudar cor das respotas
      // parar o timer
      // aparecer botão next para prox pergunta
    }
  }

  render() {
    const { ask } = this.props;

    return (
      <div>
        <p datatest-id="question-category">{ask.category}</p>
        <p datatest-id="question-text">{ask.question}</p>
        <div datatest-id="answer-options">
          {ask.type === 'boolean' ? (
            <>
              <button
                onClick={ this.handleClick }
                type="button"
                data-testid={ () => (ask.correct_answer === 'True' ? 'correct-answer'
                  : 'wrong-answer-0') }
              >
                True
              </button>

              <button
                onClick={ this.handleClick }
                type="button"
                data-testid={ () => (ask.correct_answer === 'False' ? 'correct-aswer'
                  : 'wrong-answer-0') }
              >
                False
              </button>
            </>
          ) : (
            generateBtt()
          )}
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
