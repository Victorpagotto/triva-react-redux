import React, { Component } from 'react';

class Login extends Component {
  state =
    {
      name: '',
      // assertions: '',
      // score: '',
      gravatarEmail: '',
    }

    handleChange = ({ target }) => {
      const { value } = target;

      this.setState({
        [target.name]: value,
      });
    }

    handleClick = () => {
    }

    render() {
      const { name, gravatarEmail } = this.state;
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
              disabled={ (name === '' || gravatarEmail === '') }
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
