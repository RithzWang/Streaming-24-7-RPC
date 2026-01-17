const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false,
});

const keepAlive = require("./server.js");
keepAlive();

// Helper function to get both the time string AND the current hour
function getTimeData() {
  const date = new Date();
  
  // Get 00:00 format
  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  // Get raw hour (0-23) for emoji logic
  const currentHour = parseInt(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    hour12: false,
    hour: "numeric"
  }).format(date));

  return { timeString, currentHour };
}

// Helper to pick the emoji
function getEmoji(h) {
    if (h >= 6 && h < 9) return '🌄';      // Morning
    if (h >= 9 && h < 16) return '🌞';     // Lunch/Day
    if (h >= 16 && h < 18) return '🌇';     // Afternoon
    return '🌛';                            // Night
}

client.on("ready", async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  // Initial Data
  const { timeString, currentHour } = getTimeData();
  const emoji = getEmoji(currentHour);

  const rich = new Discord.RichPresence(client)
    .setApplicationId("1440267761581293659")
    .setType("PLAYING") // Changed from STREAMING
    // .setState("busy coding")
   // .setName("صلوا على النبي")
    .setDetails(`${emoji} ${timeString} (UTC+7)`) // Added Emoji here
    .setStartTimestamp(Date.now())
    // .setAssetsLargeImage('') 
    .setAssetsLargeText("") 
    // .setAssetsSmallImage('') 
    .setAssetsSmallText("Im obsessed with you");
    // REMOVED: .addButton(...)
    // REMOVED: .setURL(...)

  client.user.setActivity(rich);
  client.user.setPresence({ status: "dnd" });

  let prevTime = null;

  setInterval(() => {
    const { timeString, currentHour } = getTimeData();
    
    // Only update if the minute text has changed
    if (timeString !== prevTime) {
      const emoji = getEmoji(currentHour);
      const newDetails = `${emoji} ${timeString} (GMT+7)`;
      
      rich.setDetails(newDetails);
      client.user.setActivity(rich);
      
      prevTime = timeString;
    }
  }, 1000); // Checks every second, but only sends request if minute changes
});

const mySecret = process.env["TOKEN"];
client.login(mySecret);
