import React from 'react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import questionsResponseMock from '../helpers/questionsResponseMock';

describe('testes da página Game', () => {
  const initialState = (assert, score) => ({
    player: {
      name: 'TestName', // nome-da-pessoa
      assertions: assert, // número-de-acertos
      score: score, // pontuação
      gravatarEmail: 'test.test@gmail.com', // email-da-pessoa
    },
  });

  const falseTokenMock = {
    response_code: 1,
  };

  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(questionsResponseMock),
  });

  test('Testa se o Header possui as informações do jogador.', () => {
    global.fetch = mockFetch;
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');

    const imgProfile = screen.getByTestId('header-profile-picture');
    const nameProfile = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');

    expect(imgProfile).toBeInTheDocument();
    expect(nameProfile).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();

  });

  test('Testa se é retornado à tela de login no caso de um falso token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(falseTokenMock),
    });;
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
    expect(localStorage.getItem('token')).toBe('null');
  });

  test('Testa se há as informações da pergunta.', async () => {
    global.fetch = mockFetch;
    const questions = questionsResponseMock.results;
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');

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
    global.fetch = mockFetch;
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const answers = screen.getByTestId('answer-options').children;
    const controlAnswerIndex = Object.values(answers).indexOf(screen.getByTestId('correct-answer'));
    let checkSum = 0;

    cleanup();
    
    for(let i = 0; i < 100; i += 1) {
      global.fetch = mockFetch;
      renderWithRouterAndRedux(<App />, initialState(0,0), '/game');
  
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      const iterationAnswers = screen.getByTestId('answer-options').children
      const iterationAnswerIndex = Object.values(iterationAnswers).indexOf(screen.getByTestId('correct-answer'))

      if (iterationAnswerIndex === controlAnswerIndex) checkSum += 1;
      cleanup();
    }
    expect(checkSum < 100).toBeTruthy();
  });

  test('Testa a diferença de cores entre respostas corretas e erradas.', async () => {
    global.fetch = mockFetch
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');

    const questions = questionsResponseMock.results;
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
    global.fetch = mockFetch
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');
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
    global.fetch = mockFetch
    Storage.prototype.setItem = jest.fn();
    const { history } = renderWithRouterAndRedux(<App />, initialState(0,0), '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const questions = questionsResponseMock.results;

    localStorage.user = JSON.stringify(['']);

    play(questions);
    expect(history.location.pathname).toBe('/feedback');
    expect(localStorage.setItem).toHaveBeenCalled();
    cleanup();
    renderWithRouterAndRedux(<App />, initialState(0,0), '/game');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    localStorage.user = 'null';
    play(questions);
    expect(localStorage.setItem).toHaveBeenCalled();

  });
});
