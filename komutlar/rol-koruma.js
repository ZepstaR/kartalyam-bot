const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
         if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` <a:dikkat:632947931808268290> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

  
if(args[0] === "kapalı") {
  
      let embed4 = new Discord.RichEmbed()
  .setColor('RED')
.setDescription('Rol Koruma sistemini başarıyla Devre dışı bıraktım.. <a:onaylandi:632947947121934346> ')
  message.channel.send(embed4)   

   
 db.delete(`aktifs_${message.guild.id}`)    
  return

}
  
if(args[0] === "açık") {
    
   let embed1 = new Discord.RichEmbed()
  .setColor('GREEN')
.setDescription('Rol Koruma sistemini başarıyla Aktif ettim.  <a:onaylandi:632947947121934346> ')
db.set(`aktifs_${message.guild.id}`, message.guild.id)   
  return 
}
  
 message.channel.send('bir değer belirtmelisin. `$rol-koruma açık`,`$rol-koruma kapalı`') 
      
  //Zepp
  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'rol-koruma',
  description: 'taslak', 
  usage: 'rol-koruma'
};
