/**
 * MemeController
 *
 * @description :: Server-side logic for managing memes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: all
};

function all(req, res) {
  var memeUrls = [
    'http://cdn.meme.am/instances/500x/13734123.jpg',
    'http://s2.quickmeme.com/img/6d/6d68ad25beab779467cf2e95c7c3de742f4df17ad4e38176a71886f566816424.jpg',
    'http://cdn.pophangover.com/wp-content/uploads/2013/12/mem2.png',
    'http://memesvault.com/wp-content/uploads/Best-Meme-03.jpg',
    'http://memesvault.com/wp-content/uploads/I-Have-No-Idea-What-Im-Doing-Dog-02.jpg'
  ];

  return res.json({memes: memeUrls});
}

