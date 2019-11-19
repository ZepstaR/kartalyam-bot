const db = require("quick.db")
const Discord = require('discord.js');
const pingVeri = require('node-superfetch');
const Canvas= require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
 const canvas = Canvas.createCanvas(1920, 1080)
 const ctx = canvas.getContext('2d');
module.exports = async (member,client) => { 
let pingBilgi = db.fetch(`pingResimliHGBB_${member.guild.id}`)
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/632811696917839882/632886452035780628/Logopit_1570961754569.jpg');

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.font = `italic 130px Sans Serif`;
  ctx.fillStyle = `#ffffff`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.tag.toUpperCase()}`, 960 , 1000);
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL
  const { body } = await pingVeri.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  ctx.drawImage(avatar, 1438, 0, 450,450 );
  const pingDosya = new Discord.Attachment(canvas.toBuffer(), "PingWasHere.jpg");
  member.guild.channels.get(pingBilgi).send(pingDosya)
  
    };