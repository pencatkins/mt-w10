import { Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import BirthdayList from "../components/BirthdayList";
import ContactList from "../components/ContactList";

export default function Home() {
  return (
    <Container maxW="7xl">
      <TodoList />
      <BirthdayList />
      <ContactList/>
    </Container>
    )
;}