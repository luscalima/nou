export class Monitor {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly url: string,
    readonly interval: number, // minutes
  ) {}
}
