const Discord = require('discord.js');
module.exports = {
    name: "tpyes",
    description: "This command will accept a tp request",
    execute(message, ALTProccessOBJ){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
            ALTProccessOBJ[message.channel.id].send({message: "/tpaccept"});
            BoldEmbed("✅ Bot has accepted the tp request, will sethome in 15 seconds ✅")
            setTimeout(() =>{
                try{
                    ALTProccessOBJ[message.channel.id].send({message: "/sethome afk"});
                }catch(err) {console.error(err)}
            }, 15000)
        }
        else{
            BoldEmbed(`⚠️ No AFKing Alt is linked with this channel ⚠️`)
        }
        message.delete();
    }
}
