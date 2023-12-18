import { get } from "../utils/AJAX";

export const PostsError = "canny/posts/error";
function postError(error) {
  return {
    error,
    timestamp: Date.now(),
    type: PostsError,
  };
}

export const PostsLoaded = "canny/posts/loaded";
function postsLoaded(posts, pages) {
  return {
    pages,
    posts,
    timestamp: Date.now(),
    type: PostsLoaded,
  };
}

export const RecountVotes = "canny/posts/recount";
export function recountVotes(posts) {
  return {
    posts,
    type: RecountVotes,
  };
}

export function fetchPosts(params) {
  return async (dispatch, getState) => {
    const { error, pages, posts } = await get("/api/posts/get", {
      ...params,
      sort: getState().sort.sort,
    });
    if (error) {
      return dispatch(postError(error));
    }
    //dispatch votes to state
    await dispatch(recountVotes(posts));
    return dispatch(postsLoaded(posts, pages));
  };
}

export function loadPosts() {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // call dispatch function that recounts votes
    return dispatch(recountVotes(getState().posts.posts));
  };
}
