import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
} from '@chakra-ui/react';

function ReadPost({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  let url = window.location.href;
  let id = url.split("/").pop();
  let navigate = useNavigate();

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload(false);
  }, [db]);

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
              <Center py={6}>
              <Box
                w={'900px'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>

                {/* Post title   */}
                <Stack direction={'row'} spacing={15}>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {post.title}
                  </Heading>

                  {/* Edit and Delete buttons if authenticated */}
                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        navigate(`/edit/${post.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >Delete
                    </Button>
                  )}
                </Stack>

                {/* Profile picture, author name, and created at / updated at time stamps  */}
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                  <Avatar
                    src={'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
                    alt={'Author'}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{post.author_name}</Text>
                    <Text color={'gray.500'}>Created at {post.created_at}</Text>
                    <Text color={'gray.500'}>{post.updated_at && ( <p>Updated at: {post.updated_at}</p>)}</Text>
                  </Stack>
                </Stack>

                {/* Post content  */}
                <Text color={'gray.500'} mt={4}>{post.postText}</Text>
                
              </Box>
          </Center>




            
            )
            ;}
      })}
    </div>
  );
}

export default ReadPost;
