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
  "Boss er moto rare animal onno koi nai! 🦄",
"Boss এর প্রেমের গরম ঢেউয়ে ডুবে যেও না! 🌊🔥",
"Boss কে ডাকো না, ও এখন প্রেমে ডুবে আছে! 🌊💕",
  "Tag dile boss er phone vibrate hoye jabe! 📳",
];

const keywords = ["tarek"];

module.exports = {
  config: {
    name: "mentionTarek",
    version: "1.6",
    author: "T A N J I L",
    shortDescription: {
      en: "Replies when Tarek is mentioned by name or tag",
    },
    longDescription: {
      en: "Automatically responds if someone types Tarek's name or tags him.",
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

    const isMentionedByTag = mentionList.some(([uid]) => uid === targetUID);
    const isMentionedByName = keywords.some(keyword => message.includes(keyword));

    if (isMentionedByTag || isMentionedByName) {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(randomReply, event.threadID, event.messageID);
    }
  }
};
