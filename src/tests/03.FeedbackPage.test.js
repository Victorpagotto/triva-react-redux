import React from "react";
import App from '../App';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import setInitialState from './helpers/setInitialState'

describe('Testa a página de feedback', () => {

  it('Testa se há as informações no header.', () => {
    const { history } = renderWithRouterAndRedux(<App />, setInitialState(3, 50), '/feedback');
    
    expect(history.location.pathname).toBe('/feedback');
    
    const profImg = screen.getByText('TestName');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');
    
    expect(profImg).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
  });

  it('Testa a mensagem de feedback na tela.', () => {
    const { store } = renderWithRouterAndRedux(<App />, setInitialState(5, 50), '/feedback');
    
    const successMessage = screen.getByText('Well Done!');
    
    expect(successMessage).toBeInTheDocument();
    
    store.dispatch({type: 'ASSERTIONS', info: 2});
    
    const failMessage = screen.getByText('Could be better...');
    
    expect(failMessage).toBeInTheDocument();
    
    store.dispatch({type: 'ASSERTIONS', info: 3});
    
    const exactScore = screen.getByText('Well Done!');
    
    expect(exactScore).toBeInTheDocument();
  });

  it('Testa as informações relacionads ao resultado.', () => {
    renderWithRouterAndRedux(<App />, setInitialState(5, 50), '/feedback');
    
    const totalScore = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    
    expect(totalScore.innerHTML).toBe('50');
    expect(assertions.innerHTML).toBe('5');
  });

  it('Testa os botões.', () => {
    const { history } = renderWithRouterAndRedux(<App />, setInitialState(5, 50), '/feedback');
    
    const playAgainBtn = screen.getByTestId('btn-play-again');
    
    userEvent.click(playAgainBtn);
    
    expect(history.location.pathname).toBe('/');
    
    history.push('/feedback');
    
    const rankBtn = screen.getByTestId('btn-ranking');
    
    userEvent.click(rankBtn);
    
    expect(history.location.pathname).toBe('/Ranking');
  });
});