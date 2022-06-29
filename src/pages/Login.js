import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../0-Services/tokenAPI';
import LoadingPage from '../Components/LoadingPage';
import logo from '../trivia.png';
import actions from '../3-actions';

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(actions.setName(name)),
  setEmail: (gravatarEmail) => dispatch(actions.setEmail(gravatarEmail)),
});

class Login extends Component {
  state =
    {
      name: '',
      // assertions: '',
      // score: '',
      gravatarEmail: '',
      loading: false,
    }

    handleChange = ({ target }) => {
      const { value } = target;

      this.setState({
        [target.name]: value,
      });
    }

    handleClick = () => {
      const { history, setName, setEmail } = this.props;
      const { name, gravatarEmail } = this.state;
      setName(name);
      setEmail(gravatarEmail);
      this.setState({ loading: true }, async () => {
        localStorage.setItem('token', await getToken());
        this.setState({ loading: false }, () => {
          history.push('/game');
        });
      });
    }

    render() {
      const { name, gravatarEmail, loading } = this.state;
      if (loading) {
        return <LoadingPage />;
      }
      return (
        <div className="App">
          <section className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
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
          </section>
        </div>
      );
    }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  setName: propTypes.func.isRequired,
  setEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
