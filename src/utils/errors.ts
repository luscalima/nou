export enum ErrorMessage {
	INVALID_INPUT = "Invalid Input",
	DUPLICATED_KEY = "Duplicated Key",
	INTERNAL_SERVER_ERROR = "Internal Server Error",
}

export class ProblemDetails {
	constructor(
		public readonly title: string,
		public readonly status: number,
		public readonly detail: string,
		public readonly type?: string,
		public readonly instance?: string,
	) {}
}
