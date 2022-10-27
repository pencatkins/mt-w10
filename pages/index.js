import { Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import BirthdayList from "../components/BirthdayList";
import ContactList from "../components/ContactList";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>All Lists</title>
      </Head>
      <TodoList />
      <BirthdayList />
      <ContactList/>
    </Container>
    )
;}