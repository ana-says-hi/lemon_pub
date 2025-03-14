export class User {
  id: number;

  email: string;
  username: string;
  //password: string;
  first_name: string;
  last_name: string;
  phone_nr: string;
  is_enabled: boolean;
  user_type: string;

  constructor(id: number, email: string, username: string, first_name: string, last_name: string, phone_nr: string, is_enabled: boolean, user_type: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    //this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_nr = phone_nr;
    this.is_enabled = is_enabled;
    this.user_type = user_type;
  }
}
