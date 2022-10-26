// import modules to authenticate user
import { useEffect, useState } from "react";
import { auth } from "../firebase";

// define function to change using React module to change and record user login state
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setIsLoggedIn(
                user && user.uid ? true : false);
                setUser(user);
            });
        });
        
        return { 
            user, 
            isLoggedIn 
        };
    };
    

export default useAuth;