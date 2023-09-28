import mumaker from 'mumaker';
import snapsave from 'i-downloader';
import axios from 'axios';
import { downloadContentFromMessage,downloadMediaMessage } from '@whiskeysockets/baileys';
const buff = async (link) => {
 return await axios.get(link,{responseType:'arraybuffer'})
}
const dlMessage = async (message,messageType) => {
    
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };
export async function igdl(Neko,from,tex,m) {
  try {
    
if((tex.includes("instagram.com/tv")||tex.includes("instagram.com/p")) || tex.includes("instagram.com/reel")) {
     if((tex.includes("image")||tex.includes("Image"))) {
       let text = tex.trim().slice(0,-5)
       if((text.startsWith("#"||"!"||"-")||text.startsWith("/"||"."))) return;

     const res = await snapsave(text)
     let i = 0;
     while(i<(res.data.length/2)){     
      let buffer = await buff(res.data[(i)].url)
     await Neko.sendMessage(from,{image:
          buffer.data
        }
        ,{quoted:m.messages[0]})
       i++;
      }
     } else {
       let text = tex.trim()
       if((text.startsWith("#"||"!"||"-")||text.startsWith("/"||"."))) return;

     const res = await snapsave(text)
     let i= 0;
     while(i<(res.data.length/2)) {
       let buffer = await buff(res.data[(i)].url)
     await Neko.sendMessage(from,{video:
          buffer.data
        }
        ,{quoted:m.messages[0]})
       i++;
     }}
   } 
  } catch (err) {
    Neko.sendMesaage(from,{text:"An Error Occurred!!"})
               }
}



export async function facebookdl(Neko,from,text,m) {
  try {
    
   if(text.includes("facebook.com/")) {
    const resp = await mumaker.facebook(text)
     let buffer = await buff(resp.urls[0].url)
    return await Neko.sendMessage(
            from,
            {
              video: buff.data ,
              caption: `${resp.description}
              Scraped By *NekoKun*`,
            },
         { quoted: m.messages[0] });
     }
  } catch(err) {
   return Neko.sendMessage(from,{text:`An Error Occured!! Retry Please!!`})
  }
}



export async function statusCollector (Neko,from,m,name,messageType) {
  try {
    
     if((from.split("@")[0]) == "status") {
       
  switch (messageType) {
    case 'audioMessage': 
    let buffer37 =  await dlMessage(m.messages[0].message.audioMessage,"audio")
      
      let aud = await Neko.sendMessage(Neko.user.id,
          {
            audio: buffer37,
            mimetype: "audio/mpeg",
            fileName: `Converted By Neko ${name}.mp3`,
          })
      ;
      await Neko.sendMessage(
        Neko.user.id,{text:`*Status:* from *${name}*`},{quoted:aud}
                      )
      break;
     case 'videoMessage':
      const buffer2 = await downloadMediaMessage(
          m.messages[0], 'buffer', {},
          {
            reuploadRequest: Neko.updateMediaMessage
          }
        )
      
      await Neko.sendMessage(Neko.user.id,{
        video:buffer2,
        caption:`*Status:* "${(m.messages[0].message.videoMessage?.caption)}" from *${name}*`||`*Status:* From ${name}` 
      })
      break;
     case 'imageMessage':
      const buffer3 = await downloadMediaMessage(
          m.messages[0], 'buffer', {},
          {
            reuploadRequest: Neko.updateMediaMessage
          }
        )
      await Neko.sendMessage(Neko.user.id,{
        image:buffer3,
        caption:`*Status:* "${(m.messages[0].message.imageMessage?.caption)}" from *${name}*`||`*Status:* From ${name}`
      })
      break;
    case 'extendedTextMessage':
Neko.sendMessage(Neko.user.id,{text:`*Status:* "${m.messages[0].message.extendedTextMessage.text}" from *${name}*`})
      break;
     default:
        break;
  }
  
     }
  } catch (error) {
     return Neko.sendMessage(Neko.user.id,{text:`An Error Occured!! Retry Please!!`})
  }
  
}