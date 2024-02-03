# lemmy-topN-bot
Lemmy bot to list the top n posts across specified communities.

## Building
```
npm run build
```
This will create `dist/lemmy-topn-bot.js`

## Usage

Create a `settings.json` file to contain the configuration, there is an example below for watching multiple communities.
```
{
    "instance": "https://aussie.zone",
    "username": "ACCOUNT USERNAME GOES HERE",
    "password": "ACCOUNT PASSWORD GOES HERE",
    "community": "localtesting",
    "sort": "TopWeek",
    "count": 5,
    "title": "Straight to the Pool Room",
    "body": "These were the top posts across some of our communities",
    "communities": [
        "australia",
        "environment",
        "news",
        "australianpolitics",
        "worldnews"
    ]
}
```

The following options are of interest
- `community`: The community to put the post in
- `sort`: The sorting option to select the posts, see: https://join-lemmy.org/api/types/SortType.html for options
- `count`: The top `count` posts from each community sorted by `sort` will be used to create the post
- `title`: The title of the post (excluding date)
- `body`: The initial body of the post
- `communities`: The communities to gather top posts from


Ensure that `settings.json` is in the current working directory when running the bot:
```
node lemmy-topn-bot.js
```

## Acknowledgements
- [lemmy-post-bot](https://github.com/dfrencham/lemmy-post-bot) - Project structure
- [lemmy-js-client](https://github.com/LemmyNet/lemmy-js-client) - Interaction with Lemmy

## Contributing
Contributions are welcome.