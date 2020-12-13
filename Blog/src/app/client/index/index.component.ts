import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public posts = [];
  public newPosts = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPost().subscribe(data => {
      this.posts = data;
      while (this.posts.length) {
        this.newPosts.push(this.posts.splice(0, 3));
      }
    });
  }

}
