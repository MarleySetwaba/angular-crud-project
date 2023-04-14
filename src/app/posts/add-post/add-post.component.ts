import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../posts-list/state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  constructor(private store: Store<AppState>){}

  postForm: FormGroup;

  ngOnInit(): void {
    this.postForm = new FormGroup({
     title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
     description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onAddPost() {
    if(!this.postForm.valid){
      return;
    }

   const post: Post = {
    title: this.postForm.value.title,
    description: this.postForm.value.description
   }

   this.store.dispatch(addPost({ post }));
  }



  showDescriptionErrors(){
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

}
