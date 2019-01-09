import { compose, gt, flip, pathSatisfies, objOf } from 'ramda';

const _gt = flip(gt);

const isLoading = compose(
  objOf('isLoading'),
  pathSatisfies(_gt(0), ['admin', 'loading'])
);

export default isLoading;
