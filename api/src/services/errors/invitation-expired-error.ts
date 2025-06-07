export class InvitationExpiredError extends Error {
    constructor() {
        super("Invalid expired");
    }
}