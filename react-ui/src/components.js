import React, { useState, useEffect } from 'react';
import request from './request';

function Post(props) {
  const [ comments, setComments ] = useState([]);
  useEffect(() => {
    function getComments() {
      for (const commentId of props.comments) {
        request(`/api/comment/${commentId}`, (err, res, data) => {
          setComments(comments => comments.concat([JSON.parse(data)]));
        })
      }
    }

    if (props.comments) {
      getComments();
    }
  }, [props.postId, props.comments]);

  return (
    <div className="post-wrapper">
      <article className="post">
        <div>
          <h1>{props.body}</h1>
          <h2>by {props.author}</h2>
        </div>
      </article>
      <footer>
        <a href="#" onClick={props.onDelete}>Delete this post</a>
      </footer>
      <div className="comments">
        <h5>Comments</h5>
        {comments.map((comment, i) => (
          <Comment
            key={comment.commentId}
            author={comment.author}
            body={comment.body}
          />
        ))}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="comment">
      <main>
        <p>
          <div className="comment-author">{props.author}:</div>
          {props.body}
        </p>
      </main>
    </div>
  );
}

export { Post };
