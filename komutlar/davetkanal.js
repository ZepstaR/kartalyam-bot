const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/dKanal.json", "utf8"));

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  

    let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;


  
    if (!channel) {
    
     
     return message.channel.send(`<:hata:637685816197382165> Lütfen komutla birlikte bir kanal etiketleyiniz.`)
    }

      if(args[0] === 'kapat') {
      
   if (db.has(`dKanal_${message.guild.id}`) === true) {
   
     db.delete(`dKanal_${message.guild.id}`)
     
       

     message.channel.send(`<:rf_check:642475879615823882> Davet Sistemi başarıyla kapatıldı.`)
     return
}
 
 
     message.channel.send(`<:hata:637685816197382165> Davet Sistemi sistemi zaten kapalı.`)
    return
  
  }
  
    db.set(`dKanal_${message.guild.id}`, channel.id)
  

    message.channel.send(`<:moly_check:637743464381153321> Davet kanalı **başarıyla** ayarlandı.`)

}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-kanal-belirle', 'davet-kanal'],
    permLevel: 4,
    kategori: "ayarlar",
}

exports.help = {
    name: 'davet-kanal-ayarla',
    description: 'Davet kanalını ayarlar.',
    usage: 'davet-kanal-ayarla <#kanal>',
}