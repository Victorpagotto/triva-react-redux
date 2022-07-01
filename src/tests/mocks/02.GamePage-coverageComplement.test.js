import React from 'react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Game from '../../pages/Game';
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
  test('se fornecido um token inválido a partir do localStorage, a página é redirecionada para login e o estado global limpo', async () => {
    const page = renderWithRouterAndRedux(<App />);
    const { history } = page;

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    const tokenMock = {
      response_code: 1,
      response_message: 'Failed questions fetch.',
      token: null,
    };
    const INITIAL_STATE = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenMock),
    });

    userEvent.type(inputEmail, 'teste@gmail.com');
    userEvent.type(inputName, 'Trybe');
    userEvent.click(btnPlay);

    await waitFor(() => {
      expect(history.entries.length).toBe(3);
      expect(page.store.getState()).toEqual(INITIAL_STATE);
    });
  });

  test('testa se ao passar para a próxima pergunta testa se ao final do jogo o score do player é salvo em localStorage e a página é direcionada para o feedback', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponseMock),
    });

    const gamePage = renderWithRouterAndRedux(<App />, initialState(0,0), '/game');
    console.log(gamePage.getState())
    // const CORRECT_ANSWER = screen.getByTestId('correct-answer')


  });
});
