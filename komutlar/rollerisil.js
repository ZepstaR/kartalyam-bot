const Discord = require("discord.js");
const a = require("../ayarlar.json");

exports.run = function(client, message, args) {
  if (message.author.id !== a.m3rt && message.author.id !== a.sahip) return message.channel.send("**Bu komut için bot sahibi olman gerek!**")


  message.channel
    .send(
      "**Sunucudaki rollerin silinme işlemini kabul ediyorsanız `10 saniye` içinde `evet` yazmalısınız**"
    )
    .then(mess => mess.delete(10000));

  message.channel
    .awaitMessages(response => response.content === "evet", {
      max: 1,
      time: 10000,
      errors: ["time"]
    })
    .then(collected => {
      message.guild.roles.map(roles => roles.delete());
  message.channel
    .send("**Sunucuda ki rolleri silme işlemi başarılı!**")
    .then(m => m.delete(10000));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["", ""],
  permLevel: 0
};

exports.help = {
  name: "rollerisil",
  description: "",
  category: "sahip",
  usage: ""
};
