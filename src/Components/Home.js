import React from 'react';
import { PostsList } from './';

function Home(props) {
  return (
    <div className="home">
      <PostsList posts={props.posts} />
    </div>
  );
}

export default Home;
