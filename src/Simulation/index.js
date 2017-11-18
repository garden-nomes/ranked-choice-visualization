import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import VoteSVG from '../VoteSVG';
import { OPTIONS } from '../constants';

class Chart extends Component {
  getVoteLocation(groupIndex, voteIndex, size) {
    return {
      x: Math.floor(voteIndex / 2) * size + size / 2,
      y: (groupIndex * 3 + voteIndex % 2) * size + size / 2
    };
  }

  render() {
    const { candidates, size: { width } } = this.props;

    const nVotes = candidates.reduce((sum, c) => sum + c.length, 0);
    const size = width / nVotes * 3 * 0.95;
    const height = size * OPTIONS.length * 3;

    return (
      <svg width="100%" height={height}>
        <line
          x1={size * nVotes / 4}
          y1={0}
          x2={size * nVotes / 4}
          y2={height}
          style={{
            strokeDasharray: '0.1875rem',
            stroke: '#999'
          }}
        />
        <text x={size * nVotes / 4 + 4} y="1rem" style={{ fill: '#999' }}>
          50%
        </text>

        {candidates
          .map((candidate, i) =>
            candidate.map(({ vote, key }, j) =>
              <VoteSVG
                key={key}
                vote={vote}
                r={size / 3}
                {...this.getVoteLocation(i, j, size)}
              />
            )
          )
          .reduce((a, b) => a.concat(b), [])}

        {candidates.map((candidate, i) =>
          <text
            key={i}
            x={size / 6}
            y={(i * 3 + 2) * size + size / 2 + 4}
            style={{ opacity: candidate.length > 0 ? 1 : 0.5 }}
          >
            {OPTIONS[i]}
          </text>
        )}
      </svg>
    );
  }
}

export default sizeMe()(Chart);
