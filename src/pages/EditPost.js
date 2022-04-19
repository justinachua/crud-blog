import React, { useState, useEffect } from "react";
import { updateDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function EditPost({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  let url = window.location.href;
  let id = url.split("/").pop();
  let navigate = useNavigate();

  const editPost = async () => {
    const d = new Date();
    const postDoc = doc(db, "posts", id)
    await updateDoc(postDoc, {
      title,
      postText,
      updated_at: d.toLocaleString(),
    });
    navigate("/");
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    if (!isAuth) {
      navigate("/login");
    }
    getPosts();
  }, []);

  return (
    <div className="createPostPage">
      {postLists.map((post) => {
        if (post.id === id) {
          // only set state if its empty
          if(title === '' && postText === '') {
            setTitle(post.title);
            setPostText(post.postText);
          }
          return (
            <div className="cpContainer">
              <h1>Edit Post</h1>
              <div className="inputGp">
                <label> Title:</label>
                <input
                  placeholder="Title..."
                  defaultValue={post.title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className="inputGp">
                <label> Post:</label>
                <textarea
                  placeholder="Post..."
                  defaultValue={post.postText}
                  onChange={(event) => {
                    setPostText(event.target.value);
                  }}
                />
              </div>
              <button onClick={editPost}> Edit Post</button>
            </div>
          );}
        })}
      </div>
    );
}

export default EditPost;