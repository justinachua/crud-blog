import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ReadPost from "./pages/ReadPost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

function App() {
  // Keeps track of whether or not the user is authenticated
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      // Clears the user's cookies stored in the localStorage since they won't be automatically cleared when the page is closed 
      localStorage.clear();
      // Sets auth to false 
      setIsAuth(false);
      // Redirects user to home upon logging out 
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      {/* Header */}
      <nav>
        <Box>

          {/* A minimalist blog  */}
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>

            <Flex flex={{ base: 1 }}>
              <Text
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}
                >
                A minimalist blog
              </Text>
            </Flex>

            {/* Home, Create Post, & Log In/Out */}
            <Stack
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>

              <Link to="/"> Home </Link> 

              {!isAuth ? (
                <Link to="/login"> Login </Link>
              ) : (
                <>
                  <Link to="/createpost"> Create Post </Link>
                  <button onClick={signUserOut}> Log Out</button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
      </nav>
 
      {/* Routing for all pages  */}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/edit/*" element={<EditPost isAuth={isAuth} />} />
        <Route path="/read/*" element={<ReadPost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
