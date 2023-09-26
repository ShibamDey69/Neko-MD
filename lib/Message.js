import { getContentType } from '@whiskeysockets/baileys';
import downloadMedia, { logs } from '../Functions/function.js';

let MessageHandle = async (m, Neko) => {

  const messageType = getContentType(m.messages[0].message);

  const isGroup = m.messages[0].key.remoteJid.includes('@g.us');

  const name = m.messages[0]['pushName'];

  const sender = isGroup ? m.messages[0].key.participant : m.messages[0].key.remoteJid;

  const from = m.messages[0].key.remoteJid;

  const gcMeta = isGroup ? await Neko.groupMetadata(from) : '';

  const gcName = isGroup ? gcMeta.subject : ''

  const isQuoted = (m.messages[0].message?.extendedTextMessage == undefined);

  const body = isQuoted ? m.messages[0].message['conversation'] : m.messages[0].message.extendedTextMessage.text;

  let text = (body == '') ? messageType : body;

  let viewonce = (m.messages[0].message?.viewOnceMessageV2);

  let isMe = (m.messages[0].key.fromMe)

  let sendtext = body.toLowerCase()

  if (sendtext.startsWith('hello bot')) {
    await Neko.sendMessage(from, { text: `Hello *${name} Sir*, I Am *NeKo*. How Can I Help You?` });
  }

  if (viewonce?.message) {
    let viewonceType = Object.keys(JSON.parse(JSON.stringify(viewonce?.message)))[0].replace('Message', "")
    if (viewonceType == "image") {
      if (viewonce?.message.imageMessage.url != undefined) {

        let buff = await downloadMedia(m.messages[0].message)

        await Neko.sendMessage(Neko.user.id, {
          image: buff,
          caption: `Made by *NekoKun*`
        })
      }
    } else {
      if (viewonce?.message.videoMessage.url != undefined) {
        let buff = await downloadMedia(m.messages[0].message)

        await Neko.sendMessage(Neko.user.id, {
          video: buff,
          caption: `Made by *NekoKun*`
        })
      }
    }
  }
  if (sendtext.includes('love') && !isMe) {
    await Neko.sendMessage(from, { text: `I love You So Muchhhh *${name}*` })
  }

  logs(gcName, from, name, text, m, isGroup)
}

export default MessageHandle;