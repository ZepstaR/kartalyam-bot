const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` <a:iptal:626445972620443648> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  
let kontrol =  await db.fetch(`reklamisim_${message.guild.id}`)
  
if(!kontrol) return message.reply('Sanırım bu özellik zaten kapalıymış :slight_smile:')

message.channel.send(`Kullanıcı Adında Şu Kelimeleri İçeren Herkesi Sunucuya Katıldığı Anda Banlayacağım. 
**discord,Davet,invite,join**`)  
  

 db.delete(`reklamisim_${message.guild.id}`) 
  
  
//CodEming/ft.Yasin..  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'reklamisimbankapa',
  description: 'taslak', 
  usage: 'reklamisimbankapa'
};
