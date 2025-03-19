// Import the 'Component' decorator from Angular's core library
import { Component } from '@angular/core';

// Import the 'FormsModule' to enable two-way data binding for forms
import { FormsModule } from '@angular/forms';  // Import FormsModule

// Import the 'CommonModule' which provides common directives like ngIf, ngFor
import { CommonModule } from '@angular/common';  // Import CommonModule

// Define an Angular component using the @Component decorator
@Component({
  // The selector defines the HTML tag that will represent this component
  selector: 'app-create-tournament',  // The component can be used with this tag in HTML
  
  // The 'standalone' flag tells Angular that this component can be used independently of any other module
  standalone: true,  // Make this component standalone
  
  // List of modules that this component needs to import to work correctly
  // These modules provide features like common directives and forms functionality
  imports: [CommonModule, FormsModule],  // Include CommonModule and FormsModule
  
  // Define the path to the HTML template for the component
  templateUrl: './create-tournament.component.html',
  
  // Define the path to the CSS file to style this component
  styleUrls: ['./create-tournament.component.css']
})

// Define the component's class
export class CreateTournamentComponent {
  
  // Declare a property to store the user's name, initialized to an empty string
  userName: string = '';
  
  // Declare a property to store the user's selected birthday, initialized to an empty string
  userBDay: string = '';
  
  // Declare a property to store the selected photo file, initialized to null
  // This will hold the file object when a user selects a file
  userPhoto: File | null = null;

  // This method handles the file selection event
  // It will be triggered when the user selects a file using the file input
  onFileSelected(event: Event): void {
    // Access the input element that triggered the event and cast it to an HTMLInputElement
    const input = event.target as HTMLInputElement;
    
    // If the input exists and files were selected, store the first selected file in the userPhoto property
    if (input && input.files?.length) {
      this.userPhoto = input.files[0];  // Store the selected file
    }
  }

  // This method handles form submission
  // It logs the data collected from the user and performs any necessary actions
  onSubmit() {
    // Log the entered user name to the console
    console.log("User name is:", this.userName);
    
    // Log the selected birthday to the console
    console.log("Selected Birthday: ", this.userBDay);
    
    // Check if a photo file has been selected
    if (this.userPhoto) {
      // If a file is selected, log the name of the selected file
      console.log("Selected file: ", this.userPhoto.name);
      // You can perform further actions like uploading the file to a server here
    } else {
      // If no file is selected, log that no file was chosen
      console.log("No file selected");
    }
  }
}
