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
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
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
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack maxW={'lg'} >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create a new post
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            something something
          </Text>
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
              <InputGroup>
                <Input placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
                 />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={createPost}
                >
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
