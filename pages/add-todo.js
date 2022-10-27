import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Head from "next/head";

export default function AddToDo() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>Add a To Do</title>
      </Head>
      <AddTodo />
    </Container>
    )
;}