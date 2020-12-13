import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-adminindex',
  templateUrl: './adminindex.component.html',
  styleUrls: ['./adminindex.component.css']
})
export class AdminindexComponent implements OnInit {

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
