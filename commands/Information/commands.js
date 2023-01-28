const Command = require("../../base/Command.js");
const Discord = require("discord.js")
class Komutlar extends Command {
    constructor(client) {
        super(client, {
            name: "komutlar",
            aliases: ["komutlar", "commands"]
        });
    }

    async run(message, args, data) {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;

      const row =  new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId('commandshelp')
        .setPlaceholder('Komutlari Öğrenmek İçin Menüyü Açın 🎉')
        .addOptions([
            {
                label: 'Üye Komutları',
                description: 'Genel tüm komutları içerir.',
                value: 'üye',
            },
            {
                label: 'Teyit Komutları',
                description: 'Genel tüm kayıt komutlarını içerir.',
                value: 'teyit',
            },
            {
                label: 'Yetkili Komutları',
                description: 'Genel tüm yetkili komutlarını içerir.',
                value: 'yetkili',
            },
            {
                label: 'Yetenek ve diğer komutlar',
                description: 'Genel tüm yetenek komutlarını içerir.',
                value: 'yetenek',
            },
            {
                label: 'Yönetim Komutları',
                description: 'Genel tüm yönetim komutlarını içerir.',
                value: 'yönetim',
            },
            {
                label: 'Kurucu Komutları',
                description: 'Genel tüm kurucu komutlarını içerir.',
                value: 'kurucu',
            }
        ]),
      );

     message.channel.send({ content: `
**Merhaba!** Yardım almak ister misin?
Aşağıda bulunan menüden yardım almak istediğiniz kategoriyi seçin. :tada:`, components: [row]  })
    }
}

module.exports = Komutlar;
