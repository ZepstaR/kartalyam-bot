const Discord = require("discord.js");

exports.run = function(client, message, args) {
  message.delete()
  const mesajlar = [
    "+ Sinemada on dakika ara dedi, aradım aradım açmadı.",
    "+ Röntgen Filmi çektirdik , yakında sinemalarda.",
    "+ Yeni yapılmış resimlere ne denir?\n- **nev**resim",
    "+ En ihtiyaç duyulan arı?\n- Baş**arı**",
    "+ Gitarı getirde biraz şarkı söyleyelim.\n - Abi arı sokmasın ama?",
    "+ Geçen bi taksi çevirdim. Hayla dönüyor.",
    "+ Bugünler de gözlerim çok **kız**arıyor ya!\n- Valla bende arıyorum",
    "+ Acıkan var mı beyler?\n- Yok abi tatlı kan var",
    "+ İshal olmuş böceğe ne denir?\n- **CIRCIR** Böceği",
    "+ Padişah tahta çıkınca ne yapmış?\n- Tahtayı yerine takmış",
    "+ Tebrikler kazandınız, şimdi tencere oldunuz!",
    "+ Kaba kuvvet uyguluma , kap kırılabilir.",
    "+ Asker, adın ne?\n- Emre**dersiniz** komutanım!",
    "+ Yahu sen nasıl bir kulsun?\n- Endoplazmik Reti**kul**um",
    "+ Bizim CD sürücümüz ehliyeti nerden almış acaba ?",
    "+ Ben hikaye yazarım, **Ebru Destan**",
    "+ Ben arabayı kullanıyodum, Leonardo da Vinci",
    "+ Mercedes namaz kılmıyor ama Renault **Clio**",
    "+ Bebeğiniz oldu. Gözünüz aydın kulağınız manisa",
    "+ Yılan'dan korkma, yılmayandan kork.",
    "+ Denizaltı'nın bir üst modeli nedir?\n- Deniz**yedi**",
    "+ Ben kahve içiyorum, **Nurgün Yeşilçay**",
    "+ Bak şu karışıdaki uçak pisti, ama bir türlü temizlemediler.",
    "+ Adamın biri kalemi yere atmış düşmemiş neden?\n- Çünkü pilot kalemmiş.",
    "+ Derste çocuğun biri kalemini yemiş neden?\n- Çünkü dolma kalemmiş.",
    "+ Yemeğin suyuna kim bandı?\n- Koli bandı.",
    "+ İneklerin sevmediği element?\n- **Az**ot",
    "+ Top ağlarda, ben ağlamaz mıyım?",
    "+ Binanın biri **yanmış**, diğeri de **düz**.",
    "+ Kadının biri güneşte **yanmış**, ay da **düz**.",
    "+ Ben Yedigün içiyorum sen de Onbeşgün iç.",
    "+ Türkiye'nin en yeni şehri neresidir?\n- **Nevşehir**",
    "+ Türkiye'nin 1. ili hangisidir?\n- **Van**",
    "+ Masa için hangi örtü kullanılmaz?\n- **Bitki Örtüsü**",
    "+ Sana bir terlik yapıyım, terlerini koyarsın oraya.",
    "+ Sana bi kıllık yapayım, kıllarını koyarsın",
    "+ Rıdvan'ın bir büyüğünün ismi nedir?\n- Rıd**two**",
    "+ Oğlumun adını **Mafya Babası** koyarsam mafya babası olmuş olur muyum?",
    "+ Zenginler et, fakirler hayalet yer",
    "+ **Seven** unutmaz olum **eight** unutur",
    "+ Baraj dendi mi akan sular durur",
    "+ Şeytan kapıyı nasıl çalar?\n- **Din** den dön!!"
  ];
  let rastgelemesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];
  let e = new Discord.RichEmbed()
    .addField(`**Total espri sayısı:** ${mesajlar.length}`, `${rastgelemesaj}`)
    .setColor("RANDOM");
  message.channel.send(e);
 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["", ""],
  permLevel: 0
};

exports.help = {
  name: "espri",
  description: "Dünyanın en bayat esprileri bir komut ile ayağının altında!",
  usage: "espri"
};