import { Component, inject, input, output } from '@angular/core';
import { Photo } from '../../types/member';
import { MemberService } from '../../core/services/member-service';

@Component({
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.html',
  styleUrl: './star-button.css'
})
export class StarButton {
  protected memberService = inject(MemberService)
  disabled = input<boolean>();
  selected = input<boolean>()
  clickEvent = output<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event)
  }




}
