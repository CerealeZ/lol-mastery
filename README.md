# Welcome to League's Mastery

It's a simple app that show basic data from the searched user from the videogame League of Legends.

### Used API's

* [SUMMONER-V4](https://developer.riotgames.com/apis#summoner-v4) (User metada)
* [LEAGUE-V4](https://developer.riotgames.com/apis#league-v4) (Ranked info)
* [MATCH-V5](https://developer.riotgames.com/apis#match-v5) (Matchs info)
* [CHAMPION-MASTERY-V4](https://developer.riotgames.com/apis#champion-mastery-v4) (Champion Mastery from user)
* [Data Dragon](https://developer.riotgames.com/docs/lol) (League of Legends' assets)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, go to [Riot Developer Website](https://developer.riotgames.com/apis), create an account and create an API Key. Use the API key in an environment variable called __RIOT_API__.

```js
// .env.local

RIOT_API=YOUR_SUPER_SECRET_API_KEY

```


Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

