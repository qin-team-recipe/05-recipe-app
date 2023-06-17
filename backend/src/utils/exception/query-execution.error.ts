// クエリ実行エラー
export class QueryExecutionError extends Error {
  constructor(params: any) {
    super(`Query execution error: ${params}`);
    this.name = 'QueryExecutionError';
  }
}
