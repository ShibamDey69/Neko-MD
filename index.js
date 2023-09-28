import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs';
import MessageHandle from './lib/Message.js';
import express from 'express';
import axios from 'axios';

const app = express()
import Baileys,
{ useMultiFileAuthState, DisconnectReason } 
from '@whiskeysockets/baileys' ;
let sessionFolder = './Auth-Infos';

let clearState = () => {
  fs.rmdirSync(sessionFolder,{ recursive: true, })
}

//setInterval(StartNeko,100000)
  async function StartNeko()  {
  try {
    
    if(!fs.existsSync(sessionFolder)){
      fs.mkdirSync(sessionFolder);
    }


    // 
     const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);


    //to connect WhatsApp socket
    const Neko = Baileys.makeWASocket({
      printQRInTerminal:false,
      logger: pino({
        level: "silent",
      }),
     browser: ["Chrome (Linux)", "chrome", ""],
      auth: state
    })

setInterval(async() => {
 let res = await axios.get('https://wa.nekosenpai69.repl.co')
  
},15000)
    //check if number is not registered then it will give u code to connect through mobile
    if(!Neko.authState.creds.registered) {
      let phoneNumber = process.env.NUMBER || "917047584741";
     
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
      
      if(phoneNumber.length < 11) {
       return console.error(`Please Enter Your Number With Country Code !!`);
      } 
      setTimeout(async () => {
        let code = await Neko.requestPairingCode(phoneNumber);
console.log(`Your Pairing Code : ${code}`)
        }, 2000);
      } 


    
  Neko.ev.on("creds.update", saveCreds);
    
  Neko.ev.on("connection.update",async (update) => {
    
  const{ connection, lastDisconnect } = update;

    // If connection is open then send a message 
    if(connection === "open") {
          await Neko.sendMessage(
            Neko.user.id,
            { text: `Hello *${Neko.user.name}* Sir!! Your Prefix is !` }
          );
 } 

    // If connection is closed then show an error in console
     if (connection === "close") {
       let reason = new Boom(lastDisconnect?.error)?.output.statusCode; 
       if (reason === DisconnectReason.connectionClosed) {
        console.log("[Connection closed, reconnecting....!]");
        StartNeko();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("[Connection Lost from Server, reconnecting....!]");
        StartNeko();
      } else if (reason === DisconnectReason.loggedOut) {
        clearState();
        console.log(
          `[Device Logged Out, Please Try to Login Again....!]`
        );
        clearState();
        StartNeko()
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("[Server Restarting....!]");
        StartNeko();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("[Connection Timed Out, Trying to Reconnect....!]");
        StartNeko();
      } else if(reason === DisconnectReason.badSession) {
         console.log("[BadSession exists, Trying to Reconnect....!]");
         clearState()
         StartNeko()
      } else if (reason === DisconnectReason.connectionReplaced) {
         console.log(`[Connection Replaced,
         Trying to Reconnect....!]`)
         StartNeko()
      } else {
        console.log(
          `[Server Disconnected: Maybe Your WhatsApp Account got banned....!]`
         );
         StartNeko()
       }
    }
        });
    
 Neko.ev.on('messages.upsert', async (messages) => MessageHandle(messages,Neko))
  } catch (error) {
     throw new Error("An Error Occurred");
  }
}
StartNeko()
app.get("/",async(req,res) =>{
try{
  res.send("all ok")
  } catch(err) {
    console.log("An error occurred!!",err);
  }
  
})

app.listen(8080)

