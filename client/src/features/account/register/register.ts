import { Component, inject, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule, TestComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountSevice = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    this.accountSevice.register(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    // Logic to navigate back or reset the form can be added here
  }
}
