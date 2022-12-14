import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import db from "./firebase";

export function setLocation(title, latitude, longtitude, circum) {
  setDoc(doc(db, "location", title), {
    title: title,
    latitude: latitude,
    longtitude: longtitude,
    circum: circum,
  });
}

export const getLocation = async () => {
  const rawDatas = await getDocs(collection(db, "location"));

  let datas = [];
  rawDatas.forEach((doc) => {
    datas = [...datas, doc.data()];
  });
  return datas;
};

export async function getComments(locationTitle) {
  const ref = doc(db, "comments", `${locationTitle}`);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to comments object
    const comments = docSnap.data();
    // Use a comments instance method
    return comments.sendData;
  }
return null
}

export async function setComments(locationTitle, sendData) {
  const comments = await setDoc(doc(db, "comments", locationTitle), {sendData});
  console.log(comments);
}
