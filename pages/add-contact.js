import { Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Head from "next/head";

export default function AddAContact() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>Add a Contact</title>
      </Head>
      <AddContact />
    </Container>
    )
;}