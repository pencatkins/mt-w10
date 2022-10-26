import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth() || {};
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Button 
                px={5} 
                mt={2}
                ml={10} 
                rounded="xl"
                color="white" 
                float="right"
                onClick={() => location.href = "../add-todo"}
                bg="pink.800"
                variant="solid">Add To Do
            </Button>            
            <Button 
                px={5} 
                mt={2}
                ml={10} 
                rounded="xl"
                color="white" 
                float="right"
                onClick={() => location.href = "/"}
                bg="pink.800"
                variant="solid">List All Items
            </Button>
            <Button 
                px={5} 
                mt={2}
                ml={10} 
                rounded="xl"
                color="white" 
                float="right"
                onClick={() => location.href = "../add-birthday"}
                bg="pink.800"
                variant="solid">Add a Birthday
            </Button>

            <Box mr={10} textAlign="right">
                <Button onClick={() => toggleColorMode()}>
                {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                </Button>{" "}
                {isLoggedIn && (
                    <>
                    <Text color="green.500">{user.email}</Text>
                    <Link color="red.500" onClick={() => auth.signOut()}>
                    Logout
                    </Link>
                    </>
                    )}
                    {!isLoggedIn && (
                        <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                            Login with Google
                        </Button>
                    )}
            </Box>
        </Box>
    );
};

export default Auth;