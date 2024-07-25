var express = require('express');
var router = express.Router();
const dt = require("downloadtiktok")


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// router.get('/download', async (req, res) => {
//     const { url } = req.query;
//
//     try {
//         // Lấy thông tin và video từ TikTok
//         const result = await dt.downloadTiktok(url);
//         console.log(result)
//         const hdUrl = result.hd; // URL video HD
//         const sdUrl = result.sd; // URL video SD
//         const watermarkUrl = result.wm; // URL video có watermark
//         const thumbnailUrl = result.thumbnail; // URL thumbnail
//         const audioUrl = result.music; // URL tệp âm thanh
//         const videoTitle = result.title; // Tiêu đề video
//         const videoDuration = result.duration; // Thời lượng video
//
//         // Tải video dưới dạng Blob để lấy dung lượng
//         const fetchBlobSize = async (fileUrl) => {
//             const response = await fetch(fileUrl);
//             const blob = await response.blob();
//             return blob.size;
//         };
//
//         const hdSize = await fetchBlobSize(hdUrl);
//         const sdSize = await fetchBlobSize(sdUrl);
//         const watermarkSize = await fetchBlobSize(watermarkUrl);
//         const audioSize = await fetchBlobSize(audioUrl);
//
//         // Gửi dữ liệu về client
//         res.json({
//             title: videoTitle,
//             duration: videoDuration,
//             hd: { url: hdUrl, size: hdSize },
//             sd: { url: sdUrl, size: sdSize },
//             watermark: { url: watermarkUrl, size: watermarkSize },
//             thumbnail: thumbnailUrl,
//             audio: { url: audioUrl, size: audioSize }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error downloading video');
//     }
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
