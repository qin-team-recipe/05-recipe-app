// DB接続エラー
export class DatabaseConnectionError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(params: any) {
    super(`Database connection error: ${params}`);
    this.name = 'DatabaseConnectionError';
  }
}
