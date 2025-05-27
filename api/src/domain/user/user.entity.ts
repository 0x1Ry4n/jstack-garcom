import { UserRole } from "../../application/enums/user-role.enum";

export class User {
    constructor(
        public id: string | null,
        public name: string,
        public email: string,
        public password: string,
        public role: UserRole,
        public tokens: { token: string }[]
    ) { }
}
