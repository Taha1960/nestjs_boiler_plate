import { STATUS_CODES } from 'http';

export const CLIENT_ERRORS = {
  INSUFFICIENT_FUNDS: {
    code: 'INSUFFICIENT_FUNDS',
    message: 'Insufficient funds to complete the transaction',
  },
  INVALID_DATA: {
    code: 'INVALID_DATA',
    message: 'Invalid loan request data',
    STATUS_CODE: 400,
  },
  INTERNAL_PROCEDURE_ERROR: {
    code: 'INTERNAL_PROCEDURE_ERROR',
    message: 'Internal procedure error',
    statusCode: 502,
  },
  GET_REPAYMENT_INTERNAL_ERROR: {
    message: 'Unable to get loan repayment scheduler',
  },
  NIN_EXITS: {
    message: 'User with this nin already exits',
    statusCode: 400,
  },
  USER_NOT_ON_TIER_ONE: {
    message: '',
  },
  NIN_ALREADY_PRESENT: {
    message:
      'Duplicate NIN: This number is already associated with your account.',
    statusCode: 400,
  },
  BVN_ALREADY_PRESENT: {
    message:
      'Duplicate BVN: This number is already associated with your account.',
    statusCode: 400,
  },
  BVN_EXITS: {
    message: 'User with this bvn number already exits',
    statusCode: 400,
  },
  BVN_REQUIRED: {
    message: 'BVN is required',
    statusCode: 400,
  },
  CLIENT_NOT_FOUNT_WITH_BVN: {
    message: 'Client not found with this BVN',
    statusCode: 400,
  },
  INVALID_UTILITY_BILL_TYPE: {
    message: 'Invalid Utility Bill Type',
    statusCode: 400,
  },
  INTERNAL_PROCEDURE_ERROR_UTILITY_BILL: {
    message: 'Internal procedure error while uploading utility bill',
    statusCode: 502,
  },
  INVALID_CHECK_REQUEST: {
    message: 'Either email or phone number must be provided.',
    statusCode: 400,
  },
  CLIENT_NOT_FOUND: {
    message: 'Client not found with this ID',
    statusCode: 404,
  },
  DUPLICATE_UTILITY_BILL: {
    message: 'Duplicate utility bill',
    statusCode: 409,
  },
  UTILITY_BILL_NOT_FOUND: {
    message: 'Utility bill not found',
    statusCode: 404,
  },
  UNABLE_TO_UPLOAD_UTILITY_BILL: {
    message: 'Unable to upload utility bill',
    statusCode: 502,
  },
  INVALID_CLIENT_ID: {
    message: 'Invalid Client Id',
    code: 'INVALID_ID',
    statusCode: 400,
  },
} as const;
