import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import tokenMocks from './mocks/tokenMocks';
import setUpfakefetch from './helpers/setUpfakeFecth';
import PropTypes from 'prop-types';

describe('Testes da página de Login', () => {
  it('Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />);
    const { validToken } = tokenMocks;
    setUpfakefetch(validToken);

    expect(history.location.pathname).toBe('/');

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay.disabled).toBe(true);

    userEvent.type(inputEmail, 'teste@gmail.com');

    expect(btnPlay.disabled).toBe(true);
    expect(inputEmail.value).toBe('teste@gmail.com');

    userEvent.type(inputName, 'Trybe');

    expect(btnPlay.disabled).toBe(false);
    expect(inputName.value).toBe('Trybe');

    userEvent.click(btnPlay);

    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', validToken.token));
    expect(history.location.pathname).toBe('/game');
  });
});
