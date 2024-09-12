'use client';
import { useState } from "react";
import {useRouter} from 'next/navigation';

interface loginComponentPropsType{ 
    inputId:string;
    setInputId:React.Dispatch<React.SetStateAction<string>>;
    inputPwd:string;
    setInputPwd:React.Dispatch<React.SetStateAction<string>>;
    handleLogin:()=>void;
}

const Login:React.FC<loginComponentPropsType> = ({
     inputId, setInputId, inputPwd, setInputPwd,
     handleLogin
    }) => {
    
    const router = useRouter();
    /*
    const goToSignUp= ()=> {
        router.push('/signup')
    }*/

    return (
        <div className="login-container">
            <div className="bg-fixed bg-center bg-cover" style={{backgroundImage:"url('https://picsum.photos/1920/1080')}"}}>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-full p-8 mx-4 bg-white rounded shadow-xl shadow-blue-600 md:w-1/2 lg:w-1/3">
                        <h1 className="mb-8 text-3xl font-bold text-center fontDunggeunmo"><img
            src="/logo.png" alt="logo" className='inline-block w-80' />
          </h1>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-semibold text-gray-700 fontDunggeunmo" htmlFor="idBox">
                                    아이디
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-xl leading-tight text-gray-700 border-2 rounded fontDunggeunmo focus:outline-none focus:shadow-outline"
                                    id="idBox" type="text" placeholder="Enter your id" value={inputId} onChange={e=>setInputId(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-semibold text-gray-700 fontDunggeunmo" htmlFor="password">
                                    비밀번호
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-xl leading-tight text-gray-700 border-2 rounded focus:outline-none focus:shadow-outline fontDunggeunmo"
                                    id="password" type="password" placeholder="Enter your password" value={inputPwd} onChange={e=>setInputPwd(e.target.value)}/>
                            </div>
                            <div className="flex justify-between mb-4">
                                <button
                                    className="px-20 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="button" onClick={handleLogin}>
                                    로그인
                                </button>
                                <span className="inline-block italic font-bold text-center text-blue-500 align-baseline text-m hover:text-blue-800 signupLabel fontDunggeunmo" onClick={()=>router.push('/signup')}>포띰에딧 가입하러가기</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;