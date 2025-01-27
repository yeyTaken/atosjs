import { ErrorCodes } from './ErrorCodes';

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.INVALID_FILE_TYPE]: 'Invalid fileType. Use 1 for JSON or 2 for YAML.',
  [ErrorCodes.INVALID_TIME_UNIT]: 'Invalid time unit. Use 60s, 7d, 10m and 1y.',
  [ErrorCodes.INVALID_FORMAT_DATA]: 'Invalid formatData provided.',
  [ErrorCodes.INVALID_MS_VALUE]: 'The value must be greater than or equal to 1000 milliseconds (1s).'
};