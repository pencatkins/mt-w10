// import needed/methods modules
import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";

import { addContact } from "../api/contact";

// define function to set variables and output it to the UI
const AddContact = () => {
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};

    const handleContactCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to add a contact",
                status: "error",
                duration: 9000,
                isClosable: true
            });
            return;
        }
        setIsLoading(true);
        const contact = {
            name,
            email,
            phone,
            address,
            userId: user.uid
        };
        
        await addContact(contact);
        
        setIsLoading(false);
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        toast({ 
            title: "Contact created", 
            status: "success" 
        });
    };
    
    return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">
            <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Textarea
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <Textarea
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
            <Button 
            onClick={() => handleContactCreate()}
            disabled={name.length < 1 || phone.length < 1 || email.length < 1 || address.length < 1 || isLoading} 
            colorScheme="teal"
            variant="solid">Add
            </Button>
        </Stack>
    </Box>
    );
};

export default AddContact;