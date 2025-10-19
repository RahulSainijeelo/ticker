import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";
import { getAuth } from "firebase/auth";
export const getMonth = async (user) => {
    const auth = getAuth();
    const userExist = auth.currentUser;
    console.log("user is this ", auth, userExist)

    if (!userExist) {
        console.error("Not authenticated");
        return;
    }

    const collectionRef = collection(db, "months");
    const q = query(collectionRef, where("user", "==", user));

    const querySnapshot = await getDocs(q);
    const months = [];
    querySnapshot.forEach((doc) => {
        months.push(doc.data())
    });
    return months;
}