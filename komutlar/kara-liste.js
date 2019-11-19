const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = (client, message, args) => {
    if( message.author.id !=ayarlar.sahip) {
        return message.reply("Bu komutu kullanabilmek için sahibim olman gerek")
    } else {
        let kisimq = args[0]

        if(!kisimq) {
            const hata = new Discord.RichEmbed()
            .setTitle(":warning:  Bir kullanıcı belirtmelisin")
            return message.channel.send(hata)
        }

        db.set(`kullanicikaraliste_${kisimq}`, 'aktif')
        const basari = new Discord.RichEmbed()
        .setTitle("Kartalya | Kara liste")
        .setColor('0x36393E')
        .setDescription(":white_check_mark: Karaliste`" + kisimq + "`Kullanıcısı için başarıyla aktif edildi !")
        client.channels.get("").send(basari)
    }

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permlevel: 5
};


exports.help = {
    name: "kara-liste"
}