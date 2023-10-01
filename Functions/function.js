import chalk from 'chalk';
import axios from 'axios';
import { downloadMediaMessage } from '@whiskeysockets/baileys';
const buff = async (link) => {
  return await axios.get(link, { responseType: 'arraybuffer' })
}
let BASE_URL = `https://wabot-jh06.onrender.com/`

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



export async function YT(Neko, sendtext, from, sender,m, name) {
  if ((sendtext.includes("youtu.be/") || sendtext.includes("youtube.com/")) && (sendtext.endsWith("Audio") || sendtext.endsWith("audio"))) {
console.log("work1")
    const aud = sendtext.includes("Audio") ? sendtext.replace("Audio", "").trim() : sendtext.replace("audio", "").trim();
let ur;
    try {
      ur = await axios.get(BASE_URL + 'aud?url=' + aud)
    } catch (error) {
      console.log("work error 3")
      await Neko.sendMessage(from, {
        text: `Wait Another Second You Idiot ${name}`
      }, { quoted: m.messages[0] })
      ur = await axios.get(BASE_URL + 'aud?url=' + aud)
    }
    let buffer = await buff(ur.data.result)
    await Neko.sendMessage(from, {
      audio: buffer.data,
      mimetype: "audio/mpeg",
      ptt: false
    }, { quoted: m.messages[0] })
  } else if ((sendtext.includes("youtu.be/") || sendtext.includes("youtube.com/")) && (sendtext.endsWith("Video") || sendtext.endsWith("video"))) {
    const vid = sendtext.includes("Video") ? sendtext.replace("Video", "").trim() : sendtext.replace("video", "").trim();
    let ur;
    try {
      ur = await axios.get(BASE_URL + 'vid?url=' + vid)
    } catch (error) {
      await Neko.sendMessage(from, {
        text: `Wait Another Second You Idiot ${name}`
      }, { quoted: m.messages[0] })
      ur = await axios.get(BASE_URL + 'vid?url=' + vid)
    }

    let buffer = await buff(ur.data.result)
    await Neko.sendMessage(from, {
      video: buffer.data
    }, { quoted: m.messages[0] })
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
    console.log("An Error Occurred ")
  }
}
