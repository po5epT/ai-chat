export class UnauthorizedError extends Error {
	constructor(message: string = 'Authorization failed') {
		super(message);

		this.name = this.constructor.name;
	}
}
