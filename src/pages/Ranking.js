import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RankingPlayers from '../Components/RankingPlayers';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1>Ranking</h1>
        <RankingPlayers />

        <Link to="/Login">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Go home
          </button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

// Ranking.propTypes = {
//   name: PropTypes.string.isRequired,
//   score: PropTypes.bool.isRequired,
//   gravatarEmail: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(Ranking);
