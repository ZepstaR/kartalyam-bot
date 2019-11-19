const Discord = require("discord.js");

exports.run = function(client, message, args) {
  let m = args.slice(0).join(" ");
  if (!m)
    return message.channel
      .send("**Bir espri yaz!**")
      .then(msg => msg.delete(10000));
  client.users
    .get("343496705196556288")
    .send(`**${message.author.tag}**' den yeni bir espri önerisi!\n${m}`);
  message.channel
    .send(
      `**Teşekkürler** ${message.author}**!** Espri önerin bot sahibine iletildi!`
    )
    .then(sil => sil.delete(20000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["", ""],
  permLevel: 0
};

exports.help = {
  name: "espriöner",
  description: "Espri önerisi yapmak istersen bu komuta başvur!",
  usage: "espriöner <espri>"
};
