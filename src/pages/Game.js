import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getQuestions from '../0-Services/triviaAPI';
import Header from '../Components/Header';
import actions from '../3-actions';
import Question from '../Components/Question';

const mapDispatchToProps = (dispatch) => ({
  setInitialState: () => dispatch(actions.setInitialState()),
});
class Game extends Component {
  state = {
    questions: [{
      category: '',
      question: '',
      type: '',
      difficulty: '0',
      correct_answer: '',
      incorrect_answers: [''],
    }],
    stage: 0,
    // category: [],
  };

  async componentDidMount() {
    const { history, setInitialState } = this.props;
    const token = localStorage.getItem('token');
    const perguntas = await getQuestions(token);
    if (perguntas === 'Failed questions fetch.') {
      localStorage.setItem('token', null);
      setInitialState();
      history.push('/');
    } else {
      this.setState({
        questions: perguntas,
      });
      console.log(perguntas);
    }
  }

  render() {
    const { questions, stage } = this.state;
    return (
      <>
        <Header />
        <Question ask={ questions[stage] } />
      </>
    );
  }
}
Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  setInitialState: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Game);
