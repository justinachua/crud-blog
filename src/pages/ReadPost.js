import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Markdown from "marked-react";

function ReadPost({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  let url = window.location.href;
  let id = url.split("/").pop();
  let navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);


  return (
    <div className="homePage">
      {postLists.map((post) => {
        if (post.id == id) {
            return (
            <div className="post">
                <div className="postHeader">
                <div className="title">

                    <h1><Markdown>{post.title}</Markdown></h1>
                </div>

                <div className="editPost">
                    {isAuth && post.author_id === auth.currentUser.uid && (
                    <button
                        onClick={() => {
                        navigate(`/edit/${post.id}`);
                        }}
                    >
                        {" "}
                        &#9998;
                    </button>
                    )}
                </div>

                <div className="deletePost">
                    {isAuth && post.author_id === auth.currentUser.uid && (
                    <button
                        onClick={() => {
                        deletePost(post.id);
                        }}
                    >
                        {" "}
                        &#128465;
                    </button>
                    )}
                </div>

                </div>
                <div className="postTextContainer"> {post.postText} </div>
                <p><b>Created at</b>: {post.created_at}</p>
                <p><b>Updated at</b>: {post.updated_at}</p>
                <h3>@{post.author_name}</h3>
            </div>
            );}
      })}
    </div>
  );
}

export default ReadPost;
