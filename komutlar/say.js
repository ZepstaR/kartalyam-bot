exports.run = function(client, message, args) {
        message.channel.send("**<a:reboot:632947934509400085> Güncel Kişi Sayısı :** \n ** İşte Güzel sunucumuzun Kişi sayısı  -> <a:reboot:632947934509400085> **" + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() ); 
    };

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

module.exports.help = {
  name: 'say',
  description: '',
  usage: 'kişi-sayısı'
};
//techno bot
