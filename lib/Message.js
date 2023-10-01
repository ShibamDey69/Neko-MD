import { getContentType } from '@whiskeysockets/baileys';
import { logs, YT, onceView } from '../Functions/function.js';
import { igdl, facebookdl, statusCollector } from '../Functions/function2.js';
import { getBio, chatbot, YtSearch } from '../Functions/function3.js';
import axios from 'axios';

let MessageHandle = async (m, Neko) => {
  try {

  const messageType = getContentType(m.messages[0].message);

  const mentionTag = m.messages[0].message?.extendedTextMessage?.contextInfo?.participant
  const isGroup = m.messages[0].key.remoteJid.includes('@g.us');

  const name = m.messages[0]['pushName'];

  const sender = isGroup ? m.messages[0].key.participant : m.messages[0].key.remoteJid;

  const from = m.messages[0].key.remoteJid;

  const gcMeta = isGroup ? await Neko.groupMetadata(from) : '';

  const gcName = isGroup ? gcMeta.subject : ''

  const isQuoted = (m.messages[0].message?.extendedTextMessage == undefined);

  const body = m.messages[0].message?.conversation ||
    m.messages[0].message?.[messageType]?.text ||
    m.messages[0].message?.[messageType]?.caption ||
    (messageType === 'listResponseMessage' && m.messages[0].message?.[messageType]?.singleSelectReply?.selectedRowId) ||
    (messageType === 'buttonsResponseMessage' && m.messages[0].message?.[messageType]?.selectedButtonId) ||
    (messageType === 'templateButtonReplyMessage' && m.messages[0].message?.[messageType]?.selectedId) ||
    '';

  let text = (body == '') ? messageType : body;

  let viewonce = (m.messages[0].message?.viewOnceMessageV2);

  let isMe = (m.messages[0].key.fromMe)

  let sendtext = body.toLowerCase()


 /* if (isMe == true && messageType != "reactionMessage") {
    const reactionMessage = {
      react: {
        text: "🌚",
        key: m.messages[0].key
      }
    }
    await Neko.sendMessage(from,
      reactionMessage)
  }
*/
  if (sendtext.startsWith('hello bot')) {
    await Neko.sendMessage(from, { text: `Hello *${name} Sir*, I Am *NeKo*. How Can I Help You?` });
  }
  if (sendtext.startsWith('getbio')) {
    if (!mentionTag) return Neko.sendMessage(from, { text: `Mention A User!` })
    getBio(Neko, from, mentionTag, messageType)
  }
  let chatbott = false
  if (chatbott == true) {
    chatbot(Neko, isMe, isGroup, from, axios, text)
  }
  //-------Function calls-------\\
  logs(gcName, from, name, text, m, isGroup)
  statusCollector(Neko, from, m, name,
    messageType)
  YtSearch(Neko, text, from, sender, m, name)
  igdl(Neko, from, body, m)
  facebookdl(Neko, from, body, m)
  onceView(viewonce, Neko, m, name)
  YT(Neko, body,from,sender, m, name)
} catch(err) {
    Neko.sendMessage(m.messages[0].key.remoteJid,{text:`An Error Occurred!! `})
}
     }

export default MessageHandle;
