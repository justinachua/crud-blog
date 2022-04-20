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

function Home({ isAuth }) {
  // A list that contains all posts to display later 
  const [postLists, setPostList] = useState([]);
  // A reference to the collection in the Firestore db named "posts"
  const postsCollectionRef = collection(db, "posts");

  // An easier way to navigate users to different pages/routes
  let navigate = useNavigate();

  // useCallback is used for this to avoid unnecessary renders from the child 
  // The function will only change the reference when any value in the dependency array changes
  // Memoization = caching the return values of function calls to use later to help with optimization/performance
  const deletePost = useCallback(async (id) => {
    // Deletes posts from the db
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // Reloads the page after deleting to refresh the db data and update the view
    window.location.reload(false);
    // Only called when db is changed 
  }, [db]);

  useEffect(() => {
    // Gets all posts from the db and puts them in postLists
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
    // Only called when deletePost is changed/called
  }, [deletePost]);


  return (
    <div className="homePage">
      {postLists.map((post) => {
        if (post.postText) {
          return (
            <Center py={6}>
              <Box
                w={'600px'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>

                {/* Post title  */}
                <Stack direction={'row'} spacing={15}>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {post.title}
                  </Heading>

                  {/* Read button  */}
                  <Button size='sm' align='right' onClick={()=>{
                    navigate(`/read/${post.id}`)
                  }}>Read</Button>

                  {/* Edit button with auth */}
                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        navigate(`/edit/${post.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  {/* Delete button with the same auth  */}
                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >Delete
                    </Button>
                  )}
                </Stack>

                {/* Post content  */}
                <Text color={'gray.500'} mt={4} noOfLines={2}>{post.postText}</Text>

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
              </Box>
          </Center>
          );
        }
        })}
      </div>
    );
}

export default Home;
