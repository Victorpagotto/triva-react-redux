import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import setInitialState from './helpers/setInitialState';
import setUpFakeFetch from './helpers/setUpfakeFecth';
import tokenMocks from './mocks/tokenMocks';
import questionsResponseMock from './mocks/questionsResponseMock';
import App from '../App';


describe('testes da página Game', () => {

  test('Testa se o Header possui as informações do jogador.', async () => {  
    setUpFakeFetch(questionsResponseMock)    
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');

    const imgProfile = screen.getByTestId('header-profile-picture');
    const nameProfile = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');
    
    await waitFor(() => {
      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(headerScore).toBeInTheDocument();
    });
  });

  test('Testa se é retornado à tela de login no caso de um falso token', async () => {
    setUpFakeFetch(tokenMocks.invalidToken);
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(nameInput, 'test');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.click(playButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('token')).toBe(null);
  });

  test('Testa se há as informações da pergunta.', async () => {
    setUpFakeFetch(questionsResponseMock);
    const questions = questionsResponseMock.results;
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const category = screen.getByText(questions[0].category);
    const text = screen.getByText(questions[0].question);

    expect(category).toBeInTheDocument();
    expect(text).toBeInTheDocument();

    const optionsList = screen.getByTestId('answer-options');
    
    questions[0].incorrect_answers.forEach((answer, i) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
      expect(screen.getByTestId(`wrong-answer-${i}`)).toBeInTheDocument();
      expect(screen.getByText(answer).parentElement).toEqual(optionsList);
    });
    
    const correctAnswer = screen.getByTestId('correct-answer');
    
    expect(correctAnswer.innerHTML).toBe(questions[0].correct_answer);
    expect(correctAnswer.parentElement).toBe(optionsList);
  });

  test('Testa se as respostas estão em ordem aleatória.', async () => {
    setUpFakeFetch(questionsResponseMock);
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const answers = screen.getByTestId('answer-options').children;
    const controlAnswerIndex = Object.values(answers).indexOf(screen.getByTestId('correct-answer'));
    let checkSum = 0;

    cleanup();
    
    for(let i = 0; i < 100; i += 1) {
      setUpFakeFetch(questionsResponseMock);
      renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
  
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      const iterationAnswers = screen.getByTestId('answer-options').children
      const iterationAnswerIndex = Object.values(iterationAnswers).indexOf(screen.getByTestId('correct-answer'))

      if (iterationAnswerIndex === controlAnswerIndex) checkSum += 1;
      cleanup();
    }
    expect(checkSum < 100).toBeTruthy();
  });

  test('Testa a diferença de cores entre respostas corretas e erradas.', async () => {
    setUpFakeFetch(questionsResponseMock);
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer = screen.getByTestId('wrong-answer-0');

    expect(correctAnswer).not.toHaveProperty('className', 'true');
    expect(wrongAnswer).not.toHaveProperty('className', 'false');

    userEvent.click(correctAnswer);
    expect(correctAnswer).toHaveProperty('className', 'true');
    expect(wrongAnswer).toHaveProperty('className', 'false');
  });

  test('Testa o score', async () => {
    setUpFakeFetch(questionsResponseMock);
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    const questions = questionsResponseMock.results;
    const score = screen.getByTestId('header-score');
    const correctAnswer = screen.getByText(questions[0].correct_answer);
    
    userEvent.click(correctAnswer);
    
    expect(score.innerHTML).toBe('40');
  });

  const play = (questions) => {
    questions.forEach((question) => {
      const correctAnswer = screen.getByText(question.correct_answer);
      expect(correctAnswer).not.toHaveProperty('disabled', true);
      userEvent.click(correctAnswer);
      expect(correctAnswer).toHaveProperty('disabled', true);
      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    });
  }

  test('Testa se há um botão next e o registro no placar de jogadores.', async () => {
    setUpFakeFetch(questionsResponseMock);
    const { history } = renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const questions = questionsResponseMock.results;

    localStorage.user = JSON.stringify(['']);

    play(questions);
    expect(history.location.pathname).toBe('/feedback');
    expect(localStorage.setItem).toHaveBeenCalled();
    cleanup();
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    localStorage.user = 'null';
    play(questions);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('Testa um código diferente de 0 na API de perguntas.', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 3,
      })
    })
    const { history } = renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/');
  });

  test('Testa o timer do jogo.', async () => {
    jest.setTimeout(45000);
    setUpFakeFetch(questionsResponseMock);
    const questions = questionsResponseMock.results;
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    expect(screen.getByText(questions[0].correct_answer)).not.toHaveProperty('disabled', true);
    
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    
    expect(screen.getByText(questions[0].correct_answer)).toHaveProperty('disabled', true);

    cleanup();
    
    renderWithRouterAndRedux(<App />, setInitialState(0,0), '/game');
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 32000));
    
    expect(screen.getByText(questions[0].correct_answer)).toHaveProperty('disabled', true);
  });
});
