import dotenv from "dotenv";
dotenv.config();
import {initializeApp} from "firebase-admin/app";
import { getStorage } from 'firebase-admin/storage'
import {ref, uploadBytes} from 'firebase/storage';
import uuid from 'uuid-v4';

const firebaseConfig = {
  apiKey: "AIzaSyDteDKsKaq2Z_C8sbY-HXwVcTW3O-7uDWs",
  authDomain: "shop-45864.firebaseapp.com",
  projectId: "shop-45864",
  storageBucket: "shop-45864.appspot.com",
  messagingSenderId: "58636220724",
  appId: "1:58636220724:web:37b3b0ad321b6fd866cd61",
  measurementId: "G-D40GD0RVCW"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);

export async function uploadImg(user, title, file) {
  title = title.replace(/[^a-zA-Z0-9 ]/g,'');
  const filePath = '/User ' + user + ' ' + title;
  console.log('File Path: ' + filePath);
  console.log(storageRef);
  const imgRef = ref(storageRef, filePath);
  const token = uuid();
  const metadata = {
    firebaseStorageDownloadTokens: token
  };
  //const uploadTask = uploadBytesResumable(imgRef, file);
  console.log("firebase file path: " + filePath);

 uploadBytes(imgRef, file, metadata).then((snapshot)=> {
    console.log('Uploaded file');
    console.log(snapshot);
  });

  const downloadURL = new Promise((res,rej) => {
    res(getDownloadUrl(process.env.FIREBASE_AUTH_DOMAIN,filename,token));
  });

  downloadURL
  .then((url)=>{
    console.log("File stored at " + url);
    return(url);
  });
}
   
    //#1 attempt from Firebase docs
    /* uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.status) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          console.log(
            "User does not have permission to access the cloud storage"
          );
          break;
        case "storage/canceled":
          console.log("User cancelled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred");
          console.log("ERROR CODE: " + error.code);
          console.log("SERVER RESPONSE: " + error.serverResponse);
          break;
      }
    },
    () => {
      //Upload successful
      const downloadURL = new Promise((res,rej) => {
        res(getDownloadUrl(process.env.FIREBASE_AUTH_DOMAIN,));
      });

      downloadURL
      .then((url)=>{
        console.log("File stored at " + downloadURL);
        return(downloadURL);
      });
    }
  );
} */

const getDownloadUrl = (bucket, pathToFile, downloadToken) => {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    pathToFile
  )}?alt=media&token=${downloadToken}`;
}
