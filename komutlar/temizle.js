const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
  
let sayı = args[0] 
  
///////////////////////  

 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Mesajları silebilmen için Mesajları Yönet yetkisine sahip olmalısın.')
  
 if(!sayı) return message.reply('En Az 1 - 400 Arasında Bir Tam Sayı Değeri Girmelisiniz.') 
  
 if(sayı > 400) return message.channel.send('En Fazla 400 Mesaj Silebilirsiniz!')
 
 if(!isNaN(args[1])) return message.reply('Mesajları Silebilmem İçin Bir Tamsayı Değeri Girmelisiniz Örnek $Sil 25 :cry:') 
 
 ///////////////////////  
//CodEming /ft.Yasin..  
  if(sayı > 100) {
    message.channel.bulkDelete('100')
    let sonuç = sayı - 100
    message.channel.bulkDelete(sonuç)
    message.reply(sayı + ' Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:')
    return
  }

  if(sayı > 200) {
    message.channel.bulkDelete('100')
    message.channel.bulkDelete('100')
    let sonuç = sayı - 200
    message.channel.bulkDelete(sonuç)   
    message.reply(sayı + ' Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:')
    return
  }
  
  if(sayı > 300) {
    message.channel.bulkDelete('100')
    message.channel.bulkDelete('100')
    message.channel.bulkDelete('100')
    let sonuç = sayı - 300
    message.channel.bulkDelete(sonuç)   
    message.reply(sayı + ' Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:')
    return
  }
 ///////////////////////  

  message.channel.bulkDelete(sayı)

//CodEming /ft.Yasin..
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'taslak', 
  usage: 'sil'
};
