import React from "react";
import App from "../../App";
import {renderWithRouterAndRedux} from "../helpers/renderWithRouterAndRedux";
import {screen} from '@testing-library/react';

describe('Testa página de settings.', () => {
  const initialState = (assert, score) => ({
    player: {
      name: 'TestName', // nome-da-pessoa
      assertions: assert, // número-de-acertos
      score: score, // pontuação
      gravatarEmail: 'test.test@gmail.com', // email-da-pessoa
    },
  });

  it('Testa se há o título da página.', () => {
    renderWithRouterAndRedux(<App />, initialState(), '/Settings');
    const pageTitle = screen.getByTestId('settings-title');
    expect(pageTitle).toBeInTheDocument();
  });
});