var express = require('express');
var router = express.Router();
const dt = require("downloadtiktok")


// /* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

router.get('/download', async (req, res) => {
    const { url } = req.query;

    try {
        const result = await dt.downloadTiktok(url);
        const title = result.title;
        const thumbnail = result.thumbnail;
        const duration = result.duration;

        const medias = result.medias.map(media => ({
            url: media.url,
            quality: media.quality,
            size: media.size,
            formattedSize: media.formattedSize,
            type: media.extension,
        }));

        res.json({
            title,
            duration,
            thumbnail,
            medias,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error downloading video');
    }
});
module.exports = router;
