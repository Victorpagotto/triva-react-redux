import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        {`Pontos : ${score}`}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Score);
