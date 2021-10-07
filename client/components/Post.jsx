import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import MainContainer from '../containers/MainContainer.jsx';
import FeedCodeBlock from './FeedCodeBlock.jsx';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

import TextField from '@mui/material/TextField';

export default function Post(props) {
  const { postID } = useParams();
  const [state, setState] = useState({
    _id: '',
    topic: '',
    date: null,
    upvotes: 0,
    downvotes: 0,
    title: '',
    issue: '',
    tried: '',
    cause: '',
    code: '',
    user_id: null,
    postComments: [],
  });

  const [comment, setComment] = useState({
    comment: '',
    code: '',
    upvotes: null,
    downvotes: null,
    date: null,
    post_id: null,
  });

  useEffect(() => {
    fetch(`/api/getPost/${postID}`)
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(event) {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  }

  // function handleClick() {
  //   fetch('/api/createComment',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type' : 'application/json',
  //       },
  //       body: JSON.stringify(comment);
  //     })
  //     .then(data => )
  // }

  const comments = state.postComments.map((obj, i) => (
    <div key={`comment${i}`} className="comment">
      <h4 style={{ textAlign: 'left' }}>{obj.user_id}</h4>
      <p>{obj.comment}</p>
    </div>
  ));
  return (
    <div>
      <AceEditor
        mode="javascript"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        theme="monokai"
        name="code"
        value={state.code}
        readOnly={true}
        height="400px"
        width="35vw"
      ></AceEditor>

      <TextField
        name="comment"
        value={state.comment}
        label="Title"
        variant="outlined"
        margin="normal"
        onChange={handleChange}
      />

      <Button id="submit" variant="contained" onClick={submitCode}>
        Post Comment
      </Button>

      <div id="comments">{comments}</div>
    </div>
  );
}