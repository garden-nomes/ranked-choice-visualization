import React, { Component } from 'react';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeCubicInOut } from 'd3-ease';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import sizeMe from 'react-sizeme';
import { OPTIONS, COLORS } from '../constants';

const moveTransition = () =>
  transition().duration(2000).delay(1000).ease(easeCubicInOut);
const enterTransition = () => transition().duration(1000).ease(easeCubicInOut);

class MovableG extends Component {
  constructor(props) {
    super(props);
    this.state = { x: props.x, y: props.y };
    this.transition = transition().duration(100).delay(300);
  }

  componentDidUpdate(nextProps) {
    // animate moving around
    const { x, y } = this.props;
    const { x: x_, y: y_ } = this.state;

    if (x !== x_ || y !== y_) {
      select(this.node)
        .transition(moveTransition())
        .attr('transform', `translate(${x}, ${y})`)
        .on('end', () => this.setState({ x, y }));
    }
  }

  render() {
    const { x: _x, y: _y, ...props } = this.props;
    const { x, y } = this.state;

    return (
      <g
        transform={`translate(${x}, ${y})`}
        ref={node => {
          this.node = node;
        }}
        {...props}
      />
    );
  }
}

class MovableCircle extends Component {
  constructor(props) {
    super(props);
    this.state = { x: props.x, y: props.y, r: props.r };
  }

  componentDidUpdate(nextProps) {
    // animate moving around
    const { x, y, r } = this.props;
    const { x: x_, y: y_, r: r_ } = this.state;

    if (x !== x_ || y !== y_ || r !== r) {
      select(this.node)
        .transition(moveTransition())
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', r)
        .on('end', () => this.setState({ x, y, r }));
    }
  }

  componentWillEnter(callback) {
    const { isTop, y } = this.props;
    select(this.node)
      .attr('cy', isTop ? y - 20 : y)
      .style('opacity', 0)
      .transition(enterTransition())
      .attr('cy', y)
      .style('opacity', 1)
      .on('end', callback);
  }

  componentWillLeave(callback) {
    const { isTop, y } = this.props;
    select(this.node)
      .style('opacity', 1)
      .transition(enterTransition())
      .attr('cy', isTop ? y - 20 : y)
      .style('opacity', 0)
      .on('end', callback);
  }

  render() {
    const { x: _x, y: _y, r: _r, isTop: _isTop, ...props } = this.props;
    const { x, y, r } = this.state;

    return (
      <circle
        cx={x}
        cy={y}
        r={r}
        ref={node => {
          this.node = node;
        }}
        {...props}
      />
    );
  }
}

class VoteSVG extends Component {
  render() {
    const { x, y, r, vote } = this.props;

    return (
      <MovableG className="VoteSVG" x={x} y={y}>
        <TransitionGroup component="g">
          {vote
            .map((candidate, i) =>
              <MovableCircle
                key={candidate}
                x={0}
                y={i * r * 0.2 - OPTIONS.length / 2 * r * 0.2}
                r={r}
                fill={COLORS[candidate]}
                isTop={i === 0}
              />
            )
            .reverse()}
        </TransitionGroup>
      </MovableG>
    );
  }
}

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
