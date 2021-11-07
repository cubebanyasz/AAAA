const Discord = require('discord.js');
module.exports = { 
    name: "drain",
    description: "This command will delete all homes",
    execute(message, ALTProccessOBJ, args, Settings){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        
        if(args.length != 0){
            let Keys = Object.keys(ALTProccessOBJ);

            Keys.forEach((elem) =>{
            ALTProccessOBJ[elem].send({drain: args[0]})
            })
            
            BoldEmbed("✅ Drained All Alts ✅")
        }
        else{
            BoldEmbed(` ⚠️ no username given! ${Settings.prefix}drain your_username ⚠️ `)
        }
        
        message.delete();
    }
}