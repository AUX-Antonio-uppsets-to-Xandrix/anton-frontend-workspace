type ImageManipulationType = {grayscale:number;brightness:number;threshold:number }

interface ImageDisplayContextType {
    noImage: string;
    tempImageURL: string|ArrayBuffer|null;
    setTempImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
    tempImage: File | null;
    setTempImage: React.Dispatch<React.SetStateAction<File | null>>;
    originalImageURL: string|ArrayBuffer|null;
    setOriginalImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
    imageWorkingSet:ImageManipulationType|null;
    setImageWorkingSet: React.Dispatch<React.SetStateAction<ImageManipulationType|null>>
  }