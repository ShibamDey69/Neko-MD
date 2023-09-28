import mumaker from 'mumaker';

export async function igdl(Neko,from,text,m) {
  try {
   if(text.includes("instagram.com/")) {
    const resp = await mumaker.instagram(text)
          
    return await Neko.sendMessage(
            from,
            {
              video: { url: resp[0] },
              caption: `Scraped By *NekoKun*`,
            },
            { quoted: m.messages[0] }
          );
   }
  } catch(err) {
   return Neko.sendMessage(from,
                     {text:`An Error Occurred or The vidoe is private !!`},
                     {quoted:m.messages[0]}
       )}
}



export async function facebookdl(Neko,from,text,m) {
  try {
   if(text.includes("facebook.com/")) {
    const resp = await mumaker.facebook(text)
         // console.log(resp);
    return await Neko.sendMessage(
            from,
            {
              video: { url: resp.urls[0].url },
              caption: `${resp.description}
              Scraped By *NekoKun*`,
            },
            { quoted: m.messages[0] }
          );
   }
  } catch(err) {
   return Neko.sendMessage(from,
                     {text:`An Error Occurred or The vidoe is private !!`},
                     {quoted:m.messages[0]}
       )}
}
