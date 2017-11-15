import React, { Component } from 'react';
import Vote from './Vote';
import { OPTIONS } from './constants';
import './Intro.css';

class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <div className="Intro-head">
          <div className="Intro-head-left">
            <h1>An Interactive Explanation of Ranked Choice Voting</h1>
          </div>
          <div className="Intro-head-right">
            <p>
              Traditional voting (usually know as "first-past-the-post" voting)
              is plagued with problems, such as{' '}
              <a
                href="https://en.wikipedia.org/wiki/Vote_splitting"
                target="_blank"
              >
                split voting
              </a>{' '}
              or the need for expensive primary or runoff elections. A lot of
              these problems stem from the limitations of only being able to
              vote for a single candidate. Luckily, there is an alternative.{' '}
            </p>
            <p>
              <strong>
                Ranked-choice voting is an alternative system that allows voters
                to rank candidates in order of choice.
              </strong>
            </p>
          </div>
        </div>

        <div className="Intro-body">
          <div className="Intro-body-left">
            <h2>The year is 3001.</h2>
            <p>
              The peoples of the World Federation of Nations are preparing to
              hold a vote:{' '}
              <i>
                which preserved head in a jar should serve as Supreme President
                of All the Planet?
              </i>
            </p>
            <p>
              Every citizen receives a ballot, in which they rank their
              candidates by preference from most to least favority.{' '}
              <strong>Go ahead, try it out.</strong>
            </p>
          </div>
          <div className="Intro-body-right">
            <Vote options={OPTIONS} />
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
