import dotenv from "dotenv";
dotenv.config();
import {initializeApp} from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export async function uploadImg(user, title, file) {
  const filePath = `${user}/${title}`;
  const imgRef = ref(storage, filePath);
  //const uploadTask = uploadBytesResumable(imgRef, file);
  console.log("firebase file path: " + filePath);

  uploadBytes(imgRef, file).then((snapshot)=> {
    console.log('Uploaded file');
    console.log(snapshot);
  });

  const downloadURL = new Promise((res,rej) => {
    res(getDownloadUrl(uploadTask.snapshot.ref));
  });

  downloadURL
  .then((url)=>{
    console.log("File stored at " + url);
    return(url);
  });

  /* 
    //#1 attempt from Firebase docs
    uploadTask.on(
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
        res(getDownloadUrl(uploadTask.snapshot.ref));
      });

      downloadURL
      .then((url)=>{
        console.log("File stored at " + downloadURL);
        return(downloadURL);
      });
    }
  );*/
}

/* <label for='img'>Select Image to Upload</label>
<input type='file' id='img' name='image' accept='image/*' capture='environment'/> */
