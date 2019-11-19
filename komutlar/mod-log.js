const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `Bu Komutu Kullanabilmek için "\`Yönetici\`" Yetkisine Sahip Olmalısın!`
    );

  let modlogs = message.mentions.channels.first();
  let sıfırla = db.fetch(`tc-modlogs_${message.guild.id}`);

  if (args[0] === "sıfırla") {
    if (!sıfırla) {
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(`❌ | Mod Log Kanalı Ayarlı Değil!`)
          .setColor("RED")
      );
      return;
    }

    db.delete(`tc-modlogs_${message.guild.id}`);
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`✅ | Mod Log Kanalı Başarıyla Sıfırlandı!`)
        .setColor("GREEN")
    );
    return;
  }

  if (!modlogs) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`📑 | Mod Log Kanalı Etiketlemelisin!`)
        .setColor("RED")
    );
  return;
  }

  db.set(`tc-modlogs_${message.guild.id}`, modlogs.id);
  const embed = new Discord.RichEmbed()
  .setDescription(`✅ Mod Log Kanalı Başarıyla ${modlogs} Olarak Ayarlandı!\n \nKanalı Sıfırlamak için **+modlog sıfırla** Yazabilirsiniz!`
    )
    .setColor("RED")
    .setTimestamp();
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mod-log", "modlog", "setmodlog"],
  permLevel: 0
};

exports.help = {
  name: "mod-log-ayarla",
  description: "Mod-Logu ayarlar.",
  usage: "mod-log-ayarla #kanal"
};