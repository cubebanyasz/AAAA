const Discord = require('discord.js');
module.exports = {
    name: "relog",
    description: "This command will relog your alt",
    execute(message, ALTProccessOBJ, AFKAlts, LoginQueue){
        function BoldEmbed(Message){
            let Embed = new Discord.MessageEmbed()
            Embed.setColor('#0099ff')
            Embed.setTitle(Message)
            message.channel.send(Embed);
        }
        let inqueue = false;
        if(LoginQueue.length != 0){
            LoginQueue.forEach(element => {
                if(element.discordID == message.channel.id){
                    BoldEmbed("⚠️ The Alt is in the login queue ⚠️");
                    inqueue = true;
                }
            });
        }
        if(!inqueue){
            if(Object.keys(AFKAlts).indexOf(message.channel.id) == -1){
                BoldEmbed("⚠️ No AFKing Alt is linked with this channel ⚠️");
            }
            else{
                if(Object.keys(ALTProccessOBJ).indexOf(message.channel.id) == -1){
                    LoginQueue.push(AFKAlts[message.channel.id]);
                    BoldEmbed("✅ Alt has been added to the login queue ✅")
                }
                else{
                    BoldEmbed("⚠️ The bot seems to be already logged in ⚠️")
                }
            }
        }
        message.delete();
    }
}