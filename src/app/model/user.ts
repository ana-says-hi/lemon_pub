export class User{
    id: number;
    email: string;
    username: string;
    password: string;
    is_enabled: boolean;
    user_type: string;
    constructor(id: number, email:string,username: string, password: string, is_enabled: boolean, user_type: string){
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.is_enabled = is_enabled;
        this.user_type = user_type;
    }
}
