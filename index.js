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
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

client.on("ready", async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence(client)
    .setApplicationId("1440267761581293659")
    .setType("STREAMING")
    .setURL("https://youtu.be/_LTjhKM8tvs?si=m3nc12g2EL-GNclp") //Must be a youtube video link
    .setState("اللهم صل وسلم وبارك على نبينا محمد")
    .setName("Is this really love?")
    .setDetails(`${formatTime()} (UTC+7)`)
    .setStartTimestamp(Date.now())
   // .setAssetsLargeImage(
     // "rodrigoroldan58") //You can put links in tenor or discord and etc.
    .setAssetsLargeText() //Text when you hover the Large image
   // .setAssetsSmallImage(
     // "i2wct") //You can put links in tenor or discord and etc.
    .setAssetsSmallText("Im obsessed with you") //Text when you hover the Small image
    .addButton("مادري", "https://instagram.com/32r.6");

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `${newTime} (UTC+7)`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env["TOKEN"];
client.login(mySecret);
