import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Markdown from "marked-react";
import { render } from "@testing-library/react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

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
        if (post.postText) {
          return (
            <Center py={6}>
              <Box
                maxW={'900px'}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>

                <Stack direction={'row'} spacing={15}>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    {post.title}
                  </Heading>

                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        navigate(`/edit/${post.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  <Button size='sm' align='right' onClick={()=>{
                    navigate(`/read/${post.id}`)
                  }}>Read</Button>

                  {isAuth && post.author_id === auth.currentUser.uid && (
                    <Button size='sm' align='right'
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >Delete
                    </Button>
                  )}
                </Stack>

                <Text color={'gray.500'} mt={4}>{post.postText}</Text>
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

            

          
            // <div className="post">
            //   <div className="postHeader">
            //     <div className="title">

            //       <h1><Markdown>{post.title}</Markdown></h1>
            //     </div>

            //     <div className="editPost">
            //       {isAuth && post.author_id === auth.currentUser.uid && (
            //         <button
            //           onClick={() => {
            //             navigate(`/edit/${post.id}`);
            //           }}
            //         >
            //           {" "}
            //           &#9998;
            //         </button>
            //       )}
            //     </div>


            //   </div>
              
              
            //   <div className="postTextContainerHome">
            //   {() => {
            //       if(post.postText == "aaaa"){
            //         return("asdf");
            //       }
            //       else{
            //         return(post.postText);
            //       }
            //     }}

                
            //     {post.postText} </div>

            //     <p><b>Created at</b>: {post.created_at}</p>
            //     {post.updated_at && ( <p><b>Updated at</b>: {post.updated_at}</p>)}
            //     <h3>@{post.author_name}</h3>
            // </div>
            

          );
        }
        })}
      </div>
    );
}

export default Home;
