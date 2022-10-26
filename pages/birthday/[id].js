import React from "react";
import { useState} from "react";
import {
    Box,
    Button,
    Center,
    Text,
    Input,
    useToast,
    Select,
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
const BirthdayItem = ({itemData, docNo}) => {
    let [personName, setPersonName] = React.useState(`${itemData.person}`);
    let [birthdateName, setBirthdateName] = React.useState(`${itemData.birthdate}`);
    let [noteName, setNoteName] = React.useState(`${itemData.note}`);
    let [statusName, setStatusName] = React.useState(`${itemData.status}`);
    let [createdAtName, setCreatedAtName] = React.useState(`${itemData.createdAt}`);
    const docIdSt = `${docNo.documentId}`; 
    const toast = useToast(); 

    // check that user is logged in
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }


    //define update function to edit the birthday item
    const updateDocDB = async () => {      
        const docRef = doc(db, 'birthday', docIdSt);

        const data = {
            person: personName,
            birthdate: birthdateName,
            note: noteName,
            status: statusName,
            createdAt: createdAtName,
        };

        await setDoc(docRef, data, {merge:true})
        .then(() => {
            console.log("Value of an Existing Document Field has been updated");
            toast({ 
                title: "updated!", 
                status: "success" 
            });
            setTimeout(function(){ window.location.href="../all-birthdays" }, 2000);
        })
        .catch(error => {
            console.log(error);
        })    
    }
        
    // user is logged in, return jsx compoment
    return (
        <Center width={"100vw"} mt={10}>
        <Box 
        p={5}
        bg="#599cf3" 
        color="black"
        rounded="lg" 
        boxShadow="2xl"
        shadow={"dark-lg"}
        transition="0.2s"
        _hover={{ bg: '#1566d1' }}
        key={itemData.id}
        >

            <Text ml={2} mb={2} fontWeight="bold">Person</Text>
            <Input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            placeholder={itemData.person}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Birthdate</Text>
            <Input
            type="text"
            value={birthdateName}
            onChange={(e) => setBirthdateName(e.target.value)}
            placeholder={itemData.birthdate}
            size='sm'
            mb={4}
            />

            <Text ml={2} mb={2} fontWeight="bold">Facts</Text>
            <Input
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder={itemData.note}
            size='sm'
            mb={4}
            />
           
            <Text ml={2} mb={2} fontWeight="bold">Status</Text>  
            <Select placeholder={statusName} rounded={0} size='sm' mb={4} onChange={(e) => setStatusName(e.target.value)}>
                <option value="pending">card not sent</option>
                <option value="completed" >card sent</option>
            </Select>

            <Text ml={2} mb={2} fontWeight="bold">Created on</Text>
            <Input
            type="text"
            value={createdAtName}
            onChange={(e) => setCreatedAtName(e.target.value)}
            placeholder={itemData.createdAt}
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


// define getServerSideProps whenever it gets a dynamically routed URL: /birthday/[id]
export async function getServerSideProps(context) {
    // context.params.id to get the URL parameter
    let itemData = null;
    let docNo = null;
    // get doc from firestore
    // get doc reference first
    const docRef = doc(db, 'birthday', context.params.id);
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

export default BirthdayItem;
