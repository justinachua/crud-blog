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
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      <nav>
        <Box>
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
