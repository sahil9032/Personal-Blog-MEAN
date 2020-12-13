import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public id;
  public postForm: FormGroup;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.postService.getPostById(this.id).subscribe(data => {
      this.postForm.controls.title.setValue(data.title);
      this.postForm.controls.content.setValue(data.content);
    });
  }

  ngOnInit(): void {
  }

  updatePost(): void {
    if (this.postForm.invalid) {
      return;
    } else {
      const Post = {
        _id: this.id,
        title: this.postForm.controls.title.value,
        content: this.postForm.controls.content.value
      };
      this.postService.updatePost(Post).subscribe(data => {
        if (data._id === '-1') {
          window.alert('Can\'t update post.');
        } else {
          window.alert('Updated sucessfully.');
          this.router.navigate(['admin/post/', this.id]);
        }
      });
    }
  }
}
