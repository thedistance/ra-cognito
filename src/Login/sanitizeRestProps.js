import { omit } from 'ramda';

// sanitizeRestProps :: Object -> Object
const sanitizeRestProps = omit([
  'classes',
  'className',
  'location',
  'title',
  'array',
  'theme',
  'staticContext',
]);

export default sanitizeRestProps;
