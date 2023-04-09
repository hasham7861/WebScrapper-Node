const axios = require('axios');
const cheerio = require('cheerio');
const async = require('async');

async.times(10, (pageNum, callback) => {
  const url = `https://news.ycombinator.com/news?p=${pageNum+1}`;
  axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);
      $('.title a').each((index, element) => {
        const title = $(element).text();
        console.log(`Post ${index+1}: ${title}`);
      });
      callback(null);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('All done!');
});
