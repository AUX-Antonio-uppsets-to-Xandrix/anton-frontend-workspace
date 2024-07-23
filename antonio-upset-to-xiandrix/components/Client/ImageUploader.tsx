"use client"
import React,{useContext} from "react";
import { uploadFile } from "../Server/Uploadfile"
import ImageDisplayContext from "./ImageDisplayContext";

const ImageUploader=()=> {

    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { noImage, tempImageURL, setTempImageURL, tempImage, setTempImage, 
        originalImageURL, setOriginalImageURL } = imageContext;

const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; //typescript 문법. nullcheck 후 null 일시 undefined 할당
  if (file) {
    
      const fileReader = new FileReader();
      fileReader.onload=()=>{
        setOriginalImageURL(fileReader.result);
      }
      //fileReader.readAsDataURL(file);
    
      const serverForm = new FormData();
      serverForm.append("file",file);
      uploadFile(serverForm)
        .then((responseForm)=>{
            //setTempImage(responseForm.file);      
            console.log("server file saved and loaded successfully");
            //const imageUrl = URL.createObjectURL(serverFile);
            try{
              const tempUrl = responseForm.get("filePath") as string
              setTempImageURL(;
            }
        })
        .catch(err=>{
          console.log("uploadFile err! ",err);
        })
    
  }
  else return;
};

    return (
      <div className="imageUploader-container">
        <label htmlFor='loadImageInput' className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">이미지 불러오기</label>
        <input type='file' accept='image/*' id='loadImageInput' onChange={loadImage} style={{display:'none'}} />
      </div>
    );
  }
  export default ImageUploader;