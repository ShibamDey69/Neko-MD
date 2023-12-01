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

  const isQuoted = m.messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
    
  const name = m.messages[0]['pushName'];

  const sender = isGroup ? m.messages[0].key.participant : m.messages[0].key.remoteJid;

  const from = m.messages[0].key.remoteJid;

  const gcMeta = isGroup ? await Neko.groupMetadata(from) : '';

  const gcName = isGroup ? gcMeta.subject : ''

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

    if(from === "919675642959-1606755119@g.us") return;
    if(messageType === "protocolMessage") return;
    if(!text) return;
    /**  
  if (isMe == true && messageType != "reactionMessage") {
    const reactionMessage = {
      react: {
        text: "🌚",
        key: m.messages[0].key
      }
    }
    await Neko.sendMessage(from,
      reactionMessage)
  }
**/
  if (sendtext.startsWith('hello bot')) {
    await Neko.sendMessage(from, { text: `Hello *${name} Sir*, I Am *NeKo*. How Can I Help You?` });
  }
  if (sendtext.startsWith('getbio')) {
    if (!mentionTag) return Neko.sendMessage(from, { text: `Mention A User!` })
    getBio(Neko, from, mentionTag, messageType)
  }
  let chatbott = false; 
  if (chatbott == true && isQuoted) {
    chatbot(Neko,m, isMe, isGroup, from, axios, text)
  }
  //-------Function calls-------\\
   logs(gcName, from, name, text, m, isGroup)
  await statusCollector(Neko, from, m, name,
    messageType)
    
    if(text?.toString().toLowerCase().startsWith('search')) {
  await YtSearch(Neko, text, from, sender, m, name)
    }
  await igdl(Neko, from, body, m)
  await facebookdl(Neko, from, body, m)
  await onceView(viewonce, Neko, m, name)
    
if(text?.toString().includes('youtu')) {
 console.log(text);
  await YT(Neko, body,from, m, name)
    }
} catch(err) {
    console.log("An Error Occured in Message.js File!!!",err)
}
     }

export default MessageHandle;
