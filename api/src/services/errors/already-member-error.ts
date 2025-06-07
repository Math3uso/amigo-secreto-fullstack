export class AlreadyMemberError extends Error {
    constructor() {
        super("you are already a member of the group");
    }
}