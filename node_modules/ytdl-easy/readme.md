# Ytdl-Easy
Ytdl-Easy is a YouTube video downloader module

It is scraping a website called [10downloader.com](https://10downloader.com/en/101/youtube-shorts-downloader)

I made it for learning purpose use it as your need.

Feel free to Contribute!!

And if not working this module anymore try to add your cookie from the website

## Installation

To install [ytdl-easy], follow these steps:

1. install the npm package:

   ```bash
   npm install ytdl-easy
   ```

2. Formats and qualites for this module:
 ```

 mp4: Best and Medium
 
 mp3: 128kbps
 
```

3. Examples:
```javascript
const {YTDL} = require("ytdl-easy");
const yturl = "https://youtu.be/r6zIGXun57U";

YTDL(yturl)  
.then( res => {
console.log(res)
})
```
 Examples With your own Cookie:
```javascript
const {YTDL} = require("ytdl-easy");
const yturl = "https://youtu.be/r6zIGXun57U";
const cookie = "XSRF-TOKEN=eyJpdiI6Ind6Um50aWRvOC9yMURycVREbGpxK3c9PSIsInZhbHVlIjoiU1JzQ1RsUW9GOHRqdmZLS2t6NkdWTlhNTmhiNGExN1Rtd1l4aDBzd2lKNDV5RUlIckl0dkVMYWtuZWVmRjUrblc4elN3b0EyRmFnTnpsQVh6aWk1YWgwWFJ4VVJaTm1WVXd2ZmJHNjVMNzJYOGt4Rmx4bXRUTjFUN0djdW5wSnAiLCJtYWMiOiIzYmU3N2EzNzVkMzVhNzY2MmQ3Yjc4YjIyZDRkNzk5ZGUwZGE2ZDUzMWU0MzViNzM3OGE0NjdmNDc0ZjI0Njg2IiwidGFnIjoiIn0%3D; 10downloader_session=eyJpdiI6IkFWSFB6R2thTjJ1WnovZy8waVR1T3c9PSIsInZhbHVlIjoiRExxRDNiSHFYSi8yejB2aUdjZGswbUlkV0QybDZ1WHNmMHJ5SkJVbmdISEorWFlMT0c4RUNibllnUXpTNW5yTWd0Tk8xTjdrblVFQlQ0M3IvaFBpc1R4b0taV2xlbTNMVlZodDYwN0tYTGlGODBCdlg2bDQzYzNoalNub01EcjQiLCJtYWMiOiJhYzYwN2ZkNTcwMzdkYzk4ZGJmZDdjZTk5NzRlZDk2ODIzZjdmNzA5MzUyZWM1MjBiZWJlN2FjZGZkY2Q0YjA0IiwidGFnIjoiIn0%3D";


YTDL(yturl,cookie)  
.then( res => {
console.log(res);
})
```
```output

  {
"Status":"Success!",
"StatusCode":200,
"video":
   {
    "Best":"https://rr2---sn-gjo-w43s.googlevideo.com/videoplayback?expire=1691364984&ei=GNrPZJ2YLoa-gwPR-4qgCA&ip=91.229.105.124&id=o-AKilk3DzmE_2TGolsSZSPxMVdhrpEHlsigBi6is0rtNI&itag=22&source=youtube&requiressl=yes&mh=fu&mm=31%2C29&mn=sn-gjo-w43s%2Csn-ab5sznlk&ms=au%2Crdu&mv=m&mvi=2&pl=23&initcwndbps=3195000&spc=UWF9f7lElI4m04ryvWeUMUKUuJkShKs&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=231.386&lmt=1644707662410735&mt=1691342971&fvip=3&fexp=24007246&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wQwIgOy5aw2Xu8bahs0oDTy4wcYcTi2MS8bdtmCxJXm2BaAQCH39SzqjxEfZ1XBQe1xVNqduFoZg2b1eBmKlOVjHpfqc%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAN3Zxu6hQB6jvgn6RdxnP-JDoCVUQYg1BgpcRCloS83nAiEAnkxoACmugLOu5WFwhoY0yGED4tTHOymFz8Zak336xjQ%3D&title=Locked+Away+Mashup+(Sush+&+Yohan+x+Aaron+Aamir)",
   "Medium":"https://rr2---sn-gjo-w43s.googlevideo.com/videoplayback?expire=1691364984&ei=GNrPZJ2YLoa-gwPR-4qgCA&ip=91.229.105.124&id=o-AKilk3DzmE_2TGolsSZSPxMVdhrpEHlsigBi6is0rtNI&itag=18&source=youtube&requiressl=yes&mh=fu&mm=31%2C29&mn=sn-gjo-w43s%2Csn-ab5sznlk&ms=au%2Crdu&mv=m&mvi=2&pl=23&initcwndbps=3195000&spc=UWF9f7lElI4m04ryvWeUMUKUuJkShKs&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=231.386&lmt=1664122867860591&mt=1691342971&fvip=3&fexp=24007246&beids=24350018&c=ANDROID&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJ_qCvAg6VFkcjCUbPzIxdxsy-jbk3ojdjfO4JGuXa6UCIH5uqjORQZacJ45unpCRsVrw7j5KzrsFNi_6NRL_uk_W&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAN3Zxu6hQB6jvgn6RdxnP-JDoCVUQYg1BgpcRCloS83nAiEAnkxoACmugLOu5WFwhoY0yGED4tTHOymFz8Zak336xjQ%3D&title=Locked+Away+Mashup+(Sush+&+Yohan+x+Aaron+Aamir)"
   },
"Audio":"https://rr2---sn-gjo-w43s.googlevideo.com/videoplayback?expire=1691364984&ei=GNrPZJ2YLoa-gwPR-4qgCA&ip=91.229.105.124&id=o-AKilk3DzmE_2TGolsSZSPxMVdhrpEHlsigBi6is0rtNI&itag=17&source=youtube&requiressl=yes&mh=fu&mm=31%2C29&mn=sn-gjo-w43s%2Csn-ab5sznlk&ms=au%2Crdu&mv=m&mvi=2&pl=23&initcwndbps=3195000&spc=UWF9f7lElI4m04ryvWeUMUKUuJkShKs&vprv=1&svpuc=1&mime=video%2F3gpp&gir=yes&clen=2295314&dur=231.410&lmt=1644701249841880&mt=1691342971&fvip=3&fexp=24007246&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgD2QB9tW5_Wpd7tyU9Q2WR_H_kBm4sTFdbodCUwep86ECIQC507Y0zxVUhg3ZuWyo7Y_36XnxxFc13xpltG8seh2bGw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAN3Zxu6hQB6jvgn6RdxnP-JDoCVUQYg1BgpcRCloS83nAiEAnkxoACmugLOu5WFwhoY0yGED4tTHOymFz8Zak336xjQ%3D&title=Locked+Away+Mashup+(Sush+&+Yohan+x+Aaron+Aamir)",
"Thumbnail":"https://i.ytimg.com/vi_webp/l4viU8Ck1_g/maxresdefault.webp"
  }

```
