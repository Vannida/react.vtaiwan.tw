//import superagent from 'superagent-bluebird-promise'
//import fs from 'mz/fs'
//import co from 'co'
var superagent = require('superagent-bluebird-promise')
var fs = require('mz/fs')
var co = require('co')


const proposalDataFile = './src/Proposal/data/Proposals.json';

co(function* () {
  const data = JSON.parse(fs.readFileSync(proposalDataFile))
  yield Object.keys(data).map(function (name) {
    return superagent.get('https://www.slideshare.net/api/oembed/2?format=json&url=' + data[name].slides_url)
      .then(function ({body}) {
        data[name].slides_image = body.slide_image_baseurl.replace(/slide-$/, '-1' + body.slide_image_baseurl_suffix)
        data[name].slides_embed_url = body.html.split(/"(?:https?:)(\/\/www.slideshare.net\/slideshow\/embed_code\/.*?)"/)[1]
      })
  })
  fs.writeFileSync(proposalDataFile, JSON.stringify(data, null, 2))
}).catch(console.log)
