"use client";
import React, { useState, useContext } from "react";
import ImageDisplayContext from "./ImageDisplayContext";

const ImageManipulator = () => {
    //var cv = require('opencv.js');

    const imageContext = useContext(ImageDisplayContext) as ImageDisplayContextType;
    const { imageWorkingSet, setImageWorkingSet } = imageContext;
    const grayscaleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imageWorkingSet) {
            setImageWorkingSet({
                ...imageWorkingSet,
                grayscale: Number(e.target.value),
            });
        }
    }

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
        <div className="controls-container">
            <div className="control-buttons">
                <button type="button" onClick={toOriginalImage}>Reset</button>
                <button type="button" onClick={rotateImage}>Rotate</button>
            </div>

            <div className="slider-container">
                <label htmlFor="grayscale-range">Grayscale</label>
                <input
                    id="grayscale-range"
                    type="range"
                    min="0"
                    max="100"
                    value={imageWorkingSet?.grayscale ?? 0}
                    onChange={grayscaleHandler}
                />
                <p>{imageWorkingSet?.grayscale ?? 0}</p>
            </div>

            <div className="slider-container">
                <label htmlFor="threshold-range">Threshold</label>
                <input
                    id="threshold-range"
                    type="range"
                    min="0"
                    max="100"
                    value={imageWorkingSet?.threshold ?? 0}
                    onChange={thresholdHandler}
                />
                <p>{imageWorkingSet?.threshold ?? 0}</p>
            </div>

            <div className="slider-container">
                <label htmlFor="brightness-range">Brightness</label>
                <input
                    id="brightness-range"
                    type="range"
                    min="0"
                    max="100"
                    value={imageWorkingSet?.brightness ?? 0}
                    onChange={brightnessHandler}
                />
                <p>{imageWorkingSet?.brightness ?? 0}</p>
            </div>
        </div>
    )
}
export default ImageManipulator;