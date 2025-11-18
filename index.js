const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});

const keepAlive = require("./server.js");
keepAlive();

function formatTime() {
  //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: "Asia/Bangkok", //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

client.on("ready", async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence(client)
    .setApplicationId("1426964594215227456")
    .setType("STREAMING")
    .setURL("https://twitch.tv/discord") //Must be a youtube video link
    .setState("Captivates Me")
    .setName("Is this really love?")
    .setDetails(`${formatTime()}`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(
      "https://cdn.discordapp.com/embed/avatars/0.png",
    ) //You can put links in tenor or discord and etc.
    .setAssetsLargeText("I have fallen for you") //Text when you hover the Large image
    .setAssetsSmallImage(
      "https://cdn.discordapp.com/attachments/853503167706693632/1440251456241532988/rodrigoroldan58-20250603-0001.jpg",
    ) //You can put links in tenor or discord and etc.
    .setAssetsSmallText("Im obsessed with you") //Text when you hover the Small image
    .addButton("مادري", "https://instagram.com/32r.6")

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `${newTime}`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env["TOKEN"];
client.login(mySecret);
