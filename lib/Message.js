import { getContentType } from '@whiskeysockets/baileys';
import { logs,YT ,onceView } from '../Functions/function.js';
import { igdl,facebookdl } from '../Functions/function2.js';

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

  
  
  
logs(gcName, from, name, text, m, isGroup)

  if (sendtext.startsWith('hello bot')) {
    await Neko.sendMessage(from, { text: `Hello *${name} Sir*, I Am *NeKo*. How Can I Help You?` });
  }


  
  if (sendtext.includes('love') && !isMe) {
    await Neko.sendMessage(from, { text: `I love You So Muchhhh *${name}*` })
  }
  
  igdl(Neko,from,body,m)
  facebookdl(Neko,from,body,m)
  onceView(viewonce,Neko,m,name)
  YT(Neko,body,from,sender,m,name)
}

export default MessageHandle;
