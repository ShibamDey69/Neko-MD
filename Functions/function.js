import chalk from 'chalk';
import axios from 'axios';
import { downloadMediaMessage } from '@whiskeysockets/baileys';
const buff = async (link) => {
  return await axios.get(link, { responseType: 'arraybuffer' })
}
let BASE_URL = `https://weeb-neko-api.onrender.com/weeb/api/sfw/converters/youtube/`

export function logs(gcName, from, name, text, m, isGroup) {

  if (m.messages[0].message && isGroup) {
    console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
      chalk.black(
        chalk.bgRed(gcName)
      ) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
      chalk.black(chalk.bgRed(name)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
      chalk.black(chalk.bgRed(text)) + "\n" + ""
    );
  }
  if (m.messages[0].message && !isGroup) {
    console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
      chalk.black(chalk.bgMagentaBright(from.split("@")[0])) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]       => ")),

      chalk.black(chalk.bgMagentaBright(name)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
      chalk.black(chalk.bgMagentaBright(text)) + "\n" + ""
    );
  }
}



export async function YT(Neko, sendtext, from,m, name) {
  try{
      async function audio(aud) {
    try{
     let url = await axios.get(BASE_URL + 'audio?url=' + aud+`&api_key=b1lhhwxdai6nobelx34ffq2y0`)
    await Neko.sendMessage(from, {
      audio: {url:url.data.data.url},
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: m.messages[0] })
    } catch (err) {
     await audio(aud)
    }
  }

    
    async function video (vid, quality = "360p") {
      try{
      let api = `${BASE_URL}video?url=${vid}&quality=${quality}&api_key=b1lhhwxdai6nobelx34ffq2y0`
        console.log(api);
   let url = await axios.get(api)
  await Neko.sendMessage(from, {
      video: { url:url.data.data.result }
    }, { quoted: m.messages[0] });
      } catch (err) {
        await video(vid);
      }
  }
    
let linkOfvideo = sendtext?.split("--")?sendtext.split("--")[0]:sendtext;
  
    (sendtext.toString().toLowerCase().endsWith('audio'))?await audio(sendtext.split(" ")[0]):await video(linkOfvideo,sendtext.split("--")[1]?sendtext.split("--")[1]:"360p")
  } catch(err) {
   throw new Error("An Error Occurred!!");
  }
}


export async function onceView(viewonce, Neko, m, name) {
  try {
    if (viewonce?.message) {
      let viewonceType = Object.keys(JSON.parse(JSON.stringify(viewonce?.message)))[0].replace('Message', "")
      if (viewonceType == "image") {
        if (viewonce?.message.imageMessage.url != undefined) {

          const buffer = await downloadMediaMessage(
            m.messages[0], 'buffer', {},
            {
              reuploadRequest: Neko.updateMediaMessage
            }
          )

          await Neko.sendMessage(Neko.user.id, {
            image: buffer,
            caption: `Scraped by *NekoKun* from *${name}*`
          })
        }
      } else {
        if (viewonce?.message.videoMessage.url != undefined) {

          let buffer = await downloadMediaMessage(m.messages[0], 'buffer', {},
            {
              reuploadRequest: Neko.updateMediaMessage
            })

          await Neko.sendMessage(Neko.user.id, {
            video: buffer,
            caption: `Scraped by *NekoKun* from *${name}*`
          })
        }
      }
    }
  } catch (err) {
    console.log("An Error Occurred in once view ")
  }
}
