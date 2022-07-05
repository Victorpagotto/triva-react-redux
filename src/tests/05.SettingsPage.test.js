import React from "react";
import App from "../App";
import {renderWithRouterAndRedux} from "./helpers/renderWithRouterAndRedux";
import {screen} from '@testing-library/react';
import setInitialState from './helpers/setInitialState'

describe('Testa página de settings.', () => {

  it('Testa se há o título da página.', () => {
    renderWithRouterAndRedux(<App />, setInitialState(), '/Settings');
    
    const pageTitle = screen.getByTestId('settings-title');
    
    expect(pageTitle).toBeInTheDocument();
  });
});