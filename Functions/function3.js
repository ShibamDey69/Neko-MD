import yts from 'yt-search';
import { YT } from '../Functions/function.js';

let CharId = `VWZKc6FoVnSgiS6sRSiBW4Sg3SNLZYpqrmA0U7Wewbc`;
let ChatID = `f93cea3f-2425-472b-b12c-d68d556f840d`;

export async function getBio(Neko, from, mentionTag, messageType) {
try {
  if (!mentionTag) return Neko.sendMessage(from, { text: `Mentiin A User!` })
  if (messageType === "extendedTextMessage" && mentionTag) {
    const status = await Neko.fetchStatus(mentionTag)
    if(status != null) {
   return Neko.sendMessage(from, {
      text: `${status.status} 
                            
                                        By *NekoKun*`})} 
        }     
   } catch(e) {
  Neko.sendMessage(from,{text:`No Bio !`})
          }
    }



export async function YtSearch(Neko, text, from, sender, m, name) {
  try {
    let tex = text.slice(text.split(" ")[0].length+1)
    Neko.sendMessage(from, { text: `Wait A Sec !!` })
    const lol = async (text1) => {
      const r = await yts(text1)
      let arr = []
      for (let i = 0; i < r.all.length; i++) {
        if (r.all[i].seconds < 1200) {
          arr.push(r.all[i].url);
        }
      }
      let random = arr[Math.floor(Math.random() * 3)]
      return random;
    }
    const v = await lol(tex)
    let linkV = `${v}`;
    let linkA = `${v} audio`;
    if (text?.toString().toLowerCase().startsWith('searcha')) {
      return await YT(Neko, linkA?.toString(), from, m, name)
    } else if (text?.toString().toLowerCase().startsWith('search')) {
      await YT(Neko, linkV?.toString(), from, m, name)
    }       
  } catch (e) {
    console.log("work again")
  await YtSearch(Neko, text, from, sender, m, name) 
}
        }

export async function chatbot(Neko,m, isMe, isGroup, from, axios, text) {
  if (!isMe && !isGroup) {
    Neko.sendPresenceUpdate("composing", from);
    let botreply = await axios.get(
      `https://weeb-neko-api.onrender.com/weeb/api/sfw/ai/character?characterid=${CharId}&message=${text}&chatid=${ChatID}&api_key=b1lhhwxdai6nobelx34ffq2y0`
    );
    let txtChatbot = `${botreply.data.data}`;
    
    Neko.sendMessage(from, { text: txtChatbot },{quoted:m.messages[0]})
    
  }
}
