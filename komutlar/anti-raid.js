const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("Lütfen kanalı etiketle!")
    }

  
    db.set(`botkoruma_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Anti-Raid açıldı. Artık anti-raid mesaj kanalı : ${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})/// ZepstaR Root 💜
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['anti-raid'],
    permLevel: `sa`,
}

exports.help = {
    name: 'antiraid',
    description: 'Davet kanalını ayarlar.',
    usage: 'antiraid',
}