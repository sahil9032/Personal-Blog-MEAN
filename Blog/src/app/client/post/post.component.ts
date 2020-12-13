import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IPost} from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public id: string;
  public post: IPost;
  public commentForm: FormGroup;
  public message: string;
  public isLoggedIn: boolean;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      && localStorage.getItem('role') === 'user';
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

  add(): void {
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

}
