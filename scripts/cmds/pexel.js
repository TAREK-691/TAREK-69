const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = "DfOfDViEmn5HTmJSekvc2uJlc07ogDebw6YHX6EfscdJa0tMMwUcaJ7o";

module.exports = {
  config: {
    name: "pexel",
    version: "2.2.0",
    author: "TAREK",
    description: "Search photos or videos from Pexels",
    category: "media",
    usages: "pexel <query> | pexel video <query>",
    cooldowns: 3
  },

  onStart: async function ({ api, event, args }) {
    const isVideo = args[0]?.toLowerCase() === "video";
    const query = isVideo ? args.slice(1).join(" ") : args.join(" ");

    if (!query)
      return api.sendMessage("🔍 Keyword dao bro 🙂", event.threadID);

    const endpoint = isVideo
      ? `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=10`
      : `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`;

    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: API_KEY }
      });

      // 🎬 VIDEO
      if (isVideo) {
        const videos = res.data.videos || [];
        if (!videos.length)
          return api.sendMessage("❌ Video paoa jai nai.", event.threadID);

        let msg = "🎬 PEXELS VIDEO RESULTS\n\n";
        videos.forEach((v, i) => {
          msg += `${i + 1}. 👤 ${v.user?.name || "Unknown"}\n`;
        });
        msg += "\n👉 Reply 1–10 to download";

        return api.sendMessage(msg, event.threadID, (err, info) => {
          global.client.handleReply.push({
            name: "pexel",
            author: event.senderID,
            messageID: info.messageID,
            videos
          });
        });
      }

      // 📸 PHOTO
      const photos = res.data.photos || [];
      if (!photos.length)
        return api.sendMessage("❌ Photo paoa jai nai.", event.threadID);

      const files = [];

      for (let i = 0; i < photos.length; i++) {
        const imgUrl = photos[i].src.medium;
        const imgPath = path.join(__dirname, "cache", `pexel_${Date.now()}_${i}.jpg`);

        const stream = await axios.get(imgUrl, { responseType: "stream" });
        await new Promise((resolve, reject) => {
          const w = fs.createWriteStream(imgPath);
          stream.data.pipe(w);
          w.on("finish", resolve);
          w.on("error", reject);
        });

        files.push(fs.createReadStream(imgPath));
        setTimeout(() => fs.existsSync(imgPath) && fs.unlinkSync(imgPath), 15000);
      }

      api.sendMessage(
        {
          body: `📷 Top ${photos.length} photos of "${query}"`,
          attachment: files
        },
        event.threadID
      );

    } catch (e) {
      console.error(e);
      api.sendMessage("❌ Pexels API error 😔", event.threadID);
    }
  },

  handleReply: async function ({ api, event, handleReply }) {
    if (event.senderID !== handleReply.author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > handleReply.videos.length)
      return api.sendMessage("❗ 1–10 er moddhe number dao", event.threadID);

    const video = handleReply.videos[index - 1];
    const file = video.video_files.find(v => v.quality === "sd" || v.quality === "hd");
    if (!file) return api.sendMessage("❌ Video file paoa jai nai.", event.threadID);

    const savePath = path.join(__dirname, "cache", `pexel_video_${Date.now()}.mp4`);

    try {
      const res = await axios.get(file.link, { responseType: "stream" });
      await new Promise((resolve, reject) => {
        const w = fs.createWriteStream(savePath);
        res.data.pipe(w);
        w.on("finish", resolve);
        w.on("error", reject);
      });

      api.sendMessage(
        {
          body: `🎬 Video by: ${video.user?.name || "Unknown"}`,
          attachment: fs.createReadStream(savePath)
        },
        event.threadID,
        () => setTimeout(() => fs.existsSync(savePath) && fs.unlinkSync(savePath), 15000)
      );

    } catch (e) {
      console.error(e);
      api.sendMessage("❌ Video download error 😢", event.threadID);
    }
  }
};
