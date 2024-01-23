import { ErrorTitle, HttpStatus } from "../../utils";

export class AppError extends Error {
	constructor(
		public readonly title: string,
		public readonly status: number,
		public readonly detail: string,
		public readonly type?: string,
		public readonly instance?: string,
	) {
		super(detail);
	}

	toJSON() {
		return {
			title: this.title,
			status: this.status,
			detail: this.detail,
			type: this.type,
			instance: this.instance,
		};
	}
}

export class InvalidInputError extends AppError {
	constructor(detail: string, type?: string, instance?: string) {
		super(
			ErrorTitle.INVALID_INPUT,
			HttpStatus.BAD_REQUEST,
			detail,
			type,
			instance,
		);
	}
}

export class DuplicatedKeyError extends AppError {
	constructor(detail: string, type?: string, instance?: string) {
		super(
			ErrorTitle.DUPLICATED_KEY,
			HttpStatus.CONFLICT,
			detail,
			type,
			instance,
		);
	}
}
