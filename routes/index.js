var express = require('express');
var router = express.Router();
const dt = require("downloadtiktok")
const {alldl} = require('rahad-all-downloader');
const Tiktok = require("@tobyg74/tiktok-api-dl")
const {tikdown} = require("nayan-media-downloader")
const {ttdl} = require('btch-downloader')
// /* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

router.get('/download', async (req, res) => {
    const {url} = req.query;
    try {
        const result = await Tiktok.Downloader(url, {
            version: "v1"
        })
        console.log("result:::", result)
        const description = result.result.description
        const hashtag = result.result.hashtag
        const userName = result.result.author.nickname
        const avatar = result.result.author.avatarMedium[1]
        const videoThumb = result.result.video.cover[1]
        const videoTime = result.result.video.duration
        const videoWatermark = result.result.video.downloadAddr[1]
        const videoNoWatermarkSD = result.result.video.playAddr[0]
        const videoNoWatermarkHD = result.result.video.playAddr[1]
        const musicTitle = result.result.music.title
        const musicAuth = result.result.music.author
        const musicThumb = result.result.music.coverLarge[1]
        const music = result.result.music.playUrl[0]


        res.json({
            description,
            hashtag,
            userName,
            avatar,
            videoThumb,
            videoTime,
            video: [
                {
                    url: videoWatermark,
                    name: "Watermark",
                    type: "mp4",
                },
                {
                    url: videoNoWatermarkSD,
                    name: "SD",
                    type: "mp4",
                },
                {
                    url: videoNoWatermarkHD,
                    name: "HD",
                    type: "mp4",
                },
                {
                    url: music,
                    name: "MP3",
                    type: "mp3",
                },
                {
                    url: musicThumb,
                    name: "thumbnail music",
                    type: "image",
                },
                {
                    url: avatar,
                    name: "avatar user",
                    type: "image",
                },
                {
                    url: videoThumb,
                    name: "thumbnail video",
                    type: "image",
                }
            ],
            musicTitle,
            musicAuth,
            musicThumb,
            music,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error downloading video');
    }
});


// router.get('/download', async (req, res) => {
//     const { url } = req.query;
//     try {
//         const result = await Tiktok.Downloader(url,{
//             version:"v3"
//         })
//         console.log("result:::",result)
//
//
//
//         res.json({
//             result
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error downloading video');
//     }
// });
// router.get('/download', async (req, res) => {
//     const { url } = req.query;
//     console.log(url)
//     try {
//         const result = await dt.downloadTiktok(url)
//         console.log("result:::",result)
//         const title = result.title;
//         const thumbnail = result.thumbnail;
//         const duration = result.duration;
//
//         const medias = result.medias.map(media => ({
//             url: media.url,
//             quality: media.quality,
//             size: media.size,
//             formattedSize: media.formattedSize,
//             type: media.extension,
//         }));
//
//         res.json({
//             title,
//             duration,
//             thumbnail,
//             medias,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error downloading video');
//     }
// });


module.exports = router;
