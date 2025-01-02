"use client"
import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim() !== '') {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2 className='mx-4 mt-4 font-bold text-xl  '>Comments</h2>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
        className='p-4 my-4 w-auto rounded-lg'
      />
      <button className='m-4 rounded-xl px-4 py-2 border-black border-2 hover:bg-black hover:text-white' onClick={handleSubmit}>Submit</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;