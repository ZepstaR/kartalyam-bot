const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip && ayarlar.m3rt) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


//// GELL GİTT/////

//////////////////////////////
client.on("message", message => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (
    message.content === "$gel" &&
    message.member.hasPermission("ADMINISTRATOR")
  ) {
    const channel = message.member.voiceChannel;
    channel
      .join()
      .then(connection => message.channel.send("Bot Odaya Girdi!"))
      .catch(console.error);
  }
  if (
    message.content === "$git" &&
    message.member.hasPermission("ADMINISTRATOR")
  ) {
    const channel = message.member.voiceChannel;
    channel
      .leave()
      .then(connection => message.channel.send("Bot Odaya Çıktı!!"))
      .catch(console.error);
  }
});

////////////////////////////////

//// OTOROL ////

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otok_${member.guild.id}`);
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let mesaj = db.fetch(`otomesaj_${member.guild.id}`);
  if (!kanal) return;

  if (!mesaj) {
    client.channels
      .get(kanal)
      .send(
        ":loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber `" +
          member.guild.memberCount +
          "` Kişiyiz! Hoşgeldin! `" +
          member.user.username +
          "`"
      );
    member.addRole(rol);
    return;
  }

  if (mesaj) {
    var mesajs = await db
      .fetch(`otomesaj_${member.guild.id}`)
      .replace("-uye-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`);
    member.addRole(rol);
    client.channels.get(kanal).send(mesajs);

    //CodEming /Yasin..
  }
});

/// oto bitti ////

/// ROL KORUMA ///

client.on("roleDelete", async role => {
  let ozellik = await db.fetch(`aktifs_${role.guild.id}`);

  if (!ozellik) return;

  role.guild.createRole({
    name: role.name,
    color: role.color,
    position: role.position,
    permissions: role.permissions
  });
  //Kartalya
});

//// KORUMA BITTI ///

/// EMOJI ILE ROL //

var Eisim = ["onaylandim"]; //Emoji adı.
var Risim = ["Onaylı Üye"]; //Rol adı.

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "rol onaylı-üye")) {
    if (!msg.channel.guild) return;
    for (let n in Eisim) {
      var emoji = [msg.guild.emojis.find(r => r.name == Eisim[n])];
      for (let i in emoji) {
        msg.react(emoji[i]);
      }
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in Eisim) {
    if (reaction.emoji.name == Eisim[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == Risim[n]);
      reaction.message.guild
        .member(user)
        .addRole(role)
        .catch(console.error);
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in Eisim) {
    if (reaction.emoji.name == Eisim[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == Risim[n]);
      reaction.message.guild
        .member(user)
        .removeRole(role)
        .catch(console.error);
    }
  }
});

/// BITTI ///

/// EMOJI ROL ///

var emojiname = [""]; //Sunucuda bulunan emojinin adı
var rolename = [""]; // Sunucudaki rolün adi

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "rol deste")) {
    if (!msg.channel.guild) return;
    for (let n in emojiname) {
      var emoji = [msg.guild.emojis.find(r => r.name == emojiname[n])];
      for (let i in emoji) {
        msg.react(emoji[i]);
      }
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in emojiname) {
    if (reaction.emoji.name == emojiname[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);
      reaction.message.guild
        .member(user)
        .addRole(role)
        .catch(console.error);
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!reaction.message.channel.guild) return;
  for (let n in emojiname) {
    if (reaction.emoji.name == emojiname[n]) {
      let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);
      reaction.message.guild
        .member(user)
        .removeRole(role)
        .catch(console.error);
    }
  }
});
/// bitti ///

/// MC-AT SAYAÇ ///

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`sskanal_${member.guild.id}`);
  if (!kanal) return;
  let sayaç = await db.fetch(`ssayı_${member.guild.id}`);
  let hgmsj = await db.fetch(`sayachgmsj_${member.guild.id}`);
  let bbmsj = await db.fetch(`sayacbbmsj_${member.guild.id}`);
  let sonuç = sayaç - member.guild.memberCount;
  ///....

  ///....
  if (!hgmsj) {
    client.channels
      .get(kanal)
      .send(
        ":loudspeaker: :inbox_tray: Kullanıcı Katıldı! `" +
          sayaç +
          "` Kişi Olmamıza `" +
          sonuç +
          "` Kişi Kaldı `" +
          member.guild.memberCount +
          "` Kişiyiz! `" +
          member.user.username +
          "`"
      );
  }

  if (hgmsj) {
    var mesajs = await db
      .fetch(`sayachgmsj_${member.guild.id}`)
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);

    client.channels.get(kanal.id).send(mesajs);
    return;
  }
});
client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`skanal_${member.guild.id}`);
  let sayaç = await db.fetch(`ssayı_${member.guild.id}`);
  let hgmsj = await db.fetch(`sayachgmsj_${member.guild.id}`);
  let bbmsj = await db.fetch(`sayacbbmsj_${member.guild.id}`);
  let sonuç = sayaç - member.guild.memberCount;
  ///....

  if (!kanal) return;
  if (!sayaç) return;
  if (member.bot) return;
  ///....

  if (!bbmsj) {
    client.channels
      .get(kanal)
      .send(
        ":loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. `" +
          sayaç +
          "` Kişi Olmamıza `" +
          sonuç +
          "` Kişi Kaldı `" +
          member.guild.memberCount +
          "` Kişiyiz! a:iptal:626445972620443648>  `" +
          member.user.username +
          "`"
      );
    return;
  }

  if (bbmsj) {
    var mesajs = await db
      .fetch(`sayacbbmsj_${member.guild.id}`)
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);

    client.channels.get(kanal).send(mesajs);
  }
});

/// MC-AT SAYAÇ BITTI ///

/// ÇALISAN MODLOG ////

client.on("messageDelete", async message => {
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("》Mesaj Silindi《")
    .addField(" 🔹 Silen Kullanıcı ", `<@!${message.author.id}>`)
    .addField(" 🔹 Silinen Mesaj ", `${message.content}`)
    .addField(" 🔹 Kanal İsmi ", `<#${message.channel.id}>`)
    .setFooter("Mod-Log Sistemi");
  modlogkanal.sendEmbed(embed);
});

client.on("guildBanAdd", async message => {
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("RED")

    .setTitle("》Suncudan Yasaklama《")
    .addField(" 🔹 Yasaklanan Kullanıcı ", `<@!${message.user.id}>`)
    .setThumbnail(message.user.avatarURL)
    .setFooter("Mod Log Sistemi");
  modlogkanal.sendEmbed(embed);
});

client.on("channelCreate", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("》Metin Kanalı Oluşturuldu《")
      .addField(" 🔹 Kanal İsmi ", `${channel.name}`)
      .addField(" 🔹 Kanal ID ", `${channel.id}`)
      .setFooter(`Mod-Log Sistemi`);
    modlogkanal.send({ embed });
  }

  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("》Ses Kanalı Oluşturuldu《")
      .addField(" 🔹 Kanal İsmi ", `${channel.name}`)
      .addField(" 🔹 Kanal ID ", `${channel.id}`)
      .setFooter(`Mod-Log Sistemi`);

    modlogkanal.send({ embed });
  }
});
client.on("channelDelete", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("》Metin Kanalı Silindi《")
      .addField(" 🔹 Kanal İsmi ", `${channel.name}`)
      .addField(" 🔹 Kanal ID ", `${channel.id}`)
      .setFooter(`Mod-Log Sistemi`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("》Ses Kanalı Silindi《")
      .addField(" 🔹 Kanal İsmi ", `${channel.name}`)
      .addField(" 🔹 Kanal ID ", `${channel.id}`)
      .setFooter(`Mod-Log Sistemi`);
    modlogkanal.send({ embed });
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`tc-modlog_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(
    db
      .fetch(`tc-modlog_${oldMsg.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("》Mesaj Düzenlendi《")
    .addField(" 🔹 Kullanıcı İsmi ", `<@!${oldMsg.author.id}>`)
    .addField(" 🔹 Eski Mesaj", `  ${oldMsg.content}  `)
    .addField(" 🔹 Yeni Mesaj", `${newMsg.content}`)
    .setThumbnail(oldMsg.author.avatarURL);
  kanal.send(embed);
});

/// MODLOG BITTI ///

/// YARDİM ///

var komutlar = fs.readFileSync("Sistemler/komutlar.txt", "utf8");

client.on("message", message => {
  if (message.content === "$yardım" || message.content === "$komutlar") {
    const embed = new Discord.RichEmbed()
      .setAuthor("Kartalya - Komut listesi:", client.user.avatarURL)
      .setColor("RANDOM")
      .setDescription(komutlar);
    return message.channel.send(embed);
  }
});

/// YARDIM ///

/// SLOW MODE ///

client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms = require("parse-ms");
  let zaman = db.fetch(`${msg.guild.id}.slowmode`);
  if (zaman === undefined) zaman = 0;
  let timeout = zaman;
  let dakdest = await db.fetch(`slowmodee_${msg.author.id}`);

  if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
    let time = ms(timeout - (Date.now() - dakdest));
    msg.delete();
    msg.channel
      .send("**Bu kanalda yavaş mod açık mesaj atmadan beklemen gerek!**")
      .then(message => message.delete(2000));
  } else {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      if (msg.content.length > 0) {
        db.set(`slowmodee_${msg.author.id}`, Date.now());
      }
    }
  }
});

/// SLOW BITTI ///

/// SELF BOT ///

client.on("message", message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`);
  if (!antiraid) return;
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes(":warning: | `Self` botlar susturulacak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send(":warning: | `Self` botlar susturulacak.");
            aut.forEach(a => {
              message.channel.overwritePermissions(a, {
                SEND_MESSAGES: false
              });
            });
            message.channel.send(
              client.emojiler.evet + " | `Self` botlar susturuldu."
            );
          } else return;
        }
      });
    });
  });
});

/// SELF BITTI ///


/// PARTNER ///

client.on("guildCreate", async guild => {
  const girismesaj = [
    " :signal_strength: https://UygunPanelim.com :signal_strength: - Türkiye nin En Ucuz Bayi & Kişisel SMM Paneli - Hemen Discordumuza Gelin ve Bakiye Yüklemesinde %10 Daha Fazla Kazanın. -1K Takipçi 7TLden Başlayan Fiyatlar ile Türkiyenin En Ucuz Paneli Olmaktan Gurur Duyuyoruz. - - https://discord.gg/RSszfmA -"
  ];

  guild.owner.send(girismesaj);
  console.log(`LOG: ${guild.name}. sunucuya katıldım!`);
});

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });

  console.log(`${guild.name} with invite: `);
});

/// Bitti ///

/// LEVEL BOT.JS ///

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    //CodEming/Ft.Yasin..
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );

        //zepo
      }
      //zepo
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Seviyesi **" +
                rollvl +
                "** e ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }

  //ZEPST
});

//// BOT JS  level ///

//// SAHIBIM BELIRDI ////

client.on("message", async msg => {
  if (msg.author.id !== ayarlar.sahip) return;
  let kontrol = await db.fetch(`sahipp_${msg.author.id}`);
  if (!kontrol) {
    db.set(`sahipp_${msg.author.id}`, 1);
  }
  //Aşağıdaki "mesaj" kaç mesajda bir atacağını belirtir.
  let mesaj = "50";

  if (kontrol >= mesaj) {
    let codeming = new Discord.RichEmbed()
      .setTitle(
        " <a:dikkat:632947931808268290> Bu İnanılmaz! <a:dikkat:632947931808268290> "
      )
      .setDescription(
        " <a:onaylandi:632947947121934346> Geldi işte! | İşte burda..!,Karşınızda sahibim!.." +
          msg.member.user.username +
          " Uzaklardan bir ışık bu tarada doğru yaklaşıyor!"
      )
      .setColor("RANDOM");
    msg.channel.send(codeming).then(msg => msg.delete(9100));
    db.delete(`sahipp_${msg.author.id}`);
    return;
  }

  db.add(`sahipp_${msg.author.id}`, 1);
});

/// bitti ///

/// ISIM REKLAM BAN ///

client.on("guildMemberAdd", async member => {
  let kontrol = await db.fetch(`reklamisim_${member.guild.id}`);
  if (!kontrol) return;
  let s = member;
  if (
    s.includes("join") ||
    s.includes("discord") ||
    s.includes("invite") ||
    s.includes("davet")
  ) {
    //ZepstaR
    member.guild.ban(member, { reason: "Kartalya isim reklam sistemi!" });
  }
});

/// bitti ////

/// RANDOM MSG ///

client.on("guildCreate", async function(guild) {
  if (guild.channels.filter(c => c.type === "text").array()[0]) {
    guild.channels
      .filter(c => c.type === "text")
      .random()
      .send("$yardım");
  }
});

//// BITTI ///

/// REKALM KICK ///

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let kullanici = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam kick sistemi`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacak`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Reklam ban sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

/// kick bitti ///



// gold //

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 600000
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = db.fetch(`gold_${msg.author.id}`)
          if (i == 'gold') {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
   msg.channel.send('<a:golduyes:620284808077246533> | **Bir gold üye buraya ışınlandı!**')
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});
///
client.login(ayarlar.token);
