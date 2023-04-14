import { createReducer, on } from "@ngrx/store";
import { addPost, deletePost, updatePost } from "./posts.actions";
import { initialState } from "./posts.state";

export const postsReducer = createReducer(initialState,
    on(addPost, (state, action) => {

        let post = {...action.post}

        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state, action) => {
        const updatedPosts = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post;
        })

        console.log(updatedPosts)

        return {
        ...state,
         posts: updatedPosts
        }
    }),
    on(deletePost, (state, { id }) => {
        const updatedPosts = state.posts.filter(post => {
            return post.id !== id
        })
        return {
            ...state,
            posts: updatedPosts
        }
    })
    
    );