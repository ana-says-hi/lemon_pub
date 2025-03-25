export class User {
  id: number;
  first_name: string;
  last_name: string;
  phone_nr: string;
  email: string;
  username: string;
  password: string;
  user_type: string;
  is_enabled: boolean;

  constructor(id: number, email: string, username: string, first_name: string, last_name:
                string, phone_nr: string, is_enabled: boolean, user_type: string, password: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_nr = phone_nr;
    this.is_enabled = is_enabled;
    this.user_type = user_type;
  }

  toString() {
    return this.id + " " + this.email + " " + this.username + " " + this.first_name + " "
      + this.last_name + " " + this.phone_nr + " " + this.is_enabled + " " + this.user_type;
  }

}
