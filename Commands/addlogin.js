const Discord = require('discord.js');
const fs = require("fs");
module.exports = {
    name: "addlogin",
    description: "This Command will add a login command",
    execute(message, args, ALTProccessOBJ, AFKAlts){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }


        if(Object.keys(AFKAlts).indexOf(message.channel.id) != -1 && args != 0){
            AFKAlts[message.channel.id].LoginCommand = args.join(" ");
            BoldEmbed(`✅ Added Login Command: ${args.join(" ")} ✅`)
            console.log("Saving Changes");
            let data = JSON.stringify(AFKAlts, null, 2);
            fs.writeFile("AFKAlts.json", data, (err) =>{
                if(err){
                    throw err;
                }
            })
            if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) != -1){
                BoldEmbed("✅ Relogging ALT so these changes take affect ✅");
                ALTProccessOBJ[message.channel.id].kill();
            } 
            else{
                BoldEmbed("⚠️ The Alt doesnt seem to be logged in so the alt hasnt been restarted ⚠️")
            }
        }
        else{
            BoldEmbed(`⚠️ No AFKing alt is linked with this channel ⚠️`)
        }
    }
}