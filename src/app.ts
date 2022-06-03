import express from "express";
import FB from 'fb';
import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';
import httpProxy from 'http-proxy';
import tr from 'tor-request';

// const bizSdk = require('facebook-nodejs-business-sdk');
// const Page = bizSdk.Page;

const access_token = 'EAABsbCS1iHgBALkHNJaz3VgoqVAfqapk99fRZCQXiIZBCDsGJtZApyVlHRq8jnTfEdZAkeSBQIq7UHrjOgKM1c65U8634rRq1ZAXoHYTEZAaKWMp8w3BrnDTArFm5xVtasJ21UhPdB1FCyeEzOJCv2bxNhCR3AxzYZCjQZBaULW7RP6flSDTioLAeoHTh5ZAk6jYZD';
const app_secret = 'aa70290c24f7b2bff23ebed0eb0ce709';
const app_id = '1024520281502791';
const id = 'nails18peckham';
// const api = bizSdk.FacebookAdsApi.init(access_token);
// const showDebugingInfo = true; // Setting this to true shows more debugging info.
// if (showDebugingInfo) {
//   api.setDebug(true);
// }


export default class App {
  public app: express.Application;
  public port: string | number;
  public proxy?: httpProxy
  public next: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.next = 'https://graph.facebook.com/v13.0/pages/search?access_token=EAABsbCS1iHgBAGNU5rxcsa50gO6NvvGZCFMZBqevpuqrddfy3ZBTh2iy9PL7im5sU8dsBc0CZCHYz2Fp89znzvY7116IS7A2p8wcZCEQZBE1K92T6gwZCB1MTCFZBsLXw3ehicssZBbRZCyM6r8ZBblWBZA21GZCGEE1i9qagWfZAHemmqeR0qX76h7mSqe4FA1dHymwgZD&__cppo=1&debug=all&format=json&limit=300&method=get&pretty=0&q=nails&state=%22united%20state%22&suppress_http_code=1&transport=cors&type=country'
  }


// logApiCallResult = (apiCallName, data) => {
//     console.log(apiCallName);
//     if (showDebugingInfo) {
//       console.log('Data:' + JSON.stringify(data));
//     }
//   };
  
  // runTool = () => {
  //   let fields: any[], params;
  //   fields = [
  //   ];
  //   params = {
  //     'type' : 'adradiussuggestion',
  //     'latitude' : '51.5152253',
  //     'longitude' : '-0.1423029',
  //   };
  //   const sample_code = (new Page(id)).get(
  //     fields,
  //     params
  //   );
    
    // this.logApiCallResult('sample_code api call complete.', sample_code);
  // }

  timeout = async () => {
    return await new Promise(resolve => this.getData(undefined, resolve));
  }

  timeoutInfo = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getData = async (limit?: number, resolve?: any, ) => {
    console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`);
    console.log(`🛠 LOG: 🚀 --> ~ file: app.ts ~ line 69 ~ App ~ getData= ~ this.next`, this.next);
    console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`);

     tr.request(this.next, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://developers.facebook.com',
        'Cookie': 'wd=1650x404; usida=eyJ2ZXIiOjEsImlkIjoiQXJjOXYzaXV0MmtzeSIsInRpbWUiOjE2NTMyMDQ1NDZ9; cppo=1; fr=0RTEYl2K91g3DU27Q.AWUML3Ep0mitrHrAgdokduamOz0.Biidm_.ZU.AAA.0.0.Biid3n.AWVRGGhohcM; c_user=100066192924982; xs=5%3Aymwyn3MxZYEPLQ%3A2%3A1653055477%3A-1%3A14128%3A%3AAcXyiBJbeXDJvaLfOxMJnvjqoTixIn3zzLg-BP4bBg; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1653156441657%2C%22v%22%3A1%7D; sb=fRZdYmmkyLCqUiLG_yqHqUa2; locale=en_US; dpr=2; datr=fRZdYvFPptvdypB4vUSP-Iy_',
        'Host': 'graph.facebook.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15',
        'Referer': 'https://developers.facebook.com/',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Connection': 'keep-alive'
      },
    }, async (err, res) =>  {
      const data = JSON.parse(res.body);
      const records: any[] = [];
      const next: string = data.paging.next;
      this.next = next;
      // for {limit}} thằng lấy ra data page 
      await Promise.all(data.data.slice(0, limit).map(async (element: any, index:number) => {
        await this.timeoutInfo(1000 * index)
        console.log('start request lấy email');
        const info = await axios({
          method: 'GET',
          url: `https://graph.facebook.com/v13.0/${element.id}?access_token=EAABsbCS1iHgBAGNU5rxcsa50gO6NvvGZCFMZBqevpuqrddfy3ZBTh2iy9PL7im5sU8dsBc0CZCHYz2Fp89znzvY7116IS7A2p8wcZCEQZBE1K92T6gwZCB1MTCFZBsLXw3ehicssZBbRZCyM6r8ZBblWBZA21GZCGEE1i9qagWfZAHemmqeR0qX76h7mSqe4FA1dHymwgZD&__cppo=1&debug=all&fields=emails&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`,
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://developers.facebook.com',
            'Cookie': 'wd=1650x404; usida=eyJ2ZXIiOjEsImlkIjoiQXJjOXYzaXV0MmtzeSIsInRpbWUiOjE2NTMyMDQ1NDZ9; cppo=1; fr=0RTEYl2K91g3DU27Q.AWUML3Ep0mitrHrAgdokduamOz0.Biidm_.ZU.AAA.0.0.Biid3n.AWVRGGhohcM; c_user=100066192924982; xs=5%3Aymwyn3MxZYEPLQ%3A2%3A1653055477%3A-1%3A14128%3A%3AAcXyiBJbeXDJvaLfOxMJnvjqoTixIn3zzLg-BP4bBg; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1653156441657%2C%22v%22%3A1%7D; sb=fRZdYmmkyLCqUiLG_yqHqUa2; locale=en_US; dpr=2; datr=fRZdYvFPptvdypB4vUSP-Iy_',
            'Host': 'graph.facebook.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15',
            'Referer': 'https://developers.facebook.com/',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive'
          }
        });
        console.log(`🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`);
        console.log(`🛠 LOG: 🚀 --> ~ file: app.ts ~ line 131 ~ App ~ this.app.listen ~ info`, info.data);
        console.log(`🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`);
        records.push({...element, emails: info.data.emails}); // push vào mảng data 
        // lưu data vào file 
        fs.appendFileSync('output.json', info.data.emails ? `${info.data.emails}\n` : ``);
      }))
      console.log('end', res.body);
      resolve(res);


    })
  }
  
  run() {
    this.app.listen(this.port, async () => {
      console.log(`Server listening on port ${this.port}`);
      console.log(`FB`, FB);
      FB.options({
        appId: app_id,
        appSecret: app_secret,
        accessToken: access_token,
        version: 'v13.0',
      });
      // this.getData(10);
      const delay = () => this.timeout()
      const dec = async () => {
        console.log(5)
        return await delay()
      }

      const foo = async () => {
        
        while(true) 
          await dec();
      }
      foo();

      
    });
  }
}

