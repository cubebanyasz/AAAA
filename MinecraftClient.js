const mineflayer = require('mineflayer');
const fs = require("fs")

var chat = false;
var lastchat = Date.now();
var ChatBuffer = [];
var drain = {
  draining: false,
  user: null
}

var Settings;
try {
  const settingsdata = fs.readFileSync("./settings.json");
  Settings = JSON.parse(settingsdata);
  console.log("Settings File Loaded");
} catch (err) {
  console.error(err)
  process.exit(1);
};

var options = {
  host: Settings.host,
  username: process.argv[2],
  password: process.argv[3],
  auth: process.argv[4],
  version: Settings.version,

}

var logincommand;
var Already_logged_in_msg = ['You are already connected to this proxy!', "§l[CosmicProxy]§r\n     §7You seem to be logged in already.\n",];
if (process.argv.length = 6) {
  logincommand = process.argv[5]
}
else {
  logincommand = null;
}



var host;
if (options.host.toLowerCase().indexOf("cosmic") != -1) {
  host = "cosmic"
}
else if (options.host.toLowerCase().indexOf("vanity") != -1) {
  host = "vanity"
}
else if (options.host.toLowerCase().indexOf("archon") != -1) {
  host = "archon"
}
else if (options.host.toLowerCase().indexOf("jartexnetwork") != -1) {
  host = "jartexnetwork"
  if (Settings.BankBot) {
    process.send && process.send({ embed: `The BankBot doesn't fully support ${options.host} yet open up a ticket to get support` })
    Settings.bankBot = false;
  }
}
else {
  process.send && process.send({ embed: `The Bot doesn't fully support ${options.host} yet open up a ticket to get support` })
  Settings.BankBot = false;
}

var MCBOT = new mineflayer.createBot(options);

MCBOT.on("kicked", (reason) => {
  reason = JSON.parse(reason)
  console.log(reason)
  if (Already_logged_in_msg.indexOf(reason.text) != -1) {
    process.send && process.send({ embed: `${MCBOT.username} Seems to already be logged in. %relog to try again`, relog: false });
    console.log(`${MCBOT.username} Seems to already be logged in. %relog to try again`);
  }
  else if (host == "vanity") {
    if (reason.extra[0].text == 'You are already logged on to this server.') {
      process.send && process.send({ embed: `${MCBOT.username} Seems to already be logged in. %relog to try again`, relog: false });
      console.log(`${MCBOT.username} Seems to already be logged in. %relog to try again`);
    }
  }
})

MCBOT.on("end", () => {
  process.send && process.send({ relog: true })
})

MCBOT.on("message", (jsonMsg, position) => {
  lastchat = Date.now();
  let longmsg = "";
  if (jsonMsg.extra != undefined) {
    jsonMsg.extra.forEach((elem) => {
      longmsg += elem.text;
    })

    let longmsgarray = longmsg.split("");
    while (longmsgarray.indexOf("§") != -1) {
      longmsgarray.splice(longmsgarray.indexOf("§"), 2);
    }
    longmsg = longmsgarray.join("");
    if (chat) {
      process.send({ text: longmsg });
    }
    if (longmsg.startsWith("Your Balance: $") && drain.draining == true) {
      longmsg = longmsg.slice(15, longmsg.length);
      longmsg = longmsg.split(",");
      longmsg = longmsg.join("");
      ChatBuffer.push(`/pay ${drain.user} ${longmsg}`);
      process.send && process.send({ embed: `Paid ${drain.user} $${longmsg}` })
    }

    if (Settings.BankBot) {
      if (longmsg.startsWith("$") && longmsg.indexOf("has been received from") != -1) {
        longmsg = longmsg.split(" ");
        let name;
        if (host == "archon") {
          name = longmsg[5].replace(".", "");
        }
        else {
          name = longmsg[6].replace(".", "");
        }
        process.send && process.send({ embed: `${name} has deposited ${longmsg[0]}` })
      }
    }

  }

  })

MCBOT.on("spawn", () => {
  if (logincommand != null) {
    ChatBuffer.push(logincommand)
  }
  ChatBuffer.push(Settings.hub_command)
})

MCBOT.on("login", () => {
  process.send && process.send({ embed: `${MCBOT.username} has successfully logged in!` });
  console.log(`${MCBOT.username} has successfully logged in!`)
})

MCBOT.on("death", () => {
  ChatBuffer.push("/home home")
})

MCBOT.on('error', (err) => {
  if (err.toString().startsWith("Error: Invalid credentials. Invalid username or password.")) {
    console.log("Invalid credentials. Invalid username or password")
    process.send && process.send({ relog: false, embed: "Wrong username and password %remove this alt or to try again %relog" })
  }
  else {
    console.log(err)
    process.send && process.send({ relog: true, embed: `${MCBOT.username} has crashed and is being reloged` })
  }

})

process.on("message", (data) => {
  try {
    let keys = Object.keys(data)
    if (keys.includes("chat")) {
      if (data.chat == "true") {
        chat = true
      }
      else if (data.chat == "false") {
        chat = false;
      }
    }
    if (keys.includes("message")) {
      ChatBuffer.push(data.message);
    }
    if (keys.includes("drain")) {
      drain = {
        draining: true,
        user: data["drain"]
      }
      setTimeout(() => {
        drain = {
          draining: false,
          user: null
        }
      }, 10000)
      ChatBuffer.push("/bal")
    }
  } catch (err) { console.error(err) }
})


setInterval(() => {
  if (ChatBuffer.length != 0) {
    let msg = ChatBuffer.shift();
    MCBOT.chat(msg);
  }
}, 2000);

setInterval(() => {
  ChatBuffer.push(Settings.hub_command)
  ChatBuffer.push(Settings.anti_afk_command)
  ChatBuffer.push("/home home");
}, 300000)

setInterval(() => {
  if (Date.now() - lastchat > Settings.Chat_anti_AFK_delay * 1000 && Settings.Chat_anti_AFK) {
    console.log("No chat msg recived in 5 mins restarting the bot")
    process.send && process.send({ embed: `No chat msg recived in ${Settings.Chat_anti_AFK_delay / 60} mins restarting the bot`, relog: true });
  }
}, 30000)