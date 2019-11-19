const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message,args) => {
  
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let kanal = message.mentions.channels.first();
let kontrol = await db.fetch(`pingResimliHGBB_${message.guild.id}`)
  
  if (args[0] === "kapat") {
    if(!kontrol) return message.channel.send(`:x: Resimli HGBB kapatmak için **Resimli HGBB kanalının** seçili olması lazım. Kullanım: \`$resimli-hgbb #kanal\``);
    
   db.delete(`pingResimliHGBB_${message.guild.id}`)
   message.channel.send(`:ballot_box_with_check: Resimli HGBB başarıyla kapatıldı.`);
  
    return
  }
  
if (!kanal) return message.channel.send(":x: Doğru bir kanal girmelisiniz, Kullanım `$yazılı-hgbb #kanal`");
 

   db.set(`pingResimliHGBB_${message.guild.id}`, kanal.id)
db.set(`m_${message.guild.id}`,"acik")
message.channel.send(`:ballot_box_with_check: Yazılı HGBB kanalı ${kanal} olarak ayarlandı.`);

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'resimli-hgbb',
  description: '',
  usage: '!resimli-hgbb #kanal'
};
 