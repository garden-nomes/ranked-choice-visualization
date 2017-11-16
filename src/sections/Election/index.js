import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Simulation from '../../Simulation';
import { OPTIONS, COLORS } from '../../constants';
import groupVotesByStage from '../../groupVotesByStage';
import './style.css';

class Election extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      showIntro: true,
      candidates: groupVotesByStage([props.choice, ...props.votes], 0),
      winner: null
    };
    this.seeHowItWorks = this.seeHowItWorks.bind(this);
    this.nextStage = this.nextStage.bind(this);
    this.prevStage = this.prevStage.bind(this);
    this.reset = this.reset.bind(this);
  }

  renderStageOne() {
    return (
      <div>
        <h1>Get to it!</h1>
        <p>
          So, we got a hundred votes, each of which is a ranking of five
          different candidates from favorite to least favorite...{' '}
          <i>how do we choose a single winner from that much information?</i>
        </p>
        <p>
          <strong>To start, count up everybody's first choice.</strong> One
          candidate will wind up with the fewest first-choice
          votes&mdash;they're the first to be eliminated. All voters who had
          marked that candidate as their first choice will be bumped to their
          second choice.
        </p>
        <p>
          It's easier to show than to explain, so{' '}
          <a href="#" onClick={this.seeHowItWorks}>
            click here to see how it works
          </a>.
        </p>
      </div>
    );
  }

  seeHowItWorks() {
    // animate chart
    this.setStage(1);

    // move on after animation done
    setTimeout(() => {
      const { candidates } = this.state;
      const firstLoser = candidates.findIndex(c => c.length === 0);
      this.setState({ showIntro: false, firstLoser });
    }, 3000);
  }

  renderStageTwo() {
    const { winner, firstLoser } = this.state;

    return (
      <div>
        <h1>
          {OPTIONS[firstLoser]} is out!
        </h1>
        <p>
          After that,{' '}
          <strong>
            for each subsequent round, the <i>new</i> least popular candidate is
            eliminated.
          </strong>{' '}
          Once again, all their voters are moved to their next-favorite
          candidate.
        </p>
        <p>
          A candidate wins by claiming at least 50% of the vote, after which
          it's impossible for any other candidate to win.
        </p>
        <div className="Election-buttons">
          <div>
            <a href="#" onClick={this.prevStage}>
              &larr; previous step
            </a>
          </div>

          {/* <div>
            <a href="#" onClick={this.reset}>
              reset
            </a>
          </div> */}

          <div>
            <a href="#" onClick={this.nextStage}>
              next step &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  prevStage() {
    const { stage } = this.state;

    if (stage > 0) {
      this.setStage(stage - 1);
    }
  }

  nextStage() {
    const { stage } = this.state;
    const winner = this.getWinner();

    if (winner < 0) {
      this.setStage(stage + 1);
    }
  }

  reset() {
    this.setStage(0);
  }

  setStage(stage) {
    const { votes, choice } = this.props;
    this.setState(
      {
        stage,
        candidates: groupVotesByStage([choice, ...votes], stage)
      },
      () => {
        const winner = this.getWinner();
        if (winner >= 0) {
          setTimeout(() => this.setState({ winner }), 3000);
        }
      }
    );
  }

  getWinner() {
    const { votes } = this.props;
    const { candidates } = this.state;

    return candidates.findIndex(
      c => c.length >= Math.ceil((votes.length + 1) / 2)
    );
  }

  render() {
    const { votes, choice, onNext } = this.props;
    const { stage, candidates, showIntro, winner } = this.state;

    return (
      <div className="Election">
        {showIntro ? this.renderStageOne() : this.renderStageTwo()}

        <div className="Election-chart">
          <Simulation candidates={candidates} />
        </div>

        {winner !== null &&
          <p>
            The people have spoken&mdash;
            <strong>{OPTIONS[winner]}</strong> is the new Supreme President of
            All the Planet! Hopefully, he'll be okay. But enough about elections
            in the World Federation of Nations.{' '}
            <a href="#" onClick={onNext}>
              let's move on
            </a>{' '}
            to talk about ranked choice voting in the real world.
          </p>}
      </div>
    );
  }
}

export default Election;
