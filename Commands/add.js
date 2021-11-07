const Discord = require('discord.js');
const fs = require("fs")

module.exports = {
    name: "add",
    description: "This Command allows you to add an AFK ALT",
    execute(message, args, Settings, LoginQueue, AFKAlts, DB){
        
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        
        if(3 >= args.length){
            BoldEmbed(`⚠️ To add an ALT do ${Settings.prefix}add account_username email password (mojang/microsoft) ⚠️`);
        }
        else{
            if(args[3] == "mojang" || args[3] == "microsoft"){
                let found = false;
                let AFKkeys = Object.keys(AFKAlts);
                AFKkeys.forEach((element) =>{
                    if(AFKAlts[element].username == args[1]){
                        found = true;
                    }
                })
                if(!found){
                    message.guild.channels.create(args[0], {
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                           }
                        ]

                    }).then((newChannel) => {
                        AFKAlts[newChannel.id] = {
                            username: args[0],
                            email: args[1],
                            password: args[2],
                            AuthType: args[3],
                            discordID: newChannel.id
                        }
                        console.log("A new Console Client has been added to queue");
                        LoginQueue.push(AFKAlts[newChannel.id])
                        BoldEmbed(`${args[0]} is now being AFK'd`);
                        console.log("Saving Changes");
                        let data = JSON.stringify(AFKAlts, null, 2);
                        fs.writeFileSync("AFKAlts.json", data, (err) =>{
                            if(err){
                                throw err;
                            }
                        })
                    });
                }
                else{
                    BoldEmbed(`⚠️ This Alt is already being AFK'd ⚠️`);
                }
                
            }
            else{
                BoldEmbed(`⚠️ To add an ALT do ${Settings.prefix}add account_username email password (mojang/microsoft) ⚠️`);
            }
        }

        message.delete();
        
    }
}