const Discord = require('discord.js');
module.exports = { 
    name: "resethomes",
    description: "This command will delete all homes",
    execute(message, ALTProccessOBJ){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        
        let Keys = Object.keys(ALTProccessOBJ);

        Keys.forEach((elem) =>{
           ALTProccessOBJ[elem].send({message: "/delhome afk"})
           ALTProccessOBJ[elem].send({message: "/sethome home"}) 
        })
        
        BoldEmbed("✅ Reset all the homes from /home afk to /home home ✅")
        message.delete();
    }
}