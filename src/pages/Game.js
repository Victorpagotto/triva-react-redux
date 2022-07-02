import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getQuestions from '../0-Services/triviaAPI';
import Header from '../Components/Header';
import Question from '../Components/Question';
import Score from '../Components/Score';

const mapStateToProps = ({ player }) => ({
  player,
});

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          category: '',
          question: '',
          type: '',
          difficulty: '0',
          correct_answer: '',
          incorrect_answers: [''],
        },
      ],
      stage: 0,
    };

    this.controller = new AbortController();

    this.manageAnswer = this.manageAnswer.bind(this);
    this.registerPlayer = this.registerPlayer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const { signal } = this.controller;
    getQuestions(token, { signal })
      .then((perguntas) => {
        if (
          perguntas === 'Failed the token.'
          || perguntas === 'Failed questions fetch.'
        ) {
          localStorage.setItem('token', null);
          history.push('/');
        } else {
          this.setState({
            questions: perguntas,
          });
        }
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        throw error;
      });
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  registerPlayer = () => {
    const { player } = this.props;
    if (localStorage.user !== undefined && localStorage.user !== 'null') {
      const playerList = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify([...playerList, player]));
    } else {
      localStorage.setItem('user', JSON.stringify([player]));
    }
  };

  nextQuestion = () => {
    const { stage } = this.state;
    const { history } = this.props;
    const MAGICNUMBER = 4;
    if (stage === MAGICNUMBER) {
      this.registerPlayer();
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        stage: prevState.stage + 1,
      }));
    }
  };

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
    return [...wrongAnswers, correctAnswer];
  };

  shuffleQuestions = (answers) => {
    const managedAnswers = this.manageAnswer(answers);
    let copy = [...managedAnswers];
    return managedAnswers.map(() => {
      const position = Math.floor(Math.random() * copy.length);
      const selectedAnswer = copy[position];
      copy[position] = '';
      copy = copy.filter((item) => item !== '');
      return selectedAnswer;
    });
  };

  render() {
    const { questions, stage } = this.state;
    return (
      <>
        <Header />
        <Score />
        {questions && questions.length && (
          <Question
            key={ stage }
            ask={ questions[stage] }
            answers={ this.shuffleQuestions(questions[stage]) }
            nextQuestion={ this.nextQuestion }
          />
        )}
      </>
    );
  }
}
Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  player: propTypes.shape({
    name: propTypes.string.isRequired, // nome-da-pessoa
    assertions: propTypes.number.isRequired, // número-de-acertos
    score: propTypes.number.isRequired, // pontuação
    gravatarEmail: propTypes.string.isRequired, // email-da-pessoa
  }).isRequired,
};
export default connect(mapStateToProps)(Game);
