import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService)
  private likeSerive = inject(LikesService);

  init() {
    const userString = localStorage.getItem('user')
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    this.likeSerive.getLikeIds();
    return of(null)
  }
}
