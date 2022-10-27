import React from "react";
import { useState} from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Center,
    Text,
    Input,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import 'firebase/firestore';
import { db } from "../../firebase";

// define a jsx component to show a single bithday item
const ContactItem = ({itemData, docNo}) => {
    let [nameName, setNameName] = React.useState(`${itemData.name}`);
    let [phoneName, setPhoneName] = React.useState(`${itemData.phone}`);
    let [emailName, setEmailName] = React.useState(`${itemData.email}`);
    let [addressName, setAddressName] = React.useState(`${itemData.address}`);
    let [enteredOnName, setEnteredOnName] = React.useState(`${itemData.enteredOn}`);
    const docIdSt = `${docNo.documentId}`; 
    const toast = useToast(); 

    // check that user is logged in
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }


    //define update function to edit the birthday item
    const updateDocDB = async () => {      
        const docRef = doc(db, 'contact', docIdSt);

        const data = {
            name: nameName,
            phone: phoneName,
            email: emailName,
            address: addressName,
            enteredOn: enteredOnName,
        };

        await setDoc(docRef, data, {merge:true})
        .then(() => {
            console.log("Value of an Existing Document Field has been updated");
            toast({ 
                title: "updated!", 
                status: "success" 
            });
            setTimeout(function(){ window.location.href="../all-contacts" }, 2000);
        })
        .catch(error => {
            console.log(error);
        })    
    }
        
    // user is logged in, return jsx compoment
    return (
        <Center width={"100vw"} mt={10}>
        <Head><title>Contact Item Detail</title></Head>
        <Box 
        p={5} 
        rounded="lg" 
        boxShadow="2xl"
        shadow={"dark-lg"}
        transition="0.2s"
        key={itemData.id}
        >
            <Text textAlign="center" rounded="md" bg="#0c4b9d" color="white" py={2} ml={2} mb={2} fontWeight="bold">Edit Contact Below</Text>
            <Text ml={2} mb={2} fontWeight="bold">Name</Text>
            <Input
            type="text"
            value={nameName}
            onChange={(e) => setNameName(e.target.value)}
            placeholder={itemData.name}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Phone</Text>
            <Input
            type="text"
            value={phoneName}
            onChange={(e) => setPhoneName(e.target.value)}
            placeholder={itemData.phone}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Email</Text>
            <Input
            type="text"
            value={emailName}
            onChange={(e) => setEmailName(e.target.value)}
            placeholder={itemData.email}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Address</Text>
            <Input
            type="text"
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
            placeholder={itemData.address}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Entered on</Text>
            <Input
            type="text"
            value={enteredOnName}
            onChange={(e) => setEnteredOnName(e.target.value)}
            placeholder={itemData.enteredOn}
            size='sm'
            mb={4}
            />

            <Button colorScheme="blue" float="right" mb={2} onClick={() => { 
                updateDocDB()
                }}>
                Update
            </Button>
        </Box>
        </Center>
    )

};

// define getServerSideProps whenever it gets a dynamically routed URL: /todo/[id]
export async function getServerSideProps(context) {
    // context.params.id to get the URL parameter
    let itemData = null;
    let docNo = null;
    // get doc from firestore
    // get doc reference first
    const docRef = doc(db, 'contact', context.params.id);
    docNo={documentId: context.params.id};
    // get doc snapshot which is the data
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        itemData = docSnap.data();
    }

    return {
        props: {
            itemData,
            docNo,
        }
    };
}

export default ContactItem;