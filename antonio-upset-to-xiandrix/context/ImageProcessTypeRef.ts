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

  }