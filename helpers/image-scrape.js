const cheerio = require('cheerio');
const request = require('request');
//TODO: convert this to promises???
//TODO: This only works on wordpress sites atm, needs to be improved.
const findImage = (url, cb)=>{
    //requests the url
    request(url, (error, response, body)=>{
        let page = body;
        //loads the body into cheerio for parsing
        const $ = cheerio.load(page);
        let image = $('img.wp-post-image');
        //grabs the image from the source
        let imageUrl = image[0].attribs.src;
        //TODO: this should by posted to imgur or another host
        cb(imageUrl);
    });
};


module.exports = {
    findImage: findImage
}