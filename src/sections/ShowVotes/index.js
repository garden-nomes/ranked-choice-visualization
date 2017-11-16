import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OPTIONS } from '../../constants';
import './style.css';

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // while there remain elements to shuffle
  while (0 !== currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class ShowVotes extends Component {
  static propTypes = {
    choice: PropTypes.arrayOf(PropTypes.number).isRequired,
    votes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    onGenerate: PropTypes.func,
    onNext: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onGenerate = this.onGenerate.bind(this);
  }

  onGenerate() {
    const { onGenerate } = this.props;
    const votes = new Array(99)
      .fill(null)
      .map(() => shuffle(new Array(5).fill(null).map((_, i) => i)));
    onGenerate(votes);
  }

  render() {
    const { choice, votes, onNext } = this.props;
    return (
      <div className="ShowVotes">
        <h1>Good choice!</h1>
        <p>
          {OPTIONS[choice[0]].split(' ')[1]}'s a solid candidate. Though I have
          to say, {OPTIONS[choice[1]]} as #2... really?
        </p>
        <p>
          Well anyways, an election takes more than one voter, so we need other
          votes. {' '}
          <a href="#" onClick={this.onGenerate}>
            Click here
          </a>{' '}
          to generate ninety-nine other votes, so we'll have a nice, round
          hundred including yours.
        </p>
        <p>
          {/* placeholder for animated chart displaying the votes */}
          <svg width="100%" height="400px" />
        </p>
        {votes &&
          votes.length &&
          <p>
            Alright then, the race is on! When you're ready,{' '}
            <a href="#" onClick={onNext}>
              let's move on
            </a>{' '}
            to the first stage of tabulating the results.
          </p>}
      </div>
    );
  }
}

export default ShowVotes;
