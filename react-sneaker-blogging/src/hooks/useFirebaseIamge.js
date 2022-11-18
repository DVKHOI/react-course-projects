import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function useFirebaseIamge(setValue, getValues) {
  const storage = getStorage();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!getValues || !setValue) return;
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    handleChangeImage(file);
    if (!file) return;
    setValue("image_name", file.name);
  };
  const handleChangeImage = (file) => {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Notthing at all");

            break;
        }
      },
      (error) => {
        console.log("Error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleDeleteImage = (e) => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("Delete image successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Can not delete image");
      });
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    progress,
    image,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  };
}
