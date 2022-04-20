import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
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

// Checks if you're authenticated before creating the post
function CreatePost({ isAuth }) {
  // Keeps track of title + content
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  // postsCollectionRef is a reference to the collection in the Firestore db named "posts"
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    // Ensures that both the title and content are present to create a post 
    if (title == '' || postText == ''){
      alert("You need to fill both title and content!");
      // Returns early if otherwise
      return;
    }
    // Creates a timestamp 
    const d = new Date();
    // Adds the post to the Firestore db 
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author_name: auth.currentUser.displayName,
      author_id: auth.currentUser.uid ,
      created_at: d.toLocaleString(),
    });
    navigate("/");
  };

  useEffect(() => {
    // Checks if authenticated => otherwise redirect to /login 
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Flex
        mt={5}
        minH={'55vh'}
        justify={'center'}
        >
        {/* Create a new post  */}
        <Stack w={'600px'}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'} textAlign={'center'}>
              Create a new post
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}
            >
            
            <Stack spacing={4}>
              {/* Set title  */}
              <FormControl id="email" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="title" placeholder="Title..."
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }} />
              </FormControl>

              {/* Set content  */}
              <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea placeholder="Content..."
                  onChange={(event) => {
                    setPostText(event.target.value);
                  }} />
              </FormControl>

              {/* Publish  */}
              <Stack spacing={10} pt={2}>
                <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500',}} onClick={createPost}>
                  Publish
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}

export default CreatePost;
