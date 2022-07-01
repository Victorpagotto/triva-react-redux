import React from 'react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('testes da página Game', () => {
  test('se fornecido um token inválido a partir do localStorage, a página é redirecionada para login e o estado global limpo', async () => {
    const page = renderWithRouterAndRedux(<App />);
    const { history } = page;

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
    Storage.prototype.setItem = jest.fn();
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputEmail, 'teste@gmail.com');
    userEvent.type(inputName, 'Trybe');
    userEvent.click(btnPlay);
    await waitFor(() => {
      expect(history.entries.length).toBe(3);
      expect(page.store.getState()).toEqual(INITIAL_STATE);
    });
  });
});
