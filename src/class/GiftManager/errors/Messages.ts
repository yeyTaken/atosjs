import { ErrorCodes } from './ErrorCodes';

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.INVALID_FILE_TYPE]: 'Invalid fileType. Use 1 for JSON or 2 for YAML.',
  [ErrorCodes.INVALID_TIME_UNIT]: 'Invalid time unit. Use 60s, 7d, 10m and 1y.'
};