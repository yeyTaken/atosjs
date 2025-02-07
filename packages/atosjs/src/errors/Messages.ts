import { ErrorCodes } from './ErrorCodes';

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.INVALID_TIME_UNIT]: 'Invalid time unit. Use 60s, 7d, 10m and 1y.',
  [ErrorCodes.INVALID_FORMAT_DATA]: 'Invalid formatData provided.',
  [ErrorCodes.INVALID_MS_VALUE]: 'The value must be greater than or equal to 1000 milliseconds (1s).',
  [ErrorCodes.INVALID_DB_SELECTION]: 'Invalid database selection provided.',
  [ErrorCodes.INVALID_REPEAT_VALUE]: 'Invalid repeat value provided.',
  [ErrorCodes.INVALID_TYPE_VALUE]: 'Invalid type value provided.',
  [ErrorCodes.REPEAT_NOT_ALLOWED]: 'Repeat does not work if type is different from 2'
};