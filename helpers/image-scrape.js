const cheerio = require('cheerio');
const request = require('request');
const cloudinary = require('cloudinary')
//TODO: convert this to middleware?
//TODO: This only works on wordpress sites atm, needs to be improved with other common sites and CMS, along with a fallback
const findImage = (url, cb)=>{
    //requests the url
    request(url, (error, response, body)=>{
        let page = body;
        //loads the body into cheerio for parsing
        const $ = cheerio.load(page);
        let image = $('img.wp-post-image');
        //grabs the image from the source
        let imageUrl = image[0].attribs.src;
        //Uploads to CDN, passes cb in
        cloudinary.uploader.upload(imageUrl, (result)=>{
            cb(result);
        });
    });
};


module.exports = {
    findImage: findImage
}