import React, { Component } from 'react';

class Login extends Component {
  state =
    {
      name: '',
      // assertions: '',
      // score: '',
      gravatarEmail: '',
      isDisable: true,
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

    handleClick = () => {
      const { name, gravatarEmail } = this.state;
      if (!name && !gravatarEmail) {
        this.setState({
          isDisable: false,
        });
      } else {
        this.setState({
          isDisable: true,
        });
      }
    }

    render() {
      const { isDisable } = this.state;
      return (
        <div>
          <form>
            <label htmlFor="playner-name">
              Nome:
              <input
                id="player-name"
                data-testid="input-player-name"
                type="text"
                name="name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="playner-name">
              Email:
              <input
                id="player-name"
                data-testid="input-gravatar-email"
                type="email"
                name="gravatarEmail"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Play

            </button>
          </form>
        </div>
      );
    }
}

export default Login;
