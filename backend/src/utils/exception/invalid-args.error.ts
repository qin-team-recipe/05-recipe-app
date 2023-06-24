export class InvalidArgsError extends Error {
  constructor(params: any) {
    super(`Invalid args: ${params}`);
    this.name = 'InvalidArgsError';
  }
}
