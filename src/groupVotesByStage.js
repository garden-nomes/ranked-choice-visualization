import { OPTIONS } from './constants';

export default function groupVotesByStage(votes, stage) {
  const groupings = new Array(OPTIONS.length).fill(null).map(() => []);

  // add a "key" to each vote to aid animations
  votes.forEach((vote, i) => {
    groupings[vote[0]].push({ vote, key: i });
  });

  // recreate rounds leading up to this one
  for (let i = 0; i < stage; i++) {
    // find least popular candidate for this round
    let minIndex = groupings.findIndex(g => g.length > 0);
    let minValue = groupings[minIndex].length;
    groupings.forEach((g, i) => {
      if (g.length > 0 && g.length < minValue) {
        minValue = g.length;
        minIndex = i;
      }
    });

    // remove eliminated candidate from preference list of all voters
    groupings.forEach((_, i) => {
      groupings[i] = groupings[i].map(({ vote, ...rest }) => ({
        vote: vote.filter(i => i !== minIndex),
        ...rest
      }));
    });

    // move all votes from that candidate to their next favorite
    groupings[minIndex].forEach(({ vote, ...rest }) => {
      groupings[vote[0]].push({ vote, ...rest });
    });

    groupings[minIndex] = [];
  }

  return groupings;
}
