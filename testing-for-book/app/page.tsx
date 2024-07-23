"use client";

import Image from "next/image";
import React,{useState } from "react";
import Home from "./Home";
import './ImageWithFilter.css';

export default function page() {
  /*
  const [itemList,setItemList] = useState([]);
  const [inputItem,setInputItem] = useState('');

  const itemAdd = () =>{
    setItemList ([...itemList,inputItem]);
    setInputItem('');
  }
  */
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {/*<h1>웹 기본 구성 요소</h1>
      <ul>
        {itemList.map(items=>(
          <li key={items}>{items}</li>
        ))}
      </ul><br/>
      <input type="text" onChange={(e)=>setInputItem(e.target.value)}
      value={inputItem}/>
      <button onClick={itemAdd}>추가하기</button>

      
      */}
      <h1>쌤코드</h1>
      <Home/>
    </main>
  );
}
