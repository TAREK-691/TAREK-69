const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.0",
    author: "Tarek",
    shortDescription: "Display bot and owner information",
    longDescription: "Shows detailed info including bot name, prefix, and owner's personal information.",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const mention = [{ id, tag: name }];

    // 🛠 Convert Google Drive view link to direct download link
    const fileId = "1QQ4rcb5mnLytHKuavPxOjx0rF-YuOTaS";
    const directURL = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // ⏬ Download the file temporarily
    const filePath = path.join(__dirname, "owner-video.mp4");
    const response = await axios({
      url: directURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const info = 
`━━━━━━━━━━━━━━━━
👋 𝗛𝗲𝗹𝗹𝗼, ${name}

📌 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
• 𝗡𝗮𝗺𝗲➝ ᴇʀʀᴏʀ
• 𝗣𝗿𝗲𝗳𝗶𝘅 ➝ .

👤 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢
• 𝗡𝗮𝗺𝗲 ➝ 𝗧𝗮𝗿𝗲𝗸 𝗦𝗵𝗶𝗸𝗱𝗮𝗿
• 𝗚𝗲𝗻𝗱𝗲𝗿 ➝ 𝗠𝗮𝗹𝗲
• 𝗔𝗴𝗲 ➝ 18+
• 𝗦𝘁𝗮𝘁𝘂𝘀 ➝ 𝗦𝗶𝗻𝗴𝗹𝗲
• 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 ➝ 𝗗𝗶𝗽𝗹𝗼𝗺𝗮 𝗶𝗻 𝗖𝗶𝘃𝗶𝗹 𝗘𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝗶𝗻𝗴
• 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻 ➝ 𝗧𝗮𝗻𝗴𝗮𝗶𝗹
━━━━━━━━━━━━━━━━━`;

    message.reply({
      body: info,
      mentions: mention,
      attachment: fs.createReadStream(filePath)
    });
  }
};
