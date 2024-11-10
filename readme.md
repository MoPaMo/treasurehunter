# treasurehunter
A Firefox extension that helps you pin down your favorite treasures in the high seas shop.

Adds heart buttons to all shop items and a progress bar comparing your dubloons and the price of your favourite treasures.

![UI](https://cloud-jwdp2xf3l-hack-club-bot.vercel.app/0screenshot_2024-11-03_at_15.08.13.png)
### Installation
Now on Firefox Add-ons: <https://addons.mozilla.org/addon/treasurehunter/>
Hopefully soon on Chrome Web Store.

Might require reloading the page after installation.

### Tutorial on how to install on Opera GX (and probably works on Chrome too)
1) Go to the firefox store for the extention (https://addons.mozilla.org/en-US/firefox/addon/treasurehunter/)
2) Click Download file (https://addons.mozilla.org/firefox/downloads/file/4382960/treasurehunter-1.1.xpi)
3) Change the .xpi extention into a .zip
4) Unzip the zip file
5) Open the folder (treasurehunter-1.1 or something like that)
6) Open the manifest.json and get ready to edit it.
7) Change ```"manifest_version": 2,``` to ```"manifest_version": 3,```
8) Remove this piece of code
`
  "browser_specific_settings": {
    "gecko": {
      "id": "{27213d4f-aab2-45ec-bf45-61449969b5b6}"
    }
  }
`

9) at the end your manifest.json should look like this:
`
{
  "manifest_version": 3,
  "name": "HighSeas Shop Favourite Button",
  "version": "1.1",
  "description": "Adds a favourite button to the HighSeas Shop items.",
  "permissions": [
    "storage",
    "activeTab"
  ],
  "content_scripts": [
    {
      "matches": [
        "https://highseas.hackclub.com/*"
      ],
      "js": [
        "content.js"
      ]
    }
  ]
}
`

10) Save the manifest.json and close it
11) In Opera go to extentions and click "Load Unpacked"
12) Select the folder (again probably treasurehunter-1.1 or something like that)
13) Tada you're done!!!

ToDo (in updates):
 - Chrome (and Edge, Opera, Brave, DuckDuckGo, Vivaldi, etc.) (awaiting review)
 - Timer for end of hackathon
 - Calculations of tokens per day / linear regression of total dubloons by end of hackathon
