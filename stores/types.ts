export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseState {
  status: Status;
  error: string | null;
}