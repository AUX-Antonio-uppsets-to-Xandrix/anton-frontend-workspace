"use server";
import fs from "node:fs/promises";
import {revalidatePath} from "next/cache";


export async function DownloadFile(formData: FormData) {
    const file = formData.get("file") as File;
    if(file && file instanceof File){
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const fileNameEncoder = Buffer.from(file.name, 'ascii').toString('utf8' );
    const filePath = 'public/images/'+fileNameEncoder;


    const fs = require('fs');

    const deleteFile = ()=> {
      try {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} has been deleted.`);
      } catch (err) {
        console.error(err);
      }
    }

    deleteFile();

    await fs.writeFile(filePath, buffer); 
    // 경로가 어디인지 note 하자

    revalidatePath("/");
    }
  }
   