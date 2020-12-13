import {Component, OnInit} from '@angular/core';
import {IPost} from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-adminpost',
  templateUrl: './adminpost.component.html',
  styleUrls: ['./adminpost.component.css']
})
export class AdminpostComponent implements OnInit {

  public id: string;
  public post: IPost;
  public commentForm: FormGroup;
  public message: string;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
      if (this.post._id === '-1') {
        this.router.navigate(['/Error']);
      }
    });
    this.commentForm = this.formBuilder.group({
      author: [localStorage.getItem('id'), Validators.required],
      content: ['', Validators.required]
    });
  }

  public addComment(): void {
    if (this.commentForm.invalid) {
      return;
    } else {
      const comment = {
        _id: this.post._id,
        author: this.commentForm.controls.author.value,
        content: this.commentForm.controls.content.value
      };
      this.postService.addComment(comment).subscribe(data => {
        if (data._id === '-1') {
          this.message = 'Unable to add commment';
        } else {
          this.ngOnInit();
        }
      });
    }
  }

  public deleteComment(commentid: string): void {
    this.postService.deleteComment(this.id, commentid).subscribe(data => {
      if (data._id === '-1') {
        window.alert('Unable to delete comment.');
      } else {
        window.alert('Comment Deleted.');
        this.ngOnInit();
      }
    });
  }

  public deletePost(): void {
    this.postService.deletePost(this.id).subscribe(data => {
      if (data._id === '-1') {
        window.alert('Unable to delete post.');
      } else {
        window.alert('Post Deleted.');
        this.router.navigate(['/admin/index']);
      }
    });
  }
}
