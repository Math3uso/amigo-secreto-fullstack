export class UserAlreadyEmailExistsError extends Error {
    constructor() {
        super("E-mail already exists");
    }
}