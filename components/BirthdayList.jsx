import {
    Badge,
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaPencilAlt } from "react-icons/fa";
import { deleteBirthday, toggleBirthdayStatus } from "../api/birthday";

const BirthdayList = () => {
    //react hook syntax
    const [birthdays, setBirthdays] = React.useState([]);
    //destructuring syntax to extract 'user' value returned by useAuth() function
    const {  user } = useAuth() || {};
    //declaring an instance of useToast()
    const toast = useToast();

    useEffect(() => {
        if (!user) {
            setBirthdays([]);
            return;
        }

        const q = query(collection(db, "birthday"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {
            let ar = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setBirthdays(ar);
        });

    }, [user]);

    const handleBirthdayDelete = async (id) => {
        if (confirm("Are you sure you wanto to delete this birthday item?")) {
            deleteBirthday(id);
            toast({ 
                title: "Birthday item deleted successfully", 
                status: "success" });
        }
    };


    const handleToggle = async (id, status) => {
        const newStatus = status == "card sent" ? "card not sent" : "card sent";
        await toggleBirthdayStatus({ 
            docId: id, 
            status: newStatus 
        });
        toast({
            title: `Birthday reminder: ${newStatus}`,
            status: newStatus == "card sent" ? "success" : "warning",
        });
    };
    return (
        <Box mt={5} pb={5}>
            {user && (<Heading as="h2" fontSize="xl" color="white" bg="#1371ec" textAlign="center" py={5}>BIRTHDAYS</Heading>)}            
            {user && (<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} p={10} bg="#1371ec">
            {birthdays &&
            birthdays.map((birthday) => (
                <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "sm" }}
                key={birthday.id}
                bg='#1371ec'
                >
                    <Heading as="h3" fontSize={"xl"} color="white">
                    {birthday.person}{" "}
                    <Badge
                    color="blue.800"
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                        bg: "inherit",
                        transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleBirthdayDelete(birthday.id)}
                    >
                    <FaTrash />
                    </Badge>

                    <Badge
                        color="blue.800"
                        bg="inherit"
                        transition={"0.2s"}
                        _hover={{
                            bg: "inherit",
                            transform: "scale(1.2)",
                        }}
                        float="right"
                        size="xs"
                        onClick={() => location.href = `../../birthday/${birthday.id}`}
                        >
                        <FaPencilAlt />
                        </Badge>
                    <Badge
                    color={birthday.status == "card not sent" ? "orange.500" : "green.300"}
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                        bg: "inherit",
                        transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleToggle(birthday.id, birthday.status)}
                    >
                        {birthday.status == "card not sent" ? <FaToggleOff /> : <FaToggleOn />}
                    </Badge>
                    <Badge
                    float="right"
                    opacity="0.8"
                    bg={birthday.status == "card not sent" ? "orange.500" : "green.500"}
                    >
                        {birthday.status}
                    </Badge>
                    </Heading>
                    <Text color="white">{birthday.birthdate}</Text>

                    <Box>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' color="white">
                                Details
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <Text color="white">{birthday.note}</Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    </Box>

                    </Box>
                    ))}
            </SimpleGrid>)}
        </Box>
    );
};
                
export default BirthdayList;
