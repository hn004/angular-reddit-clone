import { Component, Input } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent {

  @Input() post:PostModel

  upvotePost(){

  }

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  downvoteColor;
  upvoteColor;
}
