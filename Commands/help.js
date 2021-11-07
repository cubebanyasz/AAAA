const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "Help Me", 
    execute(message, Settings){
        let Embed = new Discord.MessageEmbed()
        Embed.setColor('#0099ff')
        Embed.setTitle("Bandella AFK Help")
        Embed.setDescription('Any bugs or questions https://discord.gg/EscPyG7q89')
        Embed.addFields({name: `${Settings.prefix}add`, value: `${Settings.prefix}add account_username email password (mojang/microsoft) This will add the ALT to the AFK list, log the ALT in and create a channel to control the ALT. Whoever executed the command will get access to the channel`},
        {name: `${Settings.prefix}remove`, value: `This will log the alt off, remove it from the list and delete its channel`},
        {name: `${Settings.prefix}kill`, value: `This command will log the alt off until the script is re run or you relog the alt with ${Settings.prefix}relog`},
        {name:`${Settings.prefix}relog`, value: "This Command will relog the alt after its been killed" },
        {name: `${Settings.prefix}restart`, value: `If anything happen ${Settings.prefix}restart will restart the alt`},
        {name: `${Settings.prefix}force`, value: `This command will force the bot to type whatever you put after the ${Settings.prefix}force `},
        {name: `${Settings.prefix}tpyes`, value: "This command will accept your tp and sethome 15 seconds later"},
        {name: `${Settings.prefix}sethome`, value: "This command will sethome afk at its current location. This is so the bot returns incase it gets killed"},
        {name: `${Settings.prefix}chat`, value: "This command will relay the chat messages the bot receives into its discord channel. true to turn on false to turn off."},
        {name: `${Settings.prefix}drain`, value: "This command will drain all alts"},
        {name: `${Settings.prefix}resethomes`, value: "will change all home names from /home afk to /home home (update due to no ranks on comsic only having one home)"}, 
        {name: `${Settings.prefix}addlogin`, value: `${Settings.prefix}addlogin command allows you to setup a login command that is executed before the hub command`}, 
        )
        message.channel.send(Embed);
        message.delete();
    }
}