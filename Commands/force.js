const Discord = require('discord.js');
module.exports = {
    name: "force",
    description: "This Command allows you to force the bot to tpye something",
    execute(message, ALTProccessOBJ, args){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        if(args.length == 0){1
            BoldEmbed("⚠️ No arguments were given ⚠️")
        }
        else{
            if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
                ALTProccessOBJ[message.channel.id].send({message: args.join(" ")});
                BoldEmbed(`✅ Bot has been forced to say: ${args.join(" ")} ✅`)
            }
            else{
                BoldEmbed(`⚠️ No AFKing Alt is linked with this channel ⚠️`)
            }
        }
        
        message.delete();
    }
}