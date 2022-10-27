import { Container } from "@chakra-ui/react";
import BirthdayList from "../components/BirthdayList";
import Head from "next/head";

export default function AllBirthdays() {
  return (
    <Container maxW="7xl">
      <Head>
            <title>All Birthdays</title>
      </Head>
      <BirthdayList />
    </Container>
    )
;}