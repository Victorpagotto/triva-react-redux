import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';
import localStorageMocks from './mocks/localStorageMocks';

describe('Testes da página de Ranking', () => {
  it('Testa se ao clicar no botão Go home a aplicação é redirecionada à página inicial. ', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const btnGoHome = screen.getByTestId('btn-go-home');
    expect(btnGoHome).toBeInTheDocument();

    userEvent.click(btnGoHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se os dados dos jogadores são pegos do localStorage e renderizados na tela em ordem de maior score.', () => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(localStorageMocks.user)
    );

    renderWithRouterAndRedux(<Ranking />);

    expect(localStorage.getItem).toHaveBeenCalled();

    const playerImg = screen.getAllByTestId('header-profile-picture');

    expect(playerImg[0]).toBeInTheDocument();
    expect(playerImg[1]).toBeInTheDocument();
    expect(playerImg).toHaveLength(2);

    const player1 = screen.getByTestId('player-name-0');

    expect(player1.innerHTML).toBe('Trybe2');
  });
});
