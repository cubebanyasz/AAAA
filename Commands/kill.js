const Discord = require('discord.js');
module.exports = {
    name: "kill",
    description: "This will turn off any AFKing alt",
    execute(message, ALTProccessOBJ, Settings, dontrelog){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }

        if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
            dontrelog.push(message.channel.id)
            ALTProccessOBJ[message.channel.id].kill()
            BoldEmbed(`✅ Alt has been killed ${Settings.prefix}relog to relog the alt ✅`)
        }
        else{BoldEmbed(`⚠️ No AFKing alt is linked with this channel ⚠️`)}
        message.delete();
    }    
}