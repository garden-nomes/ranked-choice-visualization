import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from '../VoteButton';
import './style.css';

const noop = () => null;

const setIndex = (arr, index, value) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index + 1)
];

class Vote extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onComplete: PropTypes.func
  };

  static defaultProps = {
    options: [],
    onComplete: noop
  };

  constructor(props) {
    super(props);
    this.state = { votes: [] };
    this.renderOption = this.renderOption.bind(this);
  }

  vote(index) {
    const { votes } = this.state;
    const { onComplete, options } = this.props;

    if (votes.indexOf(index) === -1) {
      const gap = votes.indexOf(null);

      const newVotes =
        gap === -1 ? [...votes, index] : setIndex(votes, gap, index);

      this.setState({ votes: newVotes }, () => {
        if (newVotes.filter(i => i !== null).length >= options.length) {
          onComplete(newVotes);
        }
      });
    }
  }

  unvote(index) {
    const { votes } = this.state;
    const voteIndex = votes.indexOf(index);

    if (voteIndex !== -1) {
      this.setState({
        votes: setIndex(votes, voteIndex, null)
      });
    }
  }

  render() {
    const { options } = this.props;

    return (
      <div className="Vote">
        {options.map(this.renderOption)}
      </div>
    );
  }

  renderOption(option, index) {
    const { votes } = this.state;

    let number = votes.indexOf(index);
    if (number === -1) {
      number = null;
    } else {
      number += 1;
    }

    return (
      <div key={index} className="Vote-option">
        <VoteButton
          onClick={() => (number ? this.unvote(index) : this.vote(index))}
          number={number}
        />

        <span className="Vote-label">
          {option}
        </span>
      </div>
    );
  }
}

export default Vote;
