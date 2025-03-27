import { Component } from "@angular/core";
import { inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  providers: [LoginService]
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  private loginService = inject(LoginService);

  //constructor(private loginService: LoginService) { }
  //Need Submissions button function
  //1. create JSON object with data
  //2. send data to API
  onSubmit() {
    const credentials = { username: this.username, password: this.password };
    //console.log(credentials);
    //return credentials;
    this.loginService.login(credentials).subscribe(
      (response) => {
        console.log("You have successfully logged in!", response);
        //Here we would handle the response from API and then update page
      },
      (error) => {
        console.log("You ain't Lil Turney!", error);
        ////Here we would handle the error with a message
      });
    //this.loginService.getTest();
  }
}
