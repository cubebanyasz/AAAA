const Discord = require('discord.js');
module.exports = {
    name: "sethome",
    description: "This command will sethome to the afk spot",
    execute(message, ALTProccessOBJ){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
            ALTProccessOBJ[message.channel.id].send({message: "/sethome home"});
            BoldEmbed("✅ Bot has /sethome home ✅")
        }
        else{
            BoldEmbed(`⚠️ No AFKing Alt is linked with this channel ⚠️`)
        }
        message.delete();
    }
}