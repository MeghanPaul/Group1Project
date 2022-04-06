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
    const imgRef = ref(storageRef, `${user}/${title}`);
    const uploadTask = uploadBytesResumable(imgRef,file,metadata);

    uploadTask.on('state_changed',
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log('Upload is ' + progress + '% done');
        switch(snapshot.status){
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    },
    (error)=>{
        switch (error.code) {
            case 'storage/unauthorized':
                console.log('User does not have permission to access the cloud storage')
                break;
            case 'storage/canceled':
                console.log('User cancelled the upload');
                break;
            case 'storage/unknown':
                console.log('Unknown error occurred');
                console.log('ERROR CODE: ' + error.code);
                console.log('SERVER RESPONSE: ' + error.serverResponse);
                break;
            
        }
    },
    () => {
        //Upload successful
        getDownloadUrl(uploadTask.snapshot.ref).then((downloadURL)=>{
            console.log('File stored at ' + downloadURL);
        });
    });
} 

{/* <label for='img'>Select Image to Upload</label>
<input type='file' id='img' name='image' accept='image/*' capture='environment'/> */}