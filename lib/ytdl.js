import axios from 'axios';
import qs from 'qs';

export async function lol(url,format = "mp4", quality = "480p") {
  try {
  const headers = {
  'Accept': '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'en-US,en;q=0.9',
  'Content-Length': '190',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    'x-Requested-With':'XMLHttpRequest',
    'X-Requested-Key':'de0cfuirtgf67a'
};
const payload = {
  q:url,
  vt:'home'
}
 
    let payload2;
const ap = `https://savetube.app/api/ajaxSearch`
const ress = await axios.post(ap,qs.stringify(payload),headers)
  
    if(format == "mp4") {
   payload2 = {
    v_id:ress.data.vid,
    ftype:format,
    fquality:quality,
    fname:ress.data.fn,
    token:ress.data.token,
    timeExpire:ress.data.timeExpires
  }
    }
 
  let payl = qs.stringify(payload2)
  let paylo = payl.replace(/%20/g,"+")
  let api;
    if(format == "mp4") {
      api = "https://dt163.dlsnap12.xyz/api/json/convert"
    }
    if (format== "mp3") {
      return `https://ve44.aadika.xyz/download/${ress.data.vid}/mp3/128/${ress.data.timeExpires}/${ress.data.token}/1?f=SaveTube.App`
    }
 const response = await axios.post(api,paylo,headers)
    if(response.data.result == 'Converting') {
     let res = await lol(url,format, quality)
      console.log('Pov: Retry')
      return res;
    }
  return response;
  } catch (e) {
    throw new Error(e)
  }
}
