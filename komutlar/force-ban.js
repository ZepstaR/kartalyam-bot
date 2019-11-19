const Discord = require('discord.js');
	exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	
    let member = args[0];
	if (isNaN(member)) return message.reply("**Lütfen bir kullanıcı ID'si gir!");

	const sebep = args.splice(1, args.length).join(' ') || `**Sebep belirtilmemiş.**`;

	message.guild.ban(member, sebep+" | Yetkili: "+message.author.tag).then(() => {
		message.channel.send(`\`${member.name}\`, Sunucudan yasaklandı! Sebebi ise: **${sebep}** || Kullanıcı ID'si: **${member}`);
		    
  })
    client.users.get(member).send(`**${message.guild.name}** adlı sunucudan **${message.author.tag}** tarafından yasaklandın!\n**Yasaklanma sebebin:** ` + "`" + sebep + "`")
			.catch((err) => {
				console.log(err);
			});
	

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'forceban',
	category: '',
	description: '',
	usage: 'forceban '
};