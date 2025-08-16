import { Component, inject, Input, signal } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { Register } from "../account/register/register";
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected accountService = inject(AccountService)
  protected registerMode = signal(false)
  showRegister(value: boolean) {
    this.registerMode.set(value)
  }

}
