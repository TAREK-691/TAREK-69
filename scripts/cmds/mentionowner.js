module.exports = {
  config: {
    name: "mentionowner",
    version: "1.0",
    author: "Tarek",
    shortDescription: { en: "Replies when someone says Tarek ke" },
    category: "no prefix",
    cooldowns: 3,
  },

  onStart: async function () {},

  onChat: async ({ event, api }) => {
    const message = event.body?.toLowerCase() || "";
    const keywords = ["tarek ke", "tarek k", "tarek কে"];

    if (keywords.some(word => message.includes(word))) {
      return api.sendMessage("𝗧𝗮𝗿𝗲𝗸 𝗮𝗺𝗮𝗿 𝗼𝘄𝗻𝗲𝗿 𝗼𝗸𝗵!! 🌷", event.threadID, event.messageID);
    }
  }
};
