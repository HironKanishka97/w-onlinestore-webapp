export class User{
    id: number;
    username: string;
    password: string;


    constructor(id: number, userName: string, password: string) {
        this.id = id;
        this.username = userName;
        this.password = password;
    }
}