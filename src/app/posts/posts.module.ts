import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { postsReducer } from "./posts-list/state/posts.reducer";
import { POSTS_STATE_NAME } from "./posts-list/state/posts.selector";


const routes: Routes= [
    {
        path: '', 
        component: PostsListComponent,
        children: 
        [
          {path: 'add', component: AddPostComponent},
          {path: 'edit/:id', component: EditPostComponent}
        ]
      
       }
];

@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent

    ],
imports: [
CommonModule, 
ReactiveFormsModule, 
RouterModule.forChild(routes), 
StoreModule.forFeature(POSTS_STATE_NAME, postsReducer)
]
})

export class PostsModule{

}