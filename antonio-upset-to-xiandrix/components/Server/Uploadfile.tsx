"use server";
import fs from "node:fs/promises";
import {revalidatePath} from "next/cache";


export async function uploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    if(file && file instanceof File){
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const fileNameEncoder = Buffer.from(file.name, 'ascii').toString('utf8' );
    const filePath = 'public/images/'+fileNameEncoder;

      try {
        await fs.unlink(filePath);
        console.log(`File ${filePath} has been deleted.`);
      } catch (err) {
        //console.error(err);
        console.log("new File, no delete needed");
      }

    try{
      await fs.writeFile(filePath, buffer);
    }
    catch(err){
      console.log("writeFile err!",err);
    }

    // 경로가 어디인지 note 하자

    revalidatePath("/");
    formData.append('filePath',filePath);
    formData.append('fileName',fileNameEncoder);
    return formData;
  }
    else {throw new Error('file return failed from server');
    }
  }
