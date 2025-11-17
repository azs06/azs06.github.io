---
title: How to use DeepSeek With VSCode
description: Work with DeepSeek R1 0528 in Visual Studio Code using roocode.
slug: how-to-use-deepseek-with-vscode
tags: [ai agents, coding]
pubDate: 'June 17 2025'
heroImage: '/use-deepseek-r1-with-vscode.webp'
---

## Get started with DeepSeek R1 0528 in VSCode

DeepSeek recently released [DeepSeek R1-0528](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528), it’s an open source model under MIT license, it’s on par with OpenAI’s O1 model. And it can be easily integrated with Visual Studio Code as a coding agent.

For this I will be using Roocode (it can also be used with Cline).

First create an account on https://openrouter.ai/, login with github or google if you prefer.

Go to [openrouter.ai/settings/keys](http://openrouter.ai/settings/keys) and create an api key.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1750143218/personal-website/image_tu043m.png)

Copy the key, and save it somewhere safe.

Now on to VSCode, install Roocode

![image.png](https://res.cloudinary.com/theazs/image/upload/v1750143219/personal-website/image_1_z9cpth.png)

Once it’s installed, open it by clicking on the new kangaroo icon, and you will be greeted with the Roocode welcome screen

![image.png](https://res.cloudinary.com/theazs/image/upload/v1750143220/personal-website/image_2_rwd3qz.png)

Scroll down and under **api provider** select **OpenRouter**

Paste the api key that we created on **OpenRouter** and that’s it. Another thing, make sure to select **deepseek/deepseek-r1-0528:free**; there are paid options available too.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1750143218/personal-website/image_3_dqzsgy.png)

And that’s it. Now you can start interacting with the DeepSeek R1 in an agentic manner, ask questions about your code, explain code, solve issues, and implement features.

Another option worth considering is using Cline with Grok, but in my practical use, I found DeepSeek to be more capable when it comes to programming.

A few things to consider: as we are using the free version of the model from OpenRouter, the request and response time might get slower sometimes, as more people make requests to the server. So far I have not found any issues with this setup.