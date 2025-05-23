const replies = [
  "Tarek ভাই এখন ব্যস্ত আছেন, পরে কথা বলবেন! 😴",
  "তারে এতো ডাকলে গলে যাবে, সাবধান! 🤭",
  "আরে আরে, ও তো এখন প্রেম ভাবনায় হাবুডুবু! 💘",
  "Amar boss 𝑇𝑎𝑟𝑒𝑘 busy ase 😎",
  "Amar boss ke Dak dibi na 🚫📞",
  "𝑇𝑎𝑟𝑒𝑘 er permission chara daka daki bondho 🙅‍♂️",
  "Boss sleep ditese, disturb korish na 💤",
  "Boss er mood baje, take diye ki korbi? 😡",
  "Boss ke daka daki korle boss rage jabe 🔥",
  "Dak deoyar age chinta koros? 🤔",
  "ডাকাডাকি না করে আগে ওকে একটা প্রেম করিয়ে দাও, তবেই কথা বলবে! 💌",
  "Boss er battery low, charge dite hobe 🔋⚡",
  "Boss re dakis na to 😡 ki hoiche amk bol 🙂🌷",
"Boss এর প্রেমের গরম ঢেউয়ে ডুবে যেও না! 🌊🔥",
"Boss কে ডাকো না, ও এখন প্রেমে ডুবে আছে! 🌊💕",
  "Tag dile boss er phone vibrate hoye jabe! 📳",
];

const keywords = ["tarek"];

module.exports = {
  config: {
    name: "mention",
    version: "1.6",
    author: "Tarek",
    shortDescription: {
      en: "Replies when Tarek is mentioned",
    },
    longDescription: {
      en: "Avoid double reply issue when 'Tarek ke' is used",
    },
    category: "no prefix",
    usages: "",
    cooldowns: 3,
  },

  onStart: async function () {},

  onChat: async ({ event, api }) => {
    const message = event.body?.toLowerCase() || "";
    const mentionList = Object.entries(event.mentions || {});
    const targetUID = "100047994102529"; // Tarek's UID

    // Don't trigger here if "tarek ke" is already in message (let the other command handle it)
    if (message.includes("tarek ke") || message.includes("tarek কে") || message.includes("tarek k")) return;

    const isMentionedByTag = mentionList.some(([uid]) => uid === targetUID);
    const isMentionedByName = keywords.some(keyword => message.includes(keyword.toLowerCase()));

    if (isMentionedByTag || isMentionedByName) {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(randomReply, event.threadID, event.messageID);
    }
  }
};
