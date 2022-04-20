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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  let url = window.location.href;
  let id = url.split("/").pop();
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    const d = new Date();
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
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);


  return (
    <div>
      <Flex
        mt={5}
        minH={'55vh'}
        justify={'center'}
        >
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
              <FormControl id="email" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="title" placeholder="Title..."
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }} />
              </FormControl>

              <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea placeholder="Content..."
                  onChange={(event) => {
                    setPostText(event.target.value);
                  }} />
              </FormControl>

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
