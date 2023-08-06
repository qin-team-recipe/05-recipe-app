export class InvalidArgsError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(params: any) {
    super(`Invalid args: ${params}`);
    this.name = 'InvalidArgsError';
  }
}
