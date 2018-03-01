const cheerio = require('cheerio');
const request = require('request');
const cloudinary = require('cloudinary')
//TODO: convert this to middleware?
//TODO: This only works on opengraph enabled sites atm, need fallbacks
//TODO: grab tags from meta if available

const findImage = (url, cb)=>{
    //requests the url
    request(url, (error, response, body)=>{
        let page = body;
        let tags;
        //loads the body into cheerio for parsing
        const $ = cheerio.load(page);
        let image = $('meta[property="og:image"]');
        try{
            tags = $('meta[name="keywords"]');
            tags = tags[0].attribs.content.split(',');
        }
        catch(error){
            console.error(error);
        }
        //grabs the image from the source
        let imageUrl = image[0].attribs.content;
        //Uploads to CDN, passes cb in
        cloudinary.uploader.upload(imageUrl, (result)=>{
            cb(result, tags);
        });
    });
};


module.exports = {
    findImage: findImage
}