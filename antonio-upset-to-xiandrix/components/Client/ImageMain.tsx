"use client"
import React, { useState, useEffect, useContext,useRef } from "react";
import ImageDisplayContext from "./ImageDisplayContext";

import ImageViewer from "./ImageViewer";
import ImageDownloader from "./ImageDownloader";
import ImageUploader from "./ImageUploader";
import ImageManipulator from "./ImageManipulator";
import { OpenCvProvider } from "opencv-react-ts";

const ImageMain = () => {
    const noImage = "/noimage.png";
    const displayCanvas = useRef<HTMLCanvasElement>(null);
    const [tempImageURL, setTempImageURL] = useState<string|ArrayBuffer|null>(noImage);
    const [originalImageURL, setOriginalImageURL] = useState<string|ArrayBuffer|null>(null);
    const [imageWorkingSet,setImageWorkingSet] = useState<ImageManipulationType|null>({
        grayscale:0,
        threshold:0,
        brightness:50,
        rotation:0,
        stateChanged:0
    });

    return (
        <ImageDisplayContext.Provider value={{
            noImage, tempImageURL, setTempImageURL, originalImageURL, setOriginalImageURL, displayCanvas,
            imageWorkingSet, setImageWorkingSet
        }}>
            <div className='imageMain'>
                <ImageDownloader />
                <ImageUploader />
                <OpenCvProvider>
                    <ImageViewer />
                </OpenCvProvider>
                <ImageManipulator/>
            </div>
        </ImageDisplayContext.Provider>
    )
}
export default ImageMain;