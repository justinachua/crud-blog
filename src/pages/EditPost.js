import React, { useState, useEffect } from "react";
import { updateDoc, getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react';

function EditPost({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [edited, setEdited] = useState(false);

  // Grabs the post ID from the url (url is /read/:id)
  let url = window.location.href;
  let id = url.split("/").pop();
  let navigate = useNavigate();

  const editPost = async () => {
    // Title and content are required, same as creating a post 
    if (title == '' || postText == ''){
      alert("You need to fill both title and content!");
      return;
    }

    // Publishes the edited post
    const d = new Date();
    const postDoc = doc(db, "posts", id)
    // Checks if anything has been edited, if so an API call is sent
    if(edited){
      await updateDoc(postDoc, {
        title,
        postText,
        updated_at: d.toLocaleString(),
      });
    }
    // Redirects back to home page 
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
    <div>
      {postLists.map((post) => {
        // Finding the post that matches the ID
        if (post.id === id) {
          if(title === '' && postText === '') {
            setTitle(post.title);
            setPostText(post.postText);
          }
          return (
            <Flex
              mt={5}
              minH={'55vh'}
              justify={'center'}
              >
              
              {/* Edit your post  */}
              <Stack w={'900px'}>
                <Stack align={'center'}>
                  <Heading fontSize={'2xl'} textAlign={'center'}>
                    Edit your post
                  </Heading>
                </Stack>
                <Box
                  rounded={'lg'}
                  boxShadow={'lg'}
                  p={8}
                  >

                  <Stack spacing={4}>
                    {/* Edit title  */}
                    <FormControl id="email" isRequired>
                      <FormLabel>Title</FormLabel>
                      <Input type="title" placeholder="Title..."
                        // Sets default value to the current title 
                        defaultValue={post.title}
                        onChange={(event) => {
                          setEdited(true);
                          setTitle(event.target.value);
                        }}
                      />
                    </FormControl>

                    {/* Edit content  */}
                    <FormControl id="content" isRequired>
                      <FormLabel>Content</FormLabel>
                      <Textarea placeholder="Content..."
                        // Sets default value to the current post 
                        defaultValue={post.postText}
                        onChange={(event) => {
                          setEdited(true);
                          setPostText(event.target.value);
                        }}
                        />
                    </FormControl>

                    {/* Publish  */}
                    <Stack spacing={10} pt={2}>
                      <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500',}} 
                      onClick={editPost}
                      >
                        Publish
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          );}
        })}
    </div>
    );
}

export default EditPost;