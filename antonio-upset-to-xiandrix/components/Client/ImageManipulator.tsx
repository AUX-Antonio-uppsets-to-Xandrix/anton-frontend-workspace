"use client";
import React, { useState, useContext } from "react";
import ImageDisplayContext from "./ImageDisplayContext";

const ImageManipulator = () => {
    //var cv = require('opencv.js');

    const imageContext = useContext(ImageDisplayContext);
    if (!imageContext) {
        alert("imageContext 불러오기 에러 발생!");
        console.log("ImageViewer err");
        return;
    }
    const { imageWorkingSet, setImageWorkingSet } = imageContext;
    const grayscaleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        //방식 1 : 전통적인 event handler
        if (imageWorkingSet) {
            setImageWorkingSet({
                ...imageWorkingSet,
                grayscale: Number(e.target.value),
            });
        }
    }
    /*
        const rangeBarHandler = (e: React.ChangeEvent<HTMLInputElement>,fieldName:string) => {
            //방식 1 : 전통적인 event handler
            if (imageWorkingSet) {
                setImageWorkingSet({
                    ...imageWorkingSet,
                    fieldName: Number(e.target.value),
                });
            }
        }
    */
    const thresholdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imageWorkingSet) {
            setImageWorkingSet({
                ...imageWorkingSet,
                threshold: Number(e.target.value)
            });
        }
    }

    const brightnessHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imageWorkingSet) {
            setImageWorkingSet({
                ...imageWorkingSet,
                brightness: Number(e.target.value)
            });
        }
    }

    const toOriginalImage = () => {
        setImageWorkingSet({
            grayscale: 0,
            threshold: 0,
            brightness: 50,
            rotation: 0,
            stateChanged: 0
        });
    }
    const rotateImage = () => {
        if (imageWorkingSet)
            setImageWorkingSet({
                ...imageWorkingSet,
                rotation: ((imageWorkingSet?.rotation) + 1) % 4
            })
    }

    return (
        <div className="image-manipulation-container">
            <button type="button" onClick={toOriginalImage} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">원상태로</button>
            <button type="button" onClick={rotateImage} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">회전하기</button>
            {/*<button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
            <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
            */}
            <div className="w-96 image-manipulation-bar">
                <label htmlFor="grayscale-range" className="block mb-1 text-sm font-medium text-red-400 dark:text-white">grayscale</label>
                <input id="grayscale-range" type="range" min="0" max="100" value={imageWorkingSet?.grayscale ?? 0}
                    name="grayscale"
                    onChange={e => grayscaleHandler(e)}
                    className="h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer w-80 dark:bg-gray-700" />
                <p className="block mt-1 text-sm font-medium text-gray-900 dark:text-white">{imageWorkingSet?.grayscale ?? 0}</p>
            </div>

            <div className="w-96 image-manipulation-bar">
                <label htmlFor="threshold-range" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">threshold</label>
                <input id="threshold-range" type="range" min="0" max="100" value={imageWorkingSet?.threshold ?? 0}
                    onChange={e => {
                        thresholdHandler(e);
                    }}
                    className="h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer w-80 dark:bg-gray-700" />
                <p className="block mt-1 text-sm font-medium text-gray-900 dark:text-white">{imageWorkingSet?.threshold ?? 0}</p>
            </div>

            <div className="w-96 image-manipulation-bar">
                <label htmlFor="brightness-range" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">brightness</label>
                <input id="brightness-range" type="range" min="0" max="100" value={imageWorkingSet?.brightness ?? 0}
                    onChange={e => brightnessHandler(e)}
                    className="h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer w-80 dark:bg-gray-700" />
                <p className="block mt-1 text-sm font-medium text-gray-900 dark:text-white">{imageWorkingSet?.brightness ?? 0}</p>
            </div>

        </div>
    )
}
export default ImageManipulator;