const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
   const dbengel = require('quick.db')
          const i = await dbengel.fetch(`engel_${message.channel.id}`); // \\
   if (i == 'acik') return message.reply("Burada Komut Kullanımı Kapalı")
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');

  if (args[0] == 'kapat') {
    db.set(`botkoruma_${message.guild.id}`, false)  
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Anti Raid Kapatıldı. <a:onaylandi:632947947121934346>  ').setColor("Black"));
  };
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["anti-raid-kapat"],
    permLevel: `2`,
}

exports.help = {
    name: 'anti',
    description: 'Davet kanalını ayarlar.',
    usage: 'davet-kanal-ayarla <#kanal>',
}
   

