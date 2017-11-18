import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Afterword extends Component {
  static propTypes = {
    onVote: PropTypes.func
  };

  render() {
    const { onRestart } = this.props;
    return (
      <div className="Afterword">
        <div className="Afterword-head">
          <h1>
            <span className="left">Ranked Choice Voting</span>
            <span className="right">in the Real World</span>
          </h1>
          <div>
            <p>
              If you liked this visualization, hopefully you're convinced that
              ranked-choice voting has a lot of potential to improve democracy.
              You're not alone.
            </p>
          </div>
        </div>
        <p>
          <i>Todo&hellip;</i>
        </p>

        <p>
          If you'd like to run through this again, you can{' '}
          <a href="#" onClick={onRestart}>
            restart
          </a>.
        </p>
      </div>
    );
  }
}

export default Afterword;
