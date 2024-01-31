export enum ErrorTitle {
	INVALID_INPUT = "Invalid Input",
	DUPLICATED_KEY = "Duplicated Key",
	INTERNAL_SERVER_ERROR = "Internal Server Error",
	PAGINATION_ERROR = "Pagination Error",
	ENTITY_NOT_FOUND = "Entity Not Found",
}

export enum HttpStatus {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500,
	NOT_FOUND = 404,
	NO_CONTENT = 204,
}
