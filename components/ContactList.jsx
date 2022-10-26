import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { deleteContact} from "../api/contact";


const ContactList = () => {
    //react hook syntax
    const [contacts, setContacts] = React.useState([]);
    //destructuring syntax to extract 'user' value returned by useAuth() function
    const {  user } = useAuth() || {};
    //declaring an instance of useToast()
    const toast = useToast();

    useEffect(() => {
        if (!user) {
            setContacts([]);
            return;
        }

        const q = query(collection(db, "contact"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {
            let ar = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
            return ar;
        });

    }, [user]);

    const handleContactDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            deleteContact(id);
            toast({ 
                title: "Contact deleted successfully", 
                status: "success" });
        }
    };

    return (

        <Box mt={5} pb={5}>
            {user && (<Heading as="h2" fontSize="xl" color="white" bg="#0b4a9d" textAlign="center" py={5}>CONTACTS</Heading>)}
            {user && (<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} bg="#0b4a9d" p={10}>
            {contacts &&
            contacts.map((contact) => (
                <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "md" }}
                key={contact.id}
                bg='#0c4b9d'
                >
                    <Heading as="h3" fontSize={"xl"} color="gray.300">
                    {contact.name}{" "}  

                    <Badge
                    color="white"
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                        bg: "inherit",
                        transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleContactDelete(contact.id)}
                    >
                    <FaTrash />
                    </Badge> 

                    <Badge
                    color="white"
                    bg="none"
                    transition={"0.2s"}
                    _hover={{
                        bg: "inherit",
                        transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => location.href = `../../contact/${contact.id}`}
                    >
                    <FaPencilAlt/>    
                    </Badge> 

                    </Heading>
                    <Text color="gray.300">{contact.phone}</Text>

                    </Box>
                    ))}
            </SimpleGrid>)}
        </Box>
    );
};
                
export default ContactList;
