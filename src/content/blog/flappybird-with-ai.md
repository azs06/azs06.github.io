---
title: 'Flappy Bird with AI'
description: 'An experiment with AI tools to see how they perform in developing a Flappy Bird Clone'
pubDate: 'Jul 05 2025'
heroImage: '/flappybird-with-ai.webp'
slug: flappy-bird-with-ai
tags: [AI, AI Agents, 'Cursor', Augment, Claude, Cline, DeepSeek, Gemini, Loveable, Repl.it, RooCode, Trae, V0.dev, VS Code Copilot, Windsurf]
---
# Flappy Bird with AI

Flappy is a viral game from 2013. The game is very simple, but it is very addictive. The game is about a bird that has to fly through pipes without hitting them.

I have tested several AI tools to generate the code for this game. This is the prompt I used:

```text
Create a plan for developing a Flappy Bird clone using HTML, CSS and JavaScript.
```

Once the plan is generated, I asked the AI to generate the code for each step of the plan.

Not all AI created a plan, some went directly into generating the code, specialized AI tools like loveable and bolt.new, straight up ignored the instruction and generated flappy bird using react. I used the following AI tools:

* **Augment:** with the Auto mode(trial version)
  * <https://www.augmentcode.com/>
* **Bolt.new:**
  * <https://bolt.new/>
* **ChatGPT:** Model GTP-03-high
  * <https://chatgpt.com>
* **ChatGPT:** Model GTP-4o With Copilot
  * <https://github.com/features/copilot>
* **Claude Code:** With Sonnet 4
  * <https://www.anthropic.com/claude-code>
* **Claude Web:** With Claude 4 Opus
  * <https://claude.ai/>
* **Cline:** With XAI(Which is free to use for now)  
  * <https://cline.bot/>
* **Cursor:** With the Auto mode
  * <https://www.cursor.com/>
* **DeepSeek Online:**
  * <https://chat.deepseek.com/>
* **Gemini 2.5 pro web:**
  * <https://gemini.google.com/app>
* **Loveable:** With the Auto mode
  * <https://lovable.app/>
* **Repl.it:**
  * <https://repl.it/>
* **RooCode:** With DeepSeek R1 0528 from openrouter
  * <https://github.com/RooCodeInc/Roo-Code/>
* **Trae:** With Default Sonnet 3.7:
  * <https://trae.ai/>
* **V0.dev:** With the Auto mode
  * <https://v0.dev/>
* **VS Code Copilot:** With Gemini 2.5 Pro
  * <https://github.com/features/copilot>
* **VS Code with Gemini Code Assist:**  
  * <https://codeassist.google/>
* **Windsurf:** With SE-1 Model
  * <https://windsurf.com/>  

## Results

* **Augment:** Created the most polished version of the game, with a well structured plan and code. The game even had sound effects and animations. It was my first time using Augment, and I was blown away by the quality of the output.

* **Bolt.new:** Did not follow the instructions, generated a react version of the game, which was not what I wanted. The code was good, but it was not what I wanted.  

* **ChatGPT Model GTP-03-high:** The result was underwhelming, it did create the game, but the game was very basic, it did not have any animations or sound effects. Although the code was good, I expected more from it, considering it's highly regarded as one of the best models out there.

* **ChatGPT Model GTP-4o With Copilot:** The result was okay, not something special, the generated game was playable, the game does not have any play or pause mechanism, no animation, code quality was good, in my initial prompt I explicitly asked for polished game, I guess this is the best it could do.

* **Claude Code With Sonnet 4:** Claude code has this feature of plan mode, you can use this mode to generate a plan, and tweak the plan to your liking, and then you could ask Claude to follow the plan to develop. The game was one of the best ones, it did not have any sound effects, but the game was very polished, play and pause feature and the game was quite good to play. I was really impressed with the output, I was wondering what the Opus 4 could do in claude code, but I did not have access to it, so I could not test it. But I am sure it would be even better.

* **Claude Web With Claude 4 Opus:** The game was very polished, like it literally spent time thinking how to make the game better, for the web version I did not ask to generate a plan, I just asked to develop a polished version of flappy bird and it did, when it comes to programming I think claude is ahead of everyone else, it is the best AI for programming at the moment.

* **Cursor:** Followed the instructions and generated a plan, the game was also quite good. The game was playable and had no bugs, I used Cursor's auto mode, on trial version, considering the price I think Cursor is a great tool for developers.

* **Cline with XAI:** Generated a spec document and then created the code based on that spec. The game was playable, it was not as polished as augment, claude or cursor, but it was still good, and considering it's free to use, I think for free you can't beat it.

* **DeepSeek Online:** The game is playable and quite good looking, it implemented the game with touch mechanism, so either you play with mouse or touch, where other implementations used the space key to navigate the bird. I would give it a pass considering it's free and the final result is quite good, I wish it implemented the space key navigation, but overall it is a good implementation.

* **Gemini 2.5 pro web:** I did not ask to generate a plan, although I used the Gemini pro model the result was the laziest implementation of all. The bird is a box and the game is not fun to play, it's too easy. Code quality was good, but man, I expected better from Google's flagship model. Another annoyance was it tried to implement AI within the game which I didn't ask for.

* **Loveable:** I asked to generate a plan, it straight went to development. I asked to develop using HTML, CSS and JavaScript, it used react, which was not what I wanted. The game is playable and looks quite good, it has occasional issues where the pipes are not generated properly, but most of the time it works fine. Loveable is targeted towards non-programmers, so it makes sense that it will focus more on the development rather than being a tool for developers.

* **Repl.it:** Same as loveable, it is not a tool for developers, it is more targeted towards people who want to develop apps or games with it. And it works great for that. For my experience it did not follow the instructions, it generated a react version of the game and I was not able to deploy without a subscription, it's fine, you could always download and deploy it yourself. The game itself was quite good and polished, it is a great tool for non-programmers to develop apps and games with it.

* **RooCode with DeepSeek R1 0528:** The game was playable, but like gemini 2.5 pro the implementation was quite lazy, but compared to gemini, the game is enjoyable to play. The bird is a box, but the game has play/pause mechanism, high score mechanism, out of the box space key navigation, and all of this is free using openrouter api. For a coding agent I can recommend RooCode with DeepSeek, it's a great combination.

* **Trae:** I was on trial version when I tested this out, trae is a coding editor developed by ByteDance. It is quite cheap compared to other tools, By default it uses Claude 3.7 and it followed instructions quite well, it created a plan and then implemented based on the plan, the generated game was quite good. The bird resembles a bird, the game mechanics are also quite good. I would consider trae as a cheap alternative to cursor, it is a good quality tool for developers.

* **V0.dev:** Another one that surprised me is v0.dev, when it was first released it wasn't that good, and after the failure of bolt.new and loveable, I was not expecting much from it, but man I was wrong, I straightforwardly asked it to develop a flappy bird clone using plain JavaScript, and it just did that. And the game was playable, and when it comes to giving instructions for improvement v0.dev is also very good, it also lets you deploy the developed application for free which is nice. If you are looking for a tool to develop apps and games and you are not a developer, I would highly recommend v0.dev.

* **VS Code Copilot with Gemini 2.5 Pro:** The game was very basic, the bird was a box, and the game does not look good, it's playable though, I was expecting much better from copilot and gemini 2.5 pro, but the result was underwhelming. Another thing, I did ask the AI agent to generate a plan, but it did not understand that, went straight into the code, I hope copilot fixes this, as the plan mode is a game changer for AI coding agents.

* **VS Code with Gemini Code Assist:** The game was playable, it did not follow the instructions to generate a plan, but the game was quite good, it had some bugs, but overall it was a good implementation. I would recommend using Gemini Code Assist for coding tasks, it is a great tool and it's free to use compared to copilot with Gemini 2.5 pro.

* **Windsurf:** I don't know what's wrong with it, I was using trial version, so I was using the best of Windsurf, but the generated game was broken, I had to debug it myself and instruct the agent to fix the issues, overall not a fun experience, recently OpenAI purchased it, I hope things will improve in the future, at present I can't recommend it.

## Final Thought

While it may be simple to develop a flappy bird clone, it still has a few complexities. Not all AI performed the same, when it comes to following the instructions and creating an output that works really well, claude opus 4, Augment, and cursor were the best. Augment is in a league of its own to be fair, the way it generated a plan and created a polished version of the game really surprised me.

Cursor was also very good, It followed instructions and generated a plan, and the game developed from the plan was quite good.

Cline with xAI really surprised me, people don't talk about it much when it comes to programming, but its output was really good, it generated a spec document and then created the code based on that spec. And the game was playable, it was not as polished as augment or claude, but it was still good, and considering it's free to use, I think it is a great tool for developers.

RooCode With DeepSeek R1 0528 was a mixed result, it generated a plan and developed the game, but the assets were missing, and the game was not playable, once I added the assets it only worked then, the code was good, but it was unplayable without the assets. I added assets from the internet and it looks like abomination, but it works!

Most disappointing was Gemini 2.5 pro with copilot, it did not generate a plan, went straight into the code, and the game was running, but it had a lot of bugs, like you would get pipes with no gaps, and speed is too fast, things like that, I was expecting better from it. On the other hand Both gemini 2.5 pro web and gemini code assist generated playable games without any major issues, so I guess it might be an issue with the copilot version. With copilot the 4o version was also not as good as the others, I had high hopes for copilot but it was not as polished as I expected.

Another one that was disappointing was Windsurf, it generated a plan, and developed the game, but it was not working, the game was broken, it had console errors, after some debugging I was able to fix it, but it was not a good experience compared to others. I was expecting better from it, as it's currently owned by OpenAI, but it seems like it is not as polished as other tools.

Another tool that surprised me was Trae, it is developed by ByteDance, and it is so cheap compared to other tools, so I had my doubts about it, by default it uses Claude 3.7, you can switch to sonnet 4 and many other models. It was successful in generating a plan and developing the game, and the final result was quite good.

Amongst the web-based tools like v0.dev, bolt.new and loveable, only v0.dev followed the instructions to develop the game in HTML, CSS and JavaScript, others straight up ignored the instructions and generated the game using react, which was not what I wanted. I also tried to give firebase studio a try, it also ignored the instructions and developed the game using react, and the game was not even playable, that's why I did not include it in the list. At present I can only use v0.dev reliably, if you are not developing a react app I would avoid loveable and bolt.new.

Now comes my favorite one, which at present is *claude code*. It is a CLI-based tool, with pro plan you only get sonnet 4, but it is still very good, and if you need to research you can use the web or desktop app where you can use the opus 4 model. I wish codex CLI was part of plus plan from OpenAI.

## Conclusion

For most people I would recommend cursor for software development, because of its pricing. If you want the best I would suggest going with Augment, as it will give you claude max at a cheaper price. Even though it's a vscode fork, I like Cursor's UX very much, and I use it even if I am not using their subscription.

If you want a general tool and some code assistance, I would recommend using the gemini pro plan, as it comes with a lot of features and the gemini code assist is very good.

If you are looking for free tools, you could give cline with xAI a try, it's really good.

Also, you might want to try trae, it is very cheap and even the free version is very good, sonnet 4 on the free version is a very good deal, though there are limitations on how many messages you can send per day.

Check the games here: [https://soikat.dev/flappybird-with-ai/](https://soikat.dev/flappybird-with-ai/)