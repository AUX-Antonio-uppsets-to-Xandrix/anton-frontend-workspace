type ImageManipulationType = {
  "grayscale":number;
  "brightness":number;
  "threshold":number;
  "rotation":number;
  "stateChanged":number;
}

interface ImageDisplayContextType {
    noImage: string;
    tempImageURL: string|ArrayBuffer|null;
    setTempImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
    originalImageURL: string|ArrayBuffer|null;
    setOriginalImageURL: React.Dispatch<React.SetStateAction<string|ArrayBuffer|null>>;
    imageWorkingSet:ImageManipulationType|null;
    setImageWorkingSet: React.Dispatch<React.SetStateAction<ImageManipulationType|null>>;
    displayCanvas:React.RefObject<HTMLCanvasElement|null>
    masterCanvas:React.RefObject<HTMLCanvasElement|null>
    userInfo: UserType|null;
    setUserInfo:React.Dispatch<React.SetStateAction<UserType|null>>;
  }

  interface UserType {
    uniqueId:number;
    id: string;
    //password: string;
    userWorkingSet: ImageManipulationType | null;
    userImageURL: string;
}

interface ImageUrlResponse {
  url?: string;
  error?: string;
}