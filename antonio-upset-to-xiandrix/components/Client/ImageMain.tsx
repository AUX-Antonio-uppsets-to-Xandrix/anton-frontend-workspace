"use client"
import React, { useState, useEffect, useContext } from "react";
import ImageDisplayContext from "./ImageDisplayContext";
import '../../styles/ImageViewer.css'
import ImageViewer from "./ImageViewer";
import ImageDownloader from "./ImageDownloader";
import ImageUploader from "./ImageUploader";

const ImageMain = () => {
    const noImage = "/noimage.png";

    const [tempImageURL, setTempImageURL] = useState<string|ArrayBuffer|null>(noImage);
    const [tempImage, setTempImage] = useState<File | null>(null);
    const [originalImageURL, setOriginalImageURL] = useState<string|ArrayBuffer|null>(noImage);


    return (
        <ImageDisplayContext.Provider value={{
            noImage, tempImageURL, setTempImageURL, tempImage, setTempImage, originalImageURL, setOriginalImageURL
        }}>
            <div className='imageViewer'>
                {/* <ImageDownloader />*/}
                <ImageUploader />
                <ImageViewer />
            </div>
        </ImageDisplayContext.Provider>
    )
}
export default ImageMain;