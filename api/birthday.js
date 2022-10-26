// import needed modules/methods to access and interact with our firebase database
import { db } from "../firebase";

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// define function to get and save a new birthday item into database in the collection
const addBirthday = async ({ userId, person, birthdate, note, status }) => {
    
    let dataInMilli = new Date().getTime();
    let date = new Date(dataInMilli);

    try {
        await addDoc(collection(db, "birthday"), {
            user: userId,
            person: person,
            birthdate: birthdate,
            note: note,
            status: status,
            createdAt: date.toString()
        });
    } 
    catch (err) {
        console.log(err);
    }
};

// define function to handle a birthday status
const toggleBirthdayStatus = async ({ docId, status }) => {
    try {
        const birthdayRef = doc(db, "birthday", docId);
        await updateDoc(birthdayRef, {
            status: status
        });
    } 
    catch (err) {
        console.log(err);
    }
};

// define function to delete/remove a birthday item
const deleteBirthday = async (docId) => {
    try {
        const birthdayRef = doc(db, "birthday", docId);
        await deleteDoc(birthdayRef);
    } 
    catch (err) {
        console.log(err);
    }
};

export { 
    addBirthday, 
    toggleBirthdayStatus, 
    deleteBirthday 
};