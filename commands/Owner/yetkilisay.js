const Command = require("../../base/Command.js");
let serverSettings = require("../../models/serverSettings");

class Yetkilisayy extends Command {
    constructor(client) {
        super(client, {
            name: "yetkilisay",
            usage: ".ysay",
            category: "Owner",
            description: "Sunucudaki yetkilileri sayar.",
            aliases: ["ysay", "yetkili-say"]
        });
    }


    async run(message, args, level) {
        let server = await serverSettings.findOne({
            guildID: message.guild.id
        });
        if(!server.BotOwner.includes(message.author.id) && !server.GuildOwner.includes(message.author.id)) return
        let roles = message.guild.roles.cache.get(`${server.BotCommandRole}`); 
        let üyeler = [...message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position && (uye.presence && uye.presence.status !== "offline") && !uye.voice.channel).values()]
         var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
         if(üyeler.length == 0) return message.channel.send("çevrimiçi yetkili olup seste olmayan yetkili yok")
         const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('sesolmayan').setLabel("Seste Olmayan Yetkililer").setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('sesteolmayandm').setLabel("Dm Duyuru").setStyle('SECONDARY'));
         message.channel.send(`Online olup seste olmayan <@&${roles.id}> rolündeki ve üzerinde ki yetkili sayısı: ${üyeler.length ?? 0} `)
            message.channel.send(``+ üyeler.map(x => "<@" + x.id + ">").join(",") + ``)
            var filter = (button) => button.user.id === message.author.id;
        const collector = ysay.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button, user) => {
            if (button.customId === "sesolmayan") {
                await button.reply({ content: `${emojis.onay} Seste olmayan yetkililer etiketlenmiştir!`, ephemeral: true })
                button.channel.send({ content: `Sesde olmayan yetkililer ; \n\n${sesdeolmayanlar.map(yetkili => `${yetkili}`).join(', ')}` })
            }
            if (button.customId === "sesteolmayandm") {
                await button.reply({ content: `${emojis.onay} Seste olmayan yetkililere dm üzerinden mesaj gönderilmiştir!`, ephemeral: true })
                message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(aris.registerHammer)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").forEach(user => { user.send(`Merhabalar. **${message.guild.name}** sunucusunda ses aktifliğinizi artırmak ve yetkinizi yükseltmek için seslere giriniz. Müsait değil isen **Sleep Room** kanalına afk bırakabilirsin.`).catch(err => { message.channel.send(`${user} isimli yetkiliye özel mesajları kapalı olduğu için mesaj atamıyorum. Lütfen seslere geçebilir misin ? Müsait değilsen **Sleep Room** kanalına geçebilirsin.`) }) })
            }
        })
    }
}

module.exports = Yetkilisayy
