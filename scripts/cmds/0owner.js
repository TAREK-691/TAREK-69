const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "𝗧𝗔𝗥𝗘𝗞 𝗦𝗛𝗜𝗞𝗗𝗔𝗥",
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
    
    const a = "Yσωαι мσ";
    const b = "."; // Prefix
    const c = "—͞Ƭꫝʀᴇҡㅤi!";
    const e = "𝒎𝒂𝒍𝒆";
    const f = "𝟏𝟖 ±";
    const g = "𝑨𝒎𝒂𝒓 𝒃𝒐𝒔𝒔 𝒔𝒊𝒏𝒈𝒍𝒆 𝒂𝒌𝒕𝒂 𝒈𝒇 𝒌𝒉𝒖𝒋𝒆 𝒅𝒆";
    const h = "𝐃𝐢𝐩𝐥𝐨𝐦𝐚 𝐢𝐧 𝐂𝐢𝐯𝐢𝐥 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫𝐢𝐧𝐠 (𝐬𝐞𝐬𝐬𝐢𝐨𝐧-𝟐𝟎𝟐𝟑-𝟐𝟒)";
    const i = "𝑻𝒂𝒏𝒈𝒂𝒊𝒍";
    const d = "𝑇𝑎𝑟𝑒𝑘 𝑆ℎ𝑖𝑘𝑑𝑎𝑟";

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
