require("dotenv").config();
import { initializeApp } from 'firebase/app';
import { getStorage,ref,uploadBytesResumable,getDownloadUrl } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const storageRef = ref(storage);

async function uploadImage(user,title) {
    const imgRef = ref(storage, `${user}/${title}`);
    const uploadTask = uploadBytesResumable(imgRef,file,metadata);
}

{/* <label for='img'>Select Image to Upload</label>
<input type='file' id='img' name='image' accept='image/*' capture='environment'/> */}