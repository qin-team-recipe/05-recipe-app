// クエリ実行エラー
export class QueryExecutionError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(params: any) {
    super(`Query execution error: ${params}`);
    this.name = 'QueryExecutionError';
  }
}
