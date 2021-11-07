const fs = require("fs");

module.exports = function createsettings() {
    var settings = {
        token: "",
        prefix: "%",
        host: "cosmicpvp.com",
        version: "1.8.9",
        hub_command: "/server dungeonplanet",
        anti_afk_command: "/lag",
        Chat_anti_AFK: true,
        Chat_anti_AFK_delay: 300,
        LoginDelay: 60,
        BankBot: true,
        EnableAdminRole: true,
        AdminRoleID: "123456789123456789"
    }
    
    
    const data = JSON.stringify(settings, null, 2);
    fs.writeFileSync("./settings.json", data, "utf-8", (err) => {
        if (err) {
            console.log(`Error Creating Settings File: ${err}`)
        }
    })
};