import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import uuid from 'react-uuid';

// upload a file to storage, returns download url
const uploadFile = async (orgID, file) => {
  let ext = file.name.split('.');
  ext = ext[ext.length - 1];
  const fileName = `${orgID}/${uuid()}.${ext}`;
  const fileRef = ref(storage, fileName);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

// delete file from storage, returns true/error
// const deleteFile = (orgID, name) => {
//   const fileName = `${orgID}/${name}`;
//   const fileRef = ref(storage, fileName);
//   deleteObject(fileRef).then(() => {
//     return true;
//   }).catch((e) => {
//     return e;
//   });
// };

export {
  uploadFile,
  // deleteFile,
};
