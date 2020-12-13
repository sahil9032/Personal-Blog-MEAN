import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public posts = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPost().subscribe(data => this.posts = data);
  }

}
