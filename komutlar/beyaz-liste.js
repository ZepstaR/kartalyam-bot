const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    if( message.author.id != ayarlar.sahip) {
        return message.reply("Bu komutu kullanabilmek için sahibim olmalısın")
    } else {
        let kisimq = args[0]

        if(!kisimq) {
            const hata = new Discord.RichEmbed()
            .setColor("red")
            .setTitle(":warning: Lütfen bir kullanıcı id si belirtiniz.")
            return message.channel.send(hata)
        };

        db.delete(`kullanicikaraliste_${kisimq}`)

        const basari = new Discord.RichEmbed()
        .setTitle('0x36393E')
        .setTitle("Kartalya | Beyaz liste")
        .setDescription(kisimq + "Adlı kullanıcı beyaz listeye eklendi")
        return message.channel.send(basari)
    };

};

exports.conf = {
    enbabled: true,
    guildOnly: false,
    aliases: [],
    permlevel: 5
};


exports.help = {
    name: "beyaz-liste"
};