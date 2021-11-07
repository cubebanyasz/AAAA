const Discord = require('discord.js');
module.exports = {
    name: "chat",
    description: "This command turn on the chat output",
    execute(message, args, ALTProccessOBJ, Settings){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        if(args.length == 0){
            BoldEmbed(`⚠️ No arguments given. to use do ${Settings.prefix}chat (true/false) ⚠️`)
        }
        else{
            if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
                if(args[0].toLowerCase() == "true"){
                    ALTProccessOBJ[message.channel.id].send({chat: "true"});
                    BoldEmbed("✅ Chat has been set to true ✅");
                }
                else if(args[0].toLowerCase() == "false"){
                    ALTProccessOBJ[message.channel.id].send({chat: "false"})
                    BoldEmbed("✅ Chat has been set to false ✅");
                }
                else{
                    BoldEmbed(`⚠️ Wrong arguments given. to use do ${Settings.prefix}chat (true/false) ⚠️`)
                }
                
            }
            else{
                BoldEmbed(`⚠️ No AFKing Alt is linked with this channel ⚠️`)
            }
        }
        message.delete();
    }
}