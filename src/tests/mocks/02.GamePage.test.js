import React from "react";
import { renderWithRouterAndRedux } from "../helpers/renderWithRouterAndRedux"
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from "../../App";
// import Game from '../../pages/Game';
import actions from '../../3-actions';

describe('testes da página Game', () => {
    test('se fornecido um token inválido a partir do localStorage, a página é redirecionada para login e o estado global limpo', async () => {

        const page = renderWithRouterAndRedux(<App />)
        const { history } = page;

        const tokenMock = {
            response_code: 1,
            response_message: "Failed questions fetch.",
            token: null,
        };

        // const tokenMock = {
        //     response_code: 0,
        //     response_message: "Token Generated Successfully!",
        //     token: "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
        // };

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
        await waitFor( () => {
            // expect(history.location.pathname).toBe('/game');
            // console.log(page.store.dispatch);
            // jest.spyOn(actions.setInitialState);
            // expect(page.store.dispatch).toHaveBeenCalledWith(actions.setInitialState);
            // console.log(history)
            expect(history.entries.length).toBe(3)
        })

        // await waitFor(() => {
        //     
        // });
    })
});