export type ErrorCodeType = 400 | 404 | 500

export type WebErrorMap = Record<ErrorCodeType, WebError>

export interface WebError {
  statusCode: number;
  statusMessage: string;
  message?: string;
  fatal?: boolean;
}