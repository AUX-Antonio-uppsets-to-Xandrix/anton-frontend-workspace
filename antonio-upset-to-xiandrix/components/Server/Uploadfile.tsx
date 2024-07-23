"use server";
import fs from "node:fs/promises";
import {revalidatePath} from "next/cache";


export async function uploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    if(file && file instanceof File){
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const fileNameEncoder = Buffer.from(file.name, 'ascii').toString('utf8' );
    const filePath = 'images/'+fileNameEncoder;
      try {
        await fs.unlink(filePath);
        console.log(`File ${filePath} has been deleted.`);
      } catch (err) {
        //console.error(err);
        console.log("new File, no delete needed");
      }

    try{
      await fs.writeFile('public/'+filePath, buffer);
    }
    catch(err){
      console.log("writeFile err!",err);
    }

    // 경로가 어디인지 note 하자
    // server code 의 js에서 public 폴더 접근 : public/images/1.jpg
    // client code 의 return html 에서 img src 접근 : images/1.jpg
    revalidatePath("/");
    return filePath.toString(); 
    //따라서 return 은 images/1.jpg로
  }
    else {throw new Error('file return failed from server');
    }
  }
