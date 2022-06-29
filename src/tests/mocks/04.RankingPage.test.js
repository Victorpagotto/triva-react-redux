import React from "react";
import {renderWithRouterAndRedux} from "../helpers/renderWithRouterAndRedux"
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Ranking from "../../pages/Ranking";

describe('Testes da página de Ranking', () => {
    it('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
        const { history } = renderWithRouterAndRedux(<Ranking />)

        const btnGoHome = screen.getByTestId('btn-go-home')
        expect(btnGoHome).toBeInTheDocument()

        userEvent.click(btnGoHome)
        expect(history.location.pathname).toBe('/');
    })
})