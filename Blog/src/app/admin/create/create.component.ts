import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public imagePaths = [
    'assets/img/beach.jpg',
    'assets/img/building.jpg',
    'assets/img/desk.jpg',
    'assets/img/loft.jpg',
    'assets/img/meeting.jpg'
  ];
  public postForm: FormGroup;
  public imageForm = new FormData();
  public selectedFile: File;
  public imageUrl: string;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      imagePath: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  createFormData(event): void {
    this.selectedFile = (event.target.files[0] as File);
    this.imageForm.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  addPost(): void {
    if (this.postForm.invalid) {
      return;
    } else {
      this.postService.uploadImage(this.imageForm).subscribe(data => {
        if (data.msg) {
          const Post = {
            title: this.postForm.controls.title.value,
            author: localStorage.getItem('id'),
            imagePath: 'assets/img/' + this.selectedFile.name,
            content: this.postForm.controls.content.value
          };
          this.postService.addPost(Post).subscribe(res => {
            if (res._id === '-1') {
              window.alert('Can\'t add post at this time.');
            } else {
              window.alert('Post added sucessfully.');
              this.router.navigate(['/admin/index']);
            }
          });
        } else {
          window.alert('An error occured');
        }
      });
    }
  }

}
