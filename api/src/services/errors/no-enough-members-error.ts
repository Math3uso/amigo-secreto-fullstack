export class NoEnoughMembersError extends Error {
    constructor() {
        super("Not enough members");
    }
}