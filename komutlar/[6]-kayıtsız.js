const { MessageEmbed } = require('discord.js')//
const db = require('quick.db')//
const moment = require('moment')//
const settings = require('../managment/settings.json')//
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(settings.roller.teyitcirol) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${settings.roller.teyitcirol}> yetkisine sahip olmalısın.`)
.setColor(settings.renk.kirmizi))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli Bir Kullanıcı Etiketlemelisin !`).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}))

if(message.member.roles.highest.position <= member.roles.highest.position) return 
if(member.manageable)  member.setNickname(member.user.username).catch();
member.roles.add(settings.roller.kayıtsızrol);
member.roles.cache.forEach(r => {
member.roles.remove(r.id)});
message.channel.send(new MessageEmbed().setDescription(`${member} Adlı Kullanıcı ${message.author} Tarafından Kayıtsız'a Atıldı !`)).then(msg => msg.delete({timeout: 4000}))

message.react(settings.durumlar.dogru)

client.channels.cache.get(settings.kanallar.kayıtsızlog).send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${member} Adlı Kullanıcı ${message.author} Tarafından Kayıtsız'a Atıldı !`)
.setColor(settings.renk.kirmizi))

} 

exports.conf = { enabled: true, guildOnly: true , aliases: ["kayıtsız", "unregsiter"]}

exports.help = { name: "kayıtsız"}// beT4
