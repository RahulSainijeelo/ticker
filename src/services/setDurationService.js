import { db } from "../db/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
/**
 * Saves a day's progress in a month document
 * @param {Object} data - The data containing user, month, year, day number and achievement array
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const setDay = async (data) => {
  try {

    const auth = getAuth();
    const userExist = auth.currentUser;

    if (!userExist) {
      console.error("Not authenticated");
      return;
    }

    const { user, month, year, day, achiev } = data;

    if (!user || !month || !year || !day || !achiev) {
      console.error("Missing required fields");
      return false;
    }

    const achievObj = {
      startTime: achiev[0],
      endTime: achiev[1],
      duration: achiev[2],
      goal: achiev[3]
    };

    const monthDocRef = doc(db, "months", `${user}_${year}_${month}`);

    const docSnap = await getDoc(monthDocRef);

    if (!docSnap.exists()) {
      await setDoc(monthDocRef, {
        user,
        month,
        year,
        days: {
          [day]: [achievObj]
        }
      });
    } else {
      const monthData = docSnap.data();

      if (monthData.days && monthData.days[day]) {
        await updateDoc(monthDocRef, {
          [`days.${day}`]: [...monthData.days[day], achievObj]
        });
      } else {
        await updateDoc(monthDocRef, {
          [`days.${day}`]: [achievObj]
        });
      }
    }

    return true;
  } catch (error) {
    console.error("Error saving day progress:", error);
    return false;
  }
};


