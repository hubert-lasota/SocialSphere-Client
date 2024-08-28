export interface DataResult<T> {
  data: T;
  success: boolean;
  errorCode: string;
  errorMessage: string;
}

export interface Page<T> {
  content: T[];
  last: boolean;
}

export interface FileDetails {
  name: string;
  type: string;
  content: string;
}
