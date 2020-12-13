import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPost} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public ip = 'http://localhost:4000/';
  public urls = {
    getPost: this.ip + 'post/get',
    getPostById: this.ip + 'post/get/',
    addPost: this.ip + 'post/add/post',
    addComment: this.ip + 'post/add/comment',
    deletePost: this.ip + 'post/delete/',
    deleteComment: this.ip + 'post/delete/comment/',
    updatePost: this.ip + 'post/update/',
    uploadImage: this.ip + 'upload'
  };
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  public getPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.urls.getPost);
  }

  public getPostById(id): Observable<IPost> {
    return this.http.get<IPost>(this.urls.getPostById + id);
  }

  public addPost(data): Observable<IPost> {
    return this.http.post<IPost>(this.urls.addPost, data);
  }

  public addComment(data): Observable<IPost> {
    return this.http.post<IPost>(this.urls.addComment, data);
  }

  public deletePost(id): Observable<IPost> {
    return this.http.delete<IPost>(this.urls.deletePost + id);
  }

  public deleteComment(postid, commentid): Observable<IPost> {
    return this.http.delete<IPost>(this.urls.deleteComment + postid + '/' + commentid);
  }

  public updatePost(data): Observable<any> {
    return this.http.put<any>(this.urls.updatePost + data._id, data);
  }

  public uploadImage(data): Observable<any> {
    return this.http.post<any>(this.urls.uploadImage, data);
  }

}

// GET: localhost:4000/post/get
// GET: localhost:4000/post/get/:id
// POST: localhost:4000/post/add/post
// POST: localhost:4000/post/add/comment
// DELETE: localhost:4000/post/delete/:id
// DELETE: localhost:4000/post/delete/comment/:postid/:commentid
// PUT: localhost:4000/post/update/:id
// POST: localhost:4000/upload
