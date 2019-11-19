const Discord = require("discord.js"),
  arraySort = require("array-sort"),
  table = require("table");

exports.run = async (client, message, args, tools) => {
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send(
      "Maalesef, davetiyeyi görüntülemek için uygun izne sahip değilim!!"
    );
  });
  invites = invites.array();

  arraySort(invites, "Davetler", { reverse: true });

  let possibleInvites = [["Kullanıcılar", "Davetler"]];
  invites.forEach(function(invite) {
    possibleInvites.push([invite.inviter.username, invite.uses]);
  });

  const embed = new Discord.RichEmbed()
    .setColor(0xcb5a5e)
    .addField(
      "Liderler Sıralaması",
      `\`\`\`${table.table(possibleInvites)}\`\`\``
    );
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["top"],
  permLevel: 0
};

exports.help = {
  name: "leaderboard"
};
