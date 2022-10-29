// import needed modules/methods to access and interact with our firebase database
import { db } from "../firebase";

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

// define function to get and save a new to-do item into database in the collection
const addTodo = async ({ userId, title, description, status }) => {
    
    let dataInMilli = new Date().getTime();
    let date = new Date(dataInMilli);

    try {
        await addDoc(collection(db, "todo"), {
            user: userId,
            title: title,
            description: description,
            status: status,
            createdAt: date.toString()
        });
        setTimeout(function(){ window.location.href="/all-todos" }, 1000);
    } 
    catch (err) {
        console.log(err);
    }
};

// define function to handle a to-do status
const toggleTodoStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await updateDoc(todoRef, {
            status: status
        });
    } 
    catch (err) {
        console.log(err);
    }
};

// define function to delete/remove a to-do item
const deleteTodo = async (docId) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await deleteDoc(todoRef);
    } 
    catch (err) {
        console.log(err);
    }
};

export { 
    addTodo, 
    toggleTodoStatus, 
    deleteTodo
};