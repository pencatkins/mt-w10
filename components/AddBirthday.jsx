// import needed/methods modules
import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Text,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";

import { addBirthday } from "../api/birthday";

// define function to set variables and output it to the UI
const AddBirthday = () => {
    const [person, setPerson] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");
    const [note, setNote] = React.useState("");
    const [status, setStatus] = React.useState("card not sent");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};

    const handleBirthdayCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a birthday reminder",
                status: "error",
                duration: 9000,
                isClosable: true
            });
            return;
        }
        setIsLoading(true);
        const birthday = {
            person,
            birthdate,
            note,
            status,
            userId: user.uid
        };
        
        await addBirthday(birthday);
        
        setIsLoading(false);
        setPerson("");
        setBirthdate("");
        setNote("");
        setStatus("card not sent");
        toast({ 
            title: "Birthday reminder created", 
            status: "success" 
        });
    };
    
    return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">
        <Text 
            textAlign="center" py={2} 
            fontWeight="bold" 
            bg="#1371ec" 
            color="white" 
            rounded="md">Add A Birthday Item Below</Text>      
            <Input
            placeholder="Person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            />
            <Textarea
            placeholder="Birthday"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            />
            <Textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            />
            <Select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}>
                <option
                value={"card not sent"}
                style={{ color: "yellow", fontWeight: "bold" }}>Card not sent ⌛
                </option>
                <option
                value={"card sent"}
                style={{ color: "green", fontWeight: "bold" }}>Card sent ✅
                </option>
            </Select>
            <Button 
            onClick={() => handleBirthdayCreate()}
            disabled={person.length < 1 || birthdate.length < 1 || isLoading} 
            colorScheme="cyan"
            variant="solid">Add
            </Button>
        </Stack>
    </Box>
    );
};

export default AddBirthday;