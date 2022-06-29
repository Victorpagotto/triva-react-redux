import React from "react";
import {renderWithRouterAndRedux} from "../helpers/renderWithRouterAndRedux"
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Ranking from "../../pages/Ranking";

describe('Testes da página de Ranking', () => {
  it('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />)

    const btnGoHome = screen.getByTestId('btn-go-home')
    expect(btnGoHome).toBeInTheDocument()

    userEvent.click(btnGoHome)
    expect(history.location.pathname).toBe('/');

  })

  it('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
    const user = [
      {
        name:'Trybe',
        assertions: 2,
        score: 22,
        gravatarEmail:'Trybe@gmail.com',
      }, 
      {
        name:'Trybe2',
        assertions: 3,
        score: 33,
        gravatarEmail:'Trybe2@gmail.com',
      }]

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(user));
    const { history } = renderWithRouterAndRedux(<Ranking />)

    expect(localStorage.getItem).toHaveBeenCalled();

    const playerImg = screen.getAllByTestId("header-profile-picture")
    expect(playerImg[0]).toBeInTheDocument()
    expect(playerImg).toHaveLength(2)

    const player1 = screen.getByTestId('player-name-0')
    
    expect(player1.innerHTML).toBe('Trybe2')

  })
})