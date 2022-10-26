import {
    Badge,
    Box,
    Center,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaPencilAlt } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";

const TodoList = () => {
    //react hook syntax
    const [todos, setTodos] = React.useState([]);

    //destructuring syntax to extract 'user' value returned by useAuth() function
    const {  user } = useAuth() || {};
    //declaring an instance of useToast()
    const toast = useToast();

    useEffect(() => {
        if (!user) {
            setTodos([]);
            return;
        }

        const q = query(collection(db, "todo"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {
            let ar = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
        });

    }, [user]);

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
            toast({ 
                title: "To do deleted successfully", 
                status: "success" });
        }
    };

    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus({ 
            docId: id, 
            status: newStatus 
        });
        toast({
            title: `To do marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box mt={5} pb={5}> 
           {user && (<Heading as="h1" fontSize="xl" color="white" bg="#599cf3" textAlign="center" py={5}>TO DOs</Heading>)}
           {user && (<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} p={10} bg="#599cf3">
            {todos &&
            todos.map((todo) => (
                <Box
                p={3}
                height={{ base: 125, md:150}}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "md" }}
                key={todo.id}
                bg='#599cf3'
                >
                    
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
                        onClick={() => handleTodoDelete(todo.id)}
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
                        onClick={() => location.href = `../../todo/${todo.id}`}
                        >
                        <FaPencilAlt />
                        </Badge>

                        <Badge
                        color={todo.status == "pending" ? "orange.500" : "green.300"}
                        bg="inherit"
                        transition={"0.2s"}
                        _hover={{
                            bg: "inherit",
                            transform: "scale(1.2)",
                        }}
                        float="right"
                        size="xs"
                        onClick={() => handleToggle(todo.id, todo.status)}
                        >
                            {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                        </Badge>

                        <Badge
                        float="right"
                        opacity="0.8"
                        bg={todo.status == "pending" ? "orange.500" : "green.500"}
                        >
                        {todo.status}
                        </Badge>
                

                        <Heading as="h2" fontSize={"xl"} color="white" textAlign="center" mt={7}>
                        {todo.title}
                        </Heading>

                        <Text mt={2} color="white" textAlign="center">
                        {todo.description}
                        </Text>

                    </Box>
                ))}
            </SimpleGrid>
           )}
        </Box>
    )
}
                
export default TodoList;
