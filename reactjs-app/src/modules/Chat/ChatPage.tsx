import React from 'react'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { Button } from 'antd';
import { db } from './libraries/firebase/initializaApp';
import ChatBox from './ChatBox';

type Props = {}

export default function ChatPage({ }: Props) {
  // const handleAddData = async () => {

  //   const docRef = doc(db, "tablemessage", "messagejob"); // cái tablemessage là tên collection ( tên của cái bảng), messagejob là tên document ( hay còn gọi dc là id)
  //   await setDoc(docRef, {   // gọi cái setDoc để thêm dữ liệu vào trong firebase ( như kiểu lưu dlieu vào bảng á)
  //     content: "hello job",
  //   });
  // }

  const handleAddData = async () => {
    const docRef = await addDoc(collection(db, 'messages'), {
      from: 'tungnt@softech.vn',
      to: 'nhannn@softech.vn',
      content: 'Hello, this is a test message!',
      created_at: Timestamp.fromDate(new Date()),
    });

    console.log('Document written with ID: ', docRef.id);
  };

  const handleDeleteData = async () => {
    const docRef = doc(db, 'messages', 'rBjSkzQItoVBjWuFZbgQ');
    await deleteDoc(docRef);
  };

  const handleReadData = async () => {
    const docRef = doc(db, 'messages', '3qkYhMhv9lniQakhqadB');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const handleGetMultipleDocs = async () => {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const handleGetSubcollectionDocs = async () => {
    const querySnapshot = await getDocs(collection(db, 'messages', '2cqjBPTjY86OLTGO4dwU', 'logs'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };


  return (
    <div>
      <h1> xây dựng phần chat giữa hr và ứng viên</h1>
      {/* 
      <Button onClick={handleAddData}>
        Add data
      </Button> */}
      <ChatBox currentUser="hoangle191204@gmail.com" />
    </div>


  )
}