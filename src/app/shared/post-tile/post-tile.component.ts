import { Component } from '@angular/core';
import { from } from 'rxjs';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import {faArrowUp,faArrowDown,faComments} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent {

  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post
    });

  }
  faArrowUp=faArrowUp;
  faArrowDown=faArrowDown
  faComments=faComments
  upvoteColor;
  downvoteColor
  upvotePost(){}

}
