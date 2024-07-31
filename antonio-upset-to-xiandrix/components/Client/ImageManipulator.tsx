"use client";
import React,{useState,useContext} from "react";
import ImageDisplayContext from "./ImageDisplayContext";

const ImageManipulator=()=>{
    //var cv = require('opencv.js');

    const imageContext = useContext(ImageDisplayContext);
    if(!imageContext){
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const {
        imageWorkingSet, setImageWorkingSet } = imageContext;

    const grayscaleHandler=(e : React.ChangeEvent<HTMLInputElement>)=>{
        //방식 1 : 전통적인 event handler
        if(imageWorkingSet){
            setImageWorkingSet({
                ...imageWorkingSet,
                grayscale: Number(e.target.value),
            });
    }
        console.log("imageWorkingset : ",imageWorkingSet);
       //방식 2 : prevstate 사용..이건 나중에 잘 안되면 해보자
    }

    const thresholdHandler=(e : React.ChangeEvent<HTMLInputElement>)=>{
        //방식 1 : 전통적인 event handler
        if(imageWorkingSet){
            setImageWorkingSet({
                ...imageWorkingSet,
                threshold: Number(e.target.value)
            });
    }
        console.log("imageWorkingset : ",imageWorkingSet);
       //방식 2 : prevstate 사용..이건 나중에 잘 안되면 해보자
    }

    return(
        <div className="image-manipulation-container">
            <div className="w-96 image-manipulation-bar">
                <label htmlFor="grayscale-range" className="block mb-1 text-sm font-medium text-red-400 dark:text-white">grayscale</label>
                <input id="grayscale-range" type="range" min="0" max="100" value={imageWorkingSet?.grayscale ?? 0}
                onChange={e=>grayscaleHandler(e)}
                className="h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer w-80 dark:bg-gray-700"/>
                <p className="block mt-1 text-sm font-medium text-gray-900 dark:text-white">{imageWorkingSet?.grayscale ?? 0}</p>
            </div>
            <div className="w-96 image-manipulation-bar">
                <label htmlFor="threshold-range" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">threshold</label>
                <input id="threshold-range" type="range" min="0" max="100" value={imageWorkingSet?.threshold ?? 0}
                onChange={e=>thresholdHandler(e)}
                className="h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer w-80 dark:bg-gray-700"/>
                <p className="block mt-1 text-sm font-medium text-gray-900 dark:text-white">{imageWorkingSet?.threshold ?? 0}</p>
            </div>
        </div>
    )
}
export default ImageManipulator;