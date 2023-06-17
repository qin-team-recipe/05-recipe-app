// DB接続エラー
export class DatabaseConnectionError extends Error {
  constructor(params: any) {
    super(`Database connection error: ${params}`);
    this.name = 'DatabaseConnectionError';
  }
}
