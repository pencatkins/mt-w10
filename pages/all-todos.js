import { Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import Head from "next/head";

export default function AllTodos() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>All To Dos</title>
      </Head>
      <TodoList />
    </Container>
    )
}