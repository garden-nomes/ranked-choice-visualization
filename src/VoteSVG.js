import React, { Component } from 'react';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeCubicInOut } from 'd3-ease';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { OPTIONS, COLORS } from './constants';

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
    const { x: _x, y: _y, gRef, ...props } = this.props;
    const { x, y } = this.state;

    return (
      <g
        transform={`translate(${x}, ${y})`}
        ref={node => {
          if (gRef) {
            gRef(node);
          }

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

    if (x !== x_ || y !== y_ || r !== r_) {
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
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequried,
    r: PropTypes.number.isRequired,
    vote: PropTypes.arrayOf(PropTypes.number).isRequired
  };

  componentWillEnter(callback) {
    select(this.node)
      .style('opacity', 0)
      .transition(enterTransition())
      .style('opacity', 1)
      .on('end', callback);
  }

  componentWillLeave(callback) {
    select(this.node)
      .style('opacity', 1)
      .transition(enterTransition())
      .style('opacity', 0)
      .on('end', callback);
  }

  render() {
    const { x, y, r, splay, vote } = this.props;

    return (
      <MovableG
        className="VoteSVG"
        x={x}
        y={y}
        gRef={node => {
          this.node = node;
        }}
      >
        <TransitionGroup component="g">
          {vote
            .map((candidate, i) =>
              <MovableCircle
                key={candidate}
                x={0}
                y={
                  i * r * (splay ? 2.5 : 0.2) -
                  OPTIONS.length / 2 * r * (splay ? 2.5 : 0.2)
                }
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

export default VoteSVG;
