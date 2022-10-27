import { Container } from "@chakra-ui/react";
import AddBirthday from "../components/AddBirthday";
import Head from "next/head";

export default function AddBirthDay() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>Add a Birthday</title>
      </Head>
      <AddBirthday />
    </Container>
    )
;}