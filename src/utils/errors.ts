import pg from "pg";

export enum ErrorMessage {
	INVALID_INPUT = "Invalid Input",
	INTERNAL_SERVER_ERROR = "Internal Server Error",
}

export const ErrorValidator = {
	isDatabaseError,
};

export const ErrorBuilder = {
	dbContraintKey,
	dbSanitizeMessage,
};

// Validation functions

function isDatabaseError(error: any) {
	return error instanceof pg.DatabaseError;
}

// Building functions

function dbContraintKey(constraint: string | undefined) {
	return constraint ? constraint.split("_")[1] : "";
}

function dbSanitizeMessage(message: string | undefined) {
	return message ? message.replace(/".*"$/g, "").trim() : "";
}
