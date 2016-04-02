/**
 * MemeController
 *
 * @description :: Server-side logic for managing memes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: find
};

function find(req, res) {
  var memeUrls = [
    'http://localhost:1337/images/meme-1.jpg',
    'http://localhost:1337/images/meme-2.jpg',
    'http://localhost:1337/images/meme-3.png',
    'http://localhost:1337/images/meme-4.jpg',
    'http://localhost:1337/images/meme-5.jpg',
  ];

  return res.json({memes: memeUrls});
}

