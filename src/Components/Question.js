import React, { Component } from 'react';
import propTypes from 'prop-types';

class Question extends Component {
  render() {
    const {
      question: {
        category,
        question,
        // type,
        // difficulty,
        // correct_answer,
        // incorrect_answers,
      },
    } = this.props;

    return (
      <div>
        <p datatest-id="question-category">{category}</p>
        <p datatest-id="question-text">{question}</p>
        {/* <div datatest-id="answer-options">
          {type === 'boolean' ? (
            <>
              <button
                data-testid={ () => (correct_answer === 'True' ? 'correct-answer' : 'wrong-answer-0') }
              >
                True
              </button>

              <button
                data-testid={ () => (correct_answer === 'False' ? 'correct-aswer' : 'wrong-answer-0') }
              >
                False
              </button>
            </>
          ) : (
            <>
              <button data-testeid={()=> (correct_answer === 'True' ? correct_answer : )} />

              <button data-testeid={()=> (correct_answer === 'True' ? correct_answer : )}/>

              <button data-testeid={()=> (correct_answer === 'True' ? correct_answer : )}/>

              <button data-testeid={()=> (correct_answer === 'True' ? correct_answer : )}/>
            </>
          )}
        </div> */}
      </div>
    );
  }
}
Question.propTypes = {
  question: propTypes.shape({
    category: propTypes.string.isRequired,
    question: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    difficulty: propTypes.string.isRequired,
    correct_answers: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string),
  }).isRequired,
};

export default Question;

//         {
//           "category":"Entertainment: Video Games",
//           "type":"multiple",
//           "difficulty":"easy",
//           "question":"What is the first weapon you acquire in Half-Life?",
//           "correct_answer":"A crowbar",
//           "incorrect_answers":[
//               "A pistol",
//               "The H.E.V suit",
//               "Your fists"
//           ]
//         }
