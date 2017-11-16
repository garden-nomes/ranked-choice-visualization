import React, { Component } from 'react';
import Intro from './sections/Intro';
import ShowVotes from './sections/ShowVotes';
import Election from './sections/Election';
import Afterword from './sections/Afterword';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: null, //[0, 1, 2, 3, 4],
      votes: null, //new Array(99).fill(null).map(() => shuffle([0, 1, 2, 3, 4])),
      section: 0
    };
  }

  render() {
    const { choice, votes, section } = this.state;
    return (
      <div className="App">
        {section === 0 &&
          <Intro
            onVote={choice =>
              setTimeout(() => this.setState({ choice, section: 1 }), 500)}
          />}
        {section === 1 &&
          <ShowVotes
            choice={choice}
            votes={votes}
            onGenerate={votes => this.setState({ votes })}
            onNext={() => this.setState({ section: 2 })}
          />}
        {section === 2 &&
          <Election
            votes={votes}
            choice={choice}
            onNext={() => this.setState({ section: 3 })}
          />}
        {section > 2 &&
          <Afterword
            onRestart={() =>
              this.setState({ choice: null, votes: null, section: 0 })}
          />}
      </div>
    );
  }
}

export default App;
