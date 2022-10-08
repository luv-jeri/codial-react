import { UPDATE_POSTS } from "./Action_Types";

export function fetchPosts() {
  return (dispatch) => {
    let url = "https://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}
