import React from 'react';
import { Link } from 'react-router-dom';
import RankingPlayers from '../Components/RankingPlayers';
import '../CSS/rankingPage.css';

class Ranking extends React.Component {
  render() {
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        <div className="ranking-btn-container">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Go home
            </button>
          </Link>
        </div>
        <RankingPlayers />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   assertions: state.player.assertions,
//   score: state.player.score,
//   gravatarEmail: state.player.gravatarEmail,
// });

// Ranking.propTypes = {
//   name: PropTypes.string.isRequired,
//   score: PropTypes.bool.isRequired,
//   gravatarEmail: PropTypes.string.isRequired,
// };

export default Ranking;
