import yts from 'yt-search';
import { YT } from '../Functions/function.js'

export async function getBio(Neko, from, mentionTag, messageType) {

  if (!mentionTag) return Neko.sendMessage(from, { text: `Mentiin A User!` })
  if (messageType === "extendedTextMessage" && mentionTag) {
    const status = await Neko.fetchStatus(mentionTag)
    Neko.sendMessage(from, {
      text: `${status.status} 
                            
                                        By *NekoKun*`})
  }
}


export async function YtSearch(Neko, text, from, sender, m, name) {
  if ((text.startsWith('search') || text.startsWith('Search'))) {
    let tex = text.replace("search", "") || text.replace("Search", "") || text.replace("Searcha", "") || text.replace("searcha", "");
    Neko.sendMessage(from, { text: `Wait A Sec !!` })
    const lol = async (text1) => {
      const r = await yts(text1)
      
      let arr = []
      for (let i = 0; i < r.all.length; i++) {
        if (r.all[i].seconds < 700) {
          arr.push(r.all[i].url);
        }
      }
      let random = arr[0]
      return random;
    }
    const v = await lol(tex)
    let linkV = `${v} video`;
    let linkA = `${v} audio`;
    if ((text.startsWith('searchv') || text.startsWith('Searchv'))) {
      //console.log(linkV)
      await YT(Neko, linkV, from, sender, m, name)
    } else if ((text.startsWith('searcha') || text.startsWith('Searcha'))) {
      await YT(Neko, linkA, from, sender, m, name)
    } else if(text.startsWith('search')) {
       
    }
  }
}

export async function chatbot(Neko, isMe, isGroup, from, axios, text) {
  if (!isMe && !isGroup) {
    let botreply = await axios.get(
      `http://api.brainshop.ai/get?bid=172352&key=vTmMboAxoXfsKEQQ&uid=[uid]&msg=[${text}]`
    );
    let txtChatbot = `${botreply.data.cnt}`;
    Neko.sendMessage(from, { text: txtChatbot })
  }
}
