# Shiroyuki
A Discord bot made for personal use to post random images from image boards to a community Discord server.

## Usage
- Invite Shiroyuki to your server [here](https://discord.com/oauth2/authorize?client_id=729020375022960790&permissions=27712&scope=bot)
- Use the command "~help" to gain information on what Shiroyuki can do.

## Installation
- Clone repo to desired location
- Install dependencies and start the bot with these commands
```bash
npm install
node index.js
```
- Bot uses a .env and config.json file for sensitive information like Discord, Pixiv, and MongoDB token. You will need to create these files with your own keys. 
config.json should contain your Discord token, while your .env file will contain your Pixiv token with the format
```
PIXIV_TOKEN=YOUR_PIXIV_TOKEN
ATLAS_URI=YOUR_MONGODB_TOKEN
```
- To obtain your Pixiv token, use this [script](https://gist.github.com/ZipFile/c9ebedb224406f4f11845ab700124362).
