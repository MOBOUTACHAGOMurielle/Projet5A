export class UserForm {
    name : string;
    username: string;
    email: string;
    password: string;

    constructor(user : any){
        this.name = user.firstname + "_" + user.lastname ;
        this.username = user.username;
        this.email = user.username;
        this.password = user.password;
    }

  }
  