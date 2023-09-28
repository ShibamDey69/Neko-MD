const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");


const YTDL = async (querylink, cookie) => {
  try {
    let coookie = cookie || "XSRF-TOKEN=eyJpdiI6Ind6Um50aWRvOC9yMURycVREbGpxK3c9PSIsInZhbHVlIjoiU1JzQ1RsUW9GOHRqdmZLS2t6NkdWTlhNTmhiNGExN1Rtd1l4aDBzd2lKNDV5RUlIckl0dkVMYWtuZWVmRjUrblc4elN3b0EyRmFnTnpsQVh6aWk1YWgwWFJ4VVJaTm1WVXd2ZmJHNjVMNzJYOGt4Rmx4bXRUTjFUN0djdW5wSnAiLCJtYWMiOiIzYmU3N2EzNzVkMzVhNzY2MmQ3Yjc4YjIyZDRkNzk5ZGUwZGE2ZDUzMWU0MzViNzM3OGE0NjdmNDc0ZjI0Njg2IiwidGFnIjoiIn0%3D; 10downloader_session=eyJpdiI6IkFWSFB6R2thTjJ1WnovZy8waVR1T3c9PSIsInZhbHVlIjoiRExxRDNiSHFYSi8yejB2aUdjZGswbUlkV0QybDZ1WHNmMHJ5SkJVbmdISEorWFlMT0c4RUNibllnUXpTNW5yTWd0Tk8xTjdrblVFQlQ0M3IvaFBpc1R4b0taV2xlbTNMVlZodDYwN0tYTGlGODBCdlg2bDQzYzNoalNub01EcjQiLCJtYWMiOiJhYzYwN2ZkNTcwMzdkYzk4ZGJmZDdjZTk5NzRlZDk2ODIzZjdmNzA5MzUyZWM1MjBiZWJlN2FjZGZkY2Q0YjA0IiwidGFnIjoiIn0%3D";
    const headers = {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cookie": coookie,
      "Referer": "https://10downloader.com/en/101/youtube-shorts-downloader",
      "Sec-Ch-Ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
      "Sec-Ch-Ua-Mobile": "?1",
      "Sec-Ch-Ua-Platform": "\"Android\"",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
    }

    let url = "https://10downloader.com/download?";
    let data = {
      v: querylink,
      lang: 'en',
      type: 'video'
    }

    let res = await axios.get(url + qs.stringify(data) + { headers });
    let $ = cheerio.load(res.data);
    let video = [];
    let thumbnail = [];
    $('a.downloadBtn').each((i, el) => {
      let src = $(el).attr('href');
      if (src.includes("google")) {
        video.push(src)
      } else {
        thumbnail.push(src)
      }
    })

    let data2 = {
      Status: "Success!",
      StatusCode: 200,
      video: {
        Best: video[0],
        Medium: video[1]
      },
      Audio: video[2],
      Thumbnail: thumbnail[0]
    }
    return data2;
  } catch (err) {
    console.log(err);
  }
}


module.exports = { YTDL }