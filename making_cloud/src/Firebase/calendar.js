import {collection,doc, setDoc, getDocs, query,where} from "firebase/firestore"
import db from "./firebase"

export function setCalendar(uid, userName, users, goals, clears, data){
    setDoc(doc(db, "calendar", uid), {
        'uid': uid,
        'userName': userName,
        'users': users,
        "goals": goals,
        'clears': clears,
        'data': data,
    })
}

export function setCalDefaultUserData(uid, userName){
    setDoc(doc(db, "calendar", uid), {
        'uid': uid,
        'userName': userName,
    })
}

export function setCalUsers(uid, userName, users){
    setDoc(doc(db, "calendar", uid), {
        'uid': uid,
        'userName': userName,
        'users': users,
    })
}

export function setCalGoals(uid, goals){
    setDoc(doc(db, "calendar", uid), {
        'goals': goals
    })
}

export function setCalClears(uid, clears){
    setDoc(doc(db, "calendar", uid), {
        'clears': clears
    })
}


export async function getCalendar(uid) {
    const rawDatas = await getDocs(collection(db,"calendar", uid));

    let datas = []
    rawDatas.forEach((doc) => {
        datas = [...datas, doc.data()];
    })
    console.log(datas);
    return datas;
}