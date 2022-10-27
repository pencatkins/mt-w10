import { Container } from "@chakra-ui/react";
import ContactList from "../components/ContactList";
import Head from "next/head";
export default function AllContacts() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>All Contacts</title>
      </Head>
      <ContactList />
    </Container>
    )
;}