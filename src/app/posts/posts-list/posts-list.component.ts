import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost } from './state/posts.actions';
import { getPosts } from './state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
posts: Observable<Post[]>;
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: string){
if (confirm('Are You Sure?'))
{
  this.store.dispatch(deletePost({ id }))
}
  }

}
