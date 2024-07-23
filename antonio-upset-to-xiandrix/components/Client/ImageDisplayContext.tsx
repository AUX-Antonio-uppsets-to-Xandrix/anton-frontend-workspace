import React,{createContext} from "react";

interface ImageDisplayContextType {
    noImage: string;
    tempImageURL: string|ArrayBuffer|null;
    setTempImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
    tempImage: File | null;
    setTempImage: React.Dispatch<React.SetStateAction<File | null>>;
    originalImageURL: string|ArrayBuffer|null;
    setOriginalImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
  }
  
  // 기본값을 명확히 지정하여 생성
  const ImageDisplayContext = createContext<ImageDisplayContextType | null>(null);

  export default ImageDisplayContext; 