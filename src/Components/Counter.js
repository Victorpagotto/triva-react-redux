import React from 'react';
import propTypes from 'prop-types';

export default class Counter extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div>
        <h1>{ timer }</h1>
      </div>
    );
  }
}

Counter.propTypes = {
  timer: propTypes.number.isRequired,
};
