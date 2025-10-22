import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";
export const getMonth = async (user) => {
    const collectionRef = collection(db, "months");
    const q = query(collectionRef, where("user", "==", user));

    const querySnapshot = await getDocs(q);
    const months = [];
    querySnapshot.forEach((doc) => {
        months.push(doc.data())
    });
    return months;
}