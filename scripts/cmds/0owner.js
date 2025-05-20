const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "〲 T A N J I L ツ",
    longDescription: "info about bot and owner",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "http://remakeai-production.up.railway.app/Remake_Ai/Nyx_Remake_1746734548542.jpg";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    
    const a = "Ehrhr";
    const b = "."; // Prefix
    const c = "Tarek";
    const e = "Male";
    const f = "𝟏𝟖 ±";
    const g = "𝐒𝐢𝐧𝐠𝐥𝐞";
    const h = "𝐈𝐧𝐭𝐞𝐫 𝟐";
    const i = "𝐃𝐡𝐚𝐤𝐚";
    const d = "N/A";

    message.reply({ 
      body: `᯽ ${name} ᯽

᯽Bot's Name: ${a}
᯽ Bot's prefix: ${b}  
᯽Owner: ${c}
᯽ Gender: ${e}
᯽ Owners Messenger: ${d}
᯽ Age: ${f}
᯽ Relationship: ${g}
᯽Class: ${h}
᯽ Basa: ${i}`,
      mentions: ment,
      attachment: attachment
    });
  }
};
