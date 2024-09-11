"use client"
import React, { useState, useEffect, useContext, useRef } from "react";
import ImageDisplayContext from "./ImageDisplayContext";
import { isEqual } from "lodash";
import ImageViewer from "./ImageViewer";
import ImageDownloader from "./ImageDownloader";
import ImageUploader from "./ImageUploader";
import ImageManipulator from "./ImageManipulator";
import { OpenCvProvider } from "opencv-react-ts";
import axios, { AxiosResponse } from "axios";
import Login from "./Login";
import { headers } from "next/headers";
import getImageFromServer from '../Server/GetImageFromServer';

const ImageMain = () => {

    const [userInfo, setUserInfo] = useState<UserType | null>(null);
    const [inputId, setInputId] = useState('');
    const [inputPwd, setInputPwd] = useState('');

    const noImage = "/noimage.png";
    const displayCanvas = useRef<HTMLCanvasElement>(null);
    const masterCanvas = useRef<HTMLCanvasElement>(null);
    const [tempImageURL, setTempImageURL] = useState<string | ArrayBuffer | null>(noImage);
    const [originalImageURL, setOriginalImageURL] = useState<string | ArrayBuffer | null>(null);
    const [imageWorkingSet, setImageWorkingSet] = useState<ImageManipulationType | null>({
        grayscale: 0,
        threshold: 0,
        brightness: 50,
        rotation: 0,
        stateChanged: 0
    });

    const handleLogin = () => {
        axios.post('http://localhost:8888/api/login', null, {
            params: {
                id: inputId,
                password: inputPwd
            }
        })
            .then(response => {
                const serverUserDTO = response.data;
                console.log("server login response ", serverUserDTO);
                if (serverUserDTO) {
                    console.log("auxmemId", response.data.auxmemberId);

                    const updatedUserInfo = {
                        id: serverUserDTO.auxmemberId as string,
                        uniqueId: serverUserDTO.uniqueId as number,
                        userWorkingSet: JSON.parse(serverUserDTO.auxmemberWorkingsetString)
                    } as UserType;
                    setUserInfo(updatedUserInfo);
                    setImageWorkingSet(JSON.parse(serverUserDTO.auxmemberWorkingsetString) as ImageManipulationType);
                    try {
                        const url = getImageFromServer(serverUserDTO.auxmemberImageurl as string);
                        if (url) {
                            setUserInfo(prevState => ({
                                ...prevState,
                                userImageURL: url as string
                            } as UserType));
                            setOriginalImageURL(url);
                            console.log("userInfo set: ", userInfo);
                        } else {
                            alert('Failed to fetch image URL');
                        }
                    } catch (error) {
                        console.error('Error fetching image URL:', error);
                        alert('Failed to fetch image URL');
                    }
                    if (imageWorkingSet && originalImageURL)
                        setImageWorkingSet({
                            ...imageWorkingSet,
                            stateChanged: Number(imageWorkingSet.stateChanged + 1)
                        });
                }
                else {
                    alert('일치하는 회원 정보가 존재하지 않습니다.')
                    handleLogout();
                }
            })
    }

    const saveStatus = async () => {
        console.log("saving userInfo : ", userInfo);
        setUserInfo({
            ...userInfo,
            userImageURL: tempImageURL,
            userWorkingSet: JSON.stringify(imageWorkingSet)
        } as unknown as UserType);

        try {
            const response = await axios.put('http://localhost:8888/api/update',
                {
                    auxmemberId: userInfo?.id,
                    auxworkingsetGrayscale: imageWorkingSet?.grayscale,
                    auxworkingsetThreshold: imageWorkingSet?.threshold,
                    auxworkingsetBrightness: imageWorkingSet?.brightness,
                    auxworkingsetRotation: imageWorkingSet?.rotation,
                    auxmemberImageurl: tempImageURL
                }
            )
            alert("서버에 성공적으로 저장되었습니다.");
            console.log("update response : ", response);
        }
        catch (error) {
            alert("저장 오류 발생 : " + error);
        }
    }



    const handleLogout = async () => {
        const ss = await saveStatus();
        console.log('로그아웃전에', userInfo);
        setInputId('');
        setInputPwd('');
        localStorage.removeItem("loginUser");
        setUserInfo(null);

    }

    useEffect(() => {
        const savedMember = localStorage.getItem("loginUser");
        if (savedMember) {
            setUserInfo(JSON.parse(savedMember));
        }
        else if(userInfo){
            localStorage.setItem("loginUser", JSON.stringify(userInfo));
        }
        console.log("local 저장 : ", localStorage.getItem("loginUser"));
    }, [])


    return (
        <ImageDisplayContext.Provider value={{
            noImage, tempImageURL, setTempImageURL, originalImageURL, setOriginalImageURL, displayCanvas, masterCanvas,
            imageWorkingSet, setImageWorkingSet, userInfo, setUserInfo
        }}>
            {(userInfo) ?
                <div className="image-main-container">
                    <div className="header-container">
                        <div className="action-buttons-right">
                            <button className="logout-button" onClick={handleLogout}>
                                로그아웃하기
                            </button>
                            <button className="save-button" onClick={saveStatus}>
                                임시저장
                            </button>
                        </div>

                        <div className="header-container">
                            <div className="centered-buttons-row">
                                <ImageDownloader />
                                <ImageUploader />
                            </div>
                        </div>
                    </div>

                    <div className="image-content-container">
                        <div className="image-display-container">
                            <OpenCvProvider>
                                <ImageViewer />
                            </OpenCvProvider>
                        </div>

                        <div className="image-manipulation-container">
                            <ImageManipulator />
                        </div>
                    </div>
                </div>
                :
                <Login inputId={inputId} setInputId={setInputId}
                    inputPwd={inputPwd} setInputPwd={setInputPwd}
                    handleLogin={handleLogin}
                />
            }
        </ImageDisplayContext.Provider>
    )
}

export default ImageMain;

