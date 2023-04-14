import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../posts-list/state/posts.actions';
import { getPostById } from '../posts-list/state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<AppState>){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store.select(getPostById(id)).subscribe(data => {
        this.post = data
        console.log(this.post);
        this.createForm();
      });

    })
  }  

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });

  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if(descriptionForm.touched && !descriptionForm.valid){
      if(descriptionForm.errors?.['required']){
        return 'Description Is Required';
      }

      if(descriptionForm.errors?.['minLength']){
        return 'Description Should Be Minimum 10 Characters';
      }

    }
    return null;
  }
  

  onSubmit(){
    if(!this.postForm.valid)
    {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description
    }

    this.store.dispatch(updatePost({ post }))



  }
  onUpdatePost(){


  }
}
