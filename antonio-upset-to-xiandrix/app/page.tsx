'use client';
import ImageMain from "@/components/Client/ImageMain";
import Image from "next/image";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import '@/styles/ImageMain.css';


export default function Home() {
  return (
          <ImageMain/>
  );
}
