const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== "group") {
        var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(Durm)
      .setTimestamp()
      .addField('**❯ <a:hyper:632947938481405985> Ad:**', message.author.username + '#' + message.author.discriminator)
      .addField('**❯ <a:hyper:632947938481405985> ID:**', message.author.id)
      .addField('**❯ <a:hyper:632947938481405985> Kayıt tarihi:**', message.author.createdAt)
      .addField('**❯ <a:hyper:632947938481405985> Durum:**', durm)
      .addField('**❯ <a:hyper:632947938481405985> Şu an oynadığı oyun:**', message.author.presence.game ? message.author.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('**❯ <a:hyper:632947938481405985> BOT mu?**', message.author.bot ? '\n Evet' : 'Hayır')
      .addField('**❯ <a:hyper:632947938481405985> Yapımcım:  ZepstaR Root ')
      console.log("$kullanıcıbilgim komutu " + message.author.username + " tarafından kullanıldı.")
      return message.channel.sendEmbed(kullanicibilgimk);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kullanıcı bilgi', 'kb'],
  permLevel: 0
};

exports.help = {
  name: 'profilim',
  description: 'Komutu kullanan kişi hakkında bilgi verir.',
  usage: 'profilim'
};
