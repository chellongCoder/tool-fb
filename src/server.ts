
var express = require('express')
var app = express()

var request = require('request')
var tr = require('tor-request')

var ipservices = [
  'http://icanhazip.com',
  'http://ifconfig.me/ip',
  'https://api.ipify.org',
  'http://ip.appspot.com',
  'http://ip-spot.com',
]

function findExternalIp (request, done) {
  var iterator = 0
  function tick () {
    console.log('ticking')
    url = ipservices[iterator++]
    console.log(`🛠 LOG: 🚀 --> ------------------------------------------------------------`);
    console.log(`🛠 LOG: 🚀 --> ~ file: server.ts ~ line 20 ~ tick ~ url`, url);
    console.log(`🛠 LOG: 🚀 --> ------------------------------------------------------------`);
    if (!url) return done(null)

    request(url, function (err_, req_, body) {
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------`);
      console.log(`🛠 LOG: 🚀 --> ~ file: server.ts ~ line 26 ~ req_`, req_, body);
      console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------`);
      if (err_) {
        console.log(err_)
        tick()
      } else {
        console.log(body)
        done(body)
      }
    })
  }
  tick()
}


var limiter = require('express-rate-limit')({
  windowMs: 1000 * 60 * 15, // 15 min
  max: 200,
  delayMs: 0
})

var renewTorSessionTimeout = 1000 * 30 // 30 second timeout on session renew
var renewTorSessionTime = Date.now() - renewTorSessionTimeout

app.use(limiter)
app.use(express.static('public'))

app.use(function (req, res, next) {
  console.log(req.originalUrl)
  next()
})

app.get('/api/myip', function (req, res) {
  res.send(req.headers['x-forwarded-for'] || req.ip)
})

app.get('/api/identify', async function (req, res) {
  const result = await fetch("https://www.facebook.com/ajax/login/help/identify.php?ctx=recover", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-fb-lsd": "AVquKqj3HjI",
      "cookie": "fr=0qakZVo816TYN64W4..BimcXa.NI.AAA.0.0.BimcXa.AWVOSIzSc7w; sb=2sWZYlnfqJadqu-ZoEwQc6Np; dpr=2; datr=2sWZYq0LSg9E6UIkiAFOnOLO; wd=807x908; sfiu=AYh5R5hxPkVidmBpclKHL2LcI_hyaZK4mBOXUQBusutPwhpQMLno6qaN1VveDDO9qLTesh6hnMsqNY3oNClWq1IVAVJ0-7tpJ9KH-4ZLnN48nfCv15QLtobCfSYEDLw7seiKUnm7BldVK8kyTbcAJ1td1RGDTuXW6NWZ7N-cS8DZQLaGwGuRBNCw2wXgbpav1bO2Jb_C-FD5rW_V9Gmhe3QR",
      "Referer": "https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0",
      "Referrer-Policy": "origin-when-cross-origin"
    },
    "body": "jazoest=2977&lsd=AVquKqj3HjI&email=service%40adorebeauty.com.a&did_submit=1&__user=0&__a=1&__dyn=7xeUmBwjbg7ebwKBWo5O12wAxu13wqovzEdEc8uxa0z8S2S4o1j8hwem0nCq1ewcG0KEswaq0yE7i0n2US1vw9W1PwBgao884y0Mo5W3S1lwlEjxG0y8jwVw9O1iwKwHw8W1uwa-7U1bobodEGdw46wbS1bwzw&__csr=&__req=c&__hs=19146.BP%3ADEFAULT.2.0.0.0.&dpr=2&__ccg=UNKNOWN&__rev=1005626680&__s=bvcwwo%3Aiidmvf%3A1eswrk&__hsi=7104937690027916183-0&__comet_req=0&__spin_r=1005626680&__spin_b=trunk&__spin_t=1654247215",
    "method": "POST"
  });
  const data = await (await result.text()).replace("for (;;);", "")
  console.log(`🛠 LOG: 🚀 --> -----------------------------------------------------------🛠 LOG: 🚀 -->`);
  console.log(`🛠 LOG: 🚀 --> ~ file: server.ts ~ line 87 ~ result`, data, JSON.parse(data));
  console.log(`🛠 LOG: 🚀 --> -----------------------------------------------------------🛠 LOG: 🚀 -->`);

  res.send(JSON.parse(data))
  

})

app.get('/api/getdata', async function (req, response) {
   tr.request('https://graph.facebook.com/v13.0/pages/search?access_token=EAABsbCS1iHgBAGNU5rxcsa50gO6NvvGZCFMZBqevpuqrddfy3ZBTh2iy9PL7im5sU8dsBc0CZCHYz2Fp89znzvY7116IS7A2p8wcZCEQZBE1K92T6gwZCB1MTCFZBsLXw3ehicssZBbRZCyM6r8ZBblWBZA21GZCGEE1i9qagWfZAHemmqeR0qX76h7mSqe4FA1dHymwgZD&__cppo=1&debug=all&format=json&limit=300&method=get&pretty=0&q=nails&state=%22united%20state%22&suppress_http_code=1&transport=cors&type=country', {
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
      }, (err, res, body) => {
      console.log(`🛠 LOG: 🚀 --> ---------------------------------------------------------------------`);
      console.log(`🛠 LOG: 🚀 --> ~ file: app.ts ~ line 171 ~ this.app.listen ~ res`, res);
      console.log(`🛠 LOG: 🚀 --> ---------------------------------------------------------------------`);
        response.send(JSON.parse(body))
      });
      
})



app.get('/api/serverip', function (req, res) {
  findExternalIp(request, function (ip) {
    res.send(ip)
  })
})

app.get('/api/mytorip', function (req, res) {
  findExternalIp(tr.request, function (ip) {
    res.send(ip)
  })
})

app.get('/api/requestNewTorSession', function (req, res) {
  var now = Date.now()
  var delta = now - renewTorSessionTime
  if (delta > renewTorSessionTimeout) {
    renewTorSessionTime = now

    tr.renewTorSession(function (err, success) {
      if (err) return res.status(500).send({
        statusCode: 500,
        message: 'error - could not renew tor session'
      })
      res.status(200).send({
        statusCode: 200,
        message: 'success'
      })
    })
  } else {
    var s = (delta / 1000) | 0
    res.status(400).send({
      statusCode: 400,
      message: 'too frequest session renews, try again in ' + s + ' seconds'
    })
  }
})

var port = 3366
var server = require('http').createServer(app)
server.listen(port, function () {
  console.log('Server listening on port *:' + port)
})