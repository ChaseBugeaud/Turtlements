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

  public get getUsername(): string {
    return this.username;
  }

  public get getPassword(): string {
    return this.password;
  }

  onSubmit() {
    const credentials = { username: this.getUsername, password: this.getPassword };

    this.loginService.login(credentials).subscribe(
      (response) => {
        if (response.success) {
          console.log("You have successfully logged in!");
          //Here we would handle the response from API and then update page
        } else {
          console.log("You ain't Lil Turney!");
        }
      },
      (error) => {
        console.log("NetworkError", error);
        //Here we would handle the error with a message
      });
  }
}
