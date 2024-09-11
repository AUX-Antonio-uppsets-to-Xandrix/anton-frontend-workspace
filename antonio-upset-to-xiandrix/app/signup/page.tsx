'use client';
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const SignUp = () =>{
  const router = useRouter();
  const [id,setId] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCPassword] = useState('');

  const handleSignupSubmit =()=>{
    if(password.length==0 || cpassword.length==0 || id.length==0){
      alert('모든 항목을 입력해주십시오.');
      return;
    }
    else if(password !== cpassword){
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    axios.post('http://localhost:8888/api/insertMember', null, {
      params: {
          id: id,
          password: password
      }
    })
    .then(response=>{
      console.log("signUp server res : ",response);
      alert('회원가입에 성공했습니다. 로그인 후 이용부탁드립니다.');
      router.push('/');
    })
    .catch(err=>{
      console.log('signup err',err);
      alert('이미 가입된 id 입니다.');
      return;
    })
  }
    return(
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="w-full max-w-md p-8 mx-auto border border-gray-300 rounded-2xl">
        <div className="mb-4 text-center">
          <a href="#"><img
            src="/logo.png" alt="logo" className='inline-block w-60' />
          </a>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-800">Id</label>
              <input name="id" value={id} onChange={e=>setId(e.target.value)} type="text" className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500" placeholder="Enter id" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">Password</label>
              <input name="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500" placeholder="Enter password" />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">Confirm Password</label>
              <input name="cpassword" value={cpassword} onChange={e=>setCPassword(e.target.value)} type="password" className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-md outline-blue-500" placeholder="Enter confirm password" />
            </div>

          </div>

          <div className="!mt-12">
            <button type="button" onClick={handleSignupSubmit} className="w-full px-4 py-3 text-sm font-semibold tracking-wider text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="mt-6 text-sm text-center text-gray-800">Already have an account? <a href="/" className="ml-1 font-semibold text-blue-600 hover:underline">Login here</a></p>
        </form>
      </div>
    </div>
    )
}
export default SignUp;
