import React, { useState, useEffect, useCallback } from 'react';
import { Post } from './components';
import request from './request';

function App() {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    function getAllPosts() {
      request.get('/api/posts', (err, res, data) => {
        setPosts(JSON.parse(data));
      });
    }

    getAllPosts()
  }, [])

  const handleAddPost = useCallback(evt => {
    evt.preventDefault();
    const formInputs = evt.target.elements;

    const newPost = {
      author: formInputs['author'].value,
      body: formInputs['body'].value
    }

    request.post({
      url: '/api/posts',
      form: newPost
    }, (err, res, data) => {
      setPosts(posts => [JSON.parse(data)].concat(posts));
    })
  }, []);

  const handleDeletePost = useCallback(postId => {
    request.delete(`/api/post/${postId}`, (err, res, data) => {
      setPosts(posts => posts.filter(post => post.postId !== postId));
    });
  }, []);

  return (
    <div className="container">
      <aside className="action-menu">
        <form onSubmit={handleAddPost}>
          <div>
            <h3>Create new post:</h3>
            <textarea name="body" placeholder="type stuff here"/>
          </div>
          <div className="row">
            <label>Name</label>
            <input type="text" name="author" />
          </div>
          <input type="submit" value="Submit Post"/>
        </form>
      </aside>

      <main className="content">
        {(posts.length === 0
          ? <p>Loading posts...</p>
          : posts.map(post => (
            <Post
              key={post.postId}
              postId={post.postId}
              author={post.author}
              body={post.body}
              comments={post.comments}
              onDelete={() => handleDeletePost(post.postId)}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
