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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

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
    <div>
      {postLists.map((post) => {
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
                    <FormControl id="email" isRequired>
                      <FormLabel>Title</FormLabel>
                      <Input type="title" placeholder="Title..."
                        defaultValue={post.title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl id="content" isRequired>
                      <FormLabel>Content</FormLabel>
                      <Textarea 
                        placeholder="Content..."
                        defaultValue={post.postText}
                        onChange={(event) => {
                          setPostText(event.target.value);
                        }}
                        />
                    </FormControl>

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