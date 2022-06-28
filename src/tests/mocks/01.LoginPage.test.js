import React from "react";
import App from "../../../App";
import {renderWithRouterAndRedux} from "../renderWithRouterAndRedux"
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testes da página de Login', () => {
    it('Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', () => {
        const { history, getByTestId } = renderWithRouterAndRedux(<App />)

        const tokenMock = {
          response_code: 0,
          response_message:"Token Generated Successfully!",
          token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
        };

        global.fetch = jest.fn().mockImplementation(() => ({
          json: jest.fn().mockResolvedValue(tokenMock),
        }))
        Storage.prototype.setItem = jest.fn();
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
        userEvent.type(inputName, 'Trybe');
        expect(btnPlay.disabled).toBe(false);
        expect(inputEmail.value).toBe('teste@gmail.com');
        expect(inputName.value).toBe('Trybe');
        userEvent.click(btnPlay);
        expect(localStorage.setItem).toHaveBeenCalled();
        expect(history.location.pathname).not.toBe('/');
    })
})