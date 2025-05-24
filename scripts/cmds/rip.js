const fs = require("fs-extra");
const axios = require("axios");
const Canvas = require("canvas");
const path = require("path");

module.exports = {
  config: {
    name: "rip",
    aliases: ["rip"],
    version: "2.2",
    author: "TAREK",
    countDown: 5,
    role: 0,
    shortDescription: "rip with custom image",
    longDescription: "Generate a rip image with the mentioned user using a custom background.",
    category: "funny",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, message, event, usersData }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) return message.reply("Please mention someone to rip ☠️.");

    let mentionedID = mention[0];

    try {
      // Get mentioned user's avatar
      const avatarUrl = await usersData.getAvatarUrl(mentionedID);
      const avatarImg = await Canvas.loadImage(avatarUrl);

      // Load background
      const bgUrl = "https://res.cloudinary.com/mahiexe/image/upload/v1748115544/mahi/1748115543353-515845916.png";
      const bgRes = await axios.get(bgUrl, { responseType: "arraybuffer" });
      const bg = await Canvas.loadImage(bgRes.data);

      // Canvas setup
      const canvasWidth = 900;
      const canvasHeight = 600;
      const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext("2d");

      // Draw background
      ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);

      // Avatar settings
      const avatarSize = 150; // ছোট করা হলো
      const x = 375; // কফিনের মাঝ বরাবর
      const y = 300; // কফিনের উপরে বসানোর জন্য নিচে নামানো হলো

      ctx.save();
      ctx.beginPath();
      ctx.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImg, x, y, avatarSize, avatarSize);
      ctx.restore();

      // Save and send
      const imgPath = path.join(__dirname, "tmp", `${mentionedID}_rip.png`);
      await fs.ensureDir(path.dirname(imgPath));
      fs.writeFileSync(imgPath, canvas.toBuffer("image/png"));

      message.reply({
        body: "RIP my friend ☠️",
        attachment: fs.createReadStream(imgPath)
      }, () => fs.unlinkSync(imgPath));

    } catch (err) {
      console.error("Error in rip command:", err);
      message.reply("There was an error creating the rip image.");
    }
  }
};
