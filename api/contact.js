// import needed modules/methods to access and interact with our firebase database
import { db } from "../firebase";

import {
    collection,
    addDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// define function to get and save a new contact item into database in the collection
const addContact = async ({ userId, name, phone, email, address}) => {
    
    let dataInMilli = new Date().getTime();
    let date = new Date(dataInMilli);

    try {
        await addDoc(collection(db, "contact"), {
            user: userId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            enteredOn: date.toString()
        });
        setTimeout(function(){ window.location.href="/all-contacts" }, 1000);
    } 
    catch (err) {
        console.log(err);
    }
};


// define function to delete/remove a contact item
const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } 
    catch (err) {
        console.log(err);
    }
};


export { 
    addContact, 
    deleteContact,
};