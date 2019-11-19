const Discord = require('discord.js')
exports.run = async (client, message, args) => {

  let commandSize = 0
  let embed = new Discord.RichEmbed()
    .setColor("#FF0000")
  if (!args[0]) {
    
    
    
    let commands = client.commands.filter(cs => cs.help.category == 'sahip')
    
    commands = commands.map(cmd => cmd.help.name)
    
    if (commands.length <= 0) return
    
    commandSize += commands.length
    
    embed.addField('**Sahip Komutları**', `\`${commands.sort().join("`, `")}\``)
    embed.setFooter(client.user.tag, client.user.avatarURL)
    embed.setThumbnail(client.user.avatarURL)
    embed.addBlankField(true)

    return message.channel.send(embed)
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sahipkomutları"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'sahip',
    category: 'sahip',
    description: 'Sahip Komutlarının Listesi',
    usage: 'sahip'
  };
   