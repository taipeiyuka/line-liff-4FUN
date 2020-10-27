# 4Fun: Twitter Line LIFF App
###### tags: `MeiChu Hackathon`

<img src="https://i.imgur.com/oW7rSMk.jpg" width="330">
<img src="https://i.imgur.com/L6TEnXb.jpg" width="330">

## Target Audience
Our target users are **Line users that may not have a Twitter account**. They are still likely to be interested in Tweets, for example information about American and Japanese celebrities, or American politics, especially the tweets posted by the 45th president of the United States. With our LIFF app, users can actively search for recent contents and share the tweets with Line friends in a simple and delightful way.

## Problem Solving
We are proposing an application that allows the users to access Twitter **without loggin in a twitter account**. For most of the Taiwanese, Twitter is not as possible as Line is. However, there are much going out there that we would like to **share with our friends**.

Taking advantage that tweets are public and short, it is really convenient to read it in a Line Flex massage type. Our LIFF also overcomes the barrier that normal users cannot send Flex massage by themselves. We allow the users to **share the tweets in Flex massage** via our LIFF. We consider it much more preferable to share Flex message than only a tweet url.

Lastly, we want to **change the habits of people on Twitter(or social media)**. Instead of surfing on the social media and not finding useful pieces of information, the LIFF app saves our time and feeds back tweets related to one's interest.

## Technical Structure
Requirements: Twitter API, Line LIFF, Line messaging API
Frontend: JavaScript, HTML
Backend: NodeJS, Python (on heroku)
Database(DB): heroku postgresql

Tweet url to flex message translator: 
```
User -> Chatbot -> DB
User -> LIFF -> DB -> LIFF -> Twitter -> LIFF 
-> Flex message (shareTargetPicker)
```
Tweet searcher (by keyword or username):
```
User -> LIFF -> Twitter -> LIFF -> Flex message (shareTargetPicker)
```

The chatbot and LIFF works together through database.

The tweet searching engine has two features. One is to search the recent tweets of a specific twitter account, and the other is to search for the tweet content with matching strings or hashtags. The searching engine embeds tweets in the webpage and can **preview** which twitter you would like to share.

## Future Potential
We are looking forward to integrate our service with other social medias and let it be a **single portal** to keeping up with the world. At the same time by sharing thoughts about posts online, friends can get closer, and know each other even more.
