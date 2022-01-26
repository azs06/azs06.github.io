---
layout: post.njk
pageTitle: Using Generators to simplify ajax calls
---
Let's first get familiar with generator, generator is special type of function which you can pause and resume at will. Here is a simple generaor

**Simple Generator Function**

```
function* getNumers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = getNumers();
//This does nothing, as the generator is not stared yet, we have to star it by calling .next
iterator.next(); // output {value: 1, done: false}
iterator.next(); // output {value: 2, done: false}
iterator.next(); // output {value: 3, done: true};
iterator.next(); // output {value: undefined, done: true}
/*
As you can see, generator doesn't just return the
value, it returns a special kind of object with
value on it, once the final value is yielded then
done becomes true and value becomes undefined on
subsequent runs.
*/

```

This is not very useful, but later we will see, how we can use generators to simplify our ajax calls.

Making ajax request has always been tricky in JavaScript. JavaScript is a single threaded language, so we don't want to pause the event loop when we make ajax requests, to solve this previously we used the callback pattern. Though It solved the problem, from time to time we would end up with callback hell.The introduction of Promises solved this to some extent, but sometimes Promise is not enough when we want to make several nested ajax requests, we can end up with Pyramid of doom. Let's explore an example -

**Using Promises**

```
 function getGithubFollowers(userName) {
  return ajax(`https://api.github.com/users/${userName}`)
   .then(response => {
    const { followers_url } = response
    return ajax(followers_url)
   })
 }

 const followers = getGithubFollowers('azs06')
 console.log(followers)
 ```

This is a very simple example, but we might end up in a situation where we have to make several ajax calls to get the information we need to make another server call, then things could get messy and we could end up with pyramid of doom. We can use generators and coroutine to make it more elegent and avoid pyramid of doom.

**Using Generators and Coroutine**

```
const bluebird = require('bluebird')

function* getGithubFollowers(userName) {
  const user = yield ajax(`https://api.github.com/users/${userName}`)
  const { followers_url } = user
  const followers = yield ajax(followers_url)
  return followers;
}

const ajaxRoutine = bluebird.coroutine(getGithubFollowers)

ajaxRoutine('azs06').catch(error => console.log(error)).then((response) => console.log(response))

```

As you can see, from the look of it, it's much more easier to read and reason with.

I know for this simpler example this seems a overkill, but for a larger application with houndreds of server calls this can do wonders.

You can also get similar ajax request flow by using `async` `await`, Which is built on top of generators.

**Using Async Await**

```
async function getGithubFollowers(userName) {
  const user = await ajax(`https://api.github.com/users/${userName}`)
  const { followers_url } = user
  const followers = await ajax(followers_url)
  return followers;
}


getGithubFollowers('azs06').then(response => console.log(response))

```

This seems a better choice, considering we don't have to use another library(coroutine), but learning and using generators will help you understand how async await working underneath. Also you can't pause and pass parameter at the middle of async await function, which you can do with generators. The power of generator is that you can pause it and resume it at will. This opens up opportunity to use generator many more creative ways.

To Learn more about Generators -

1. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function>*
2. <https://davidwalsh.name/es6-generators>
3. <https://richardartoul.github.io/javascript/2015/07/16/promises-generators.html>
4. <https://x.st/javascript-coroutines/>
5. [Generators in JavaScript by Fun Fun Function](https://www.youtube.com/watch?v=QOnUcU8U_XE)
6. [Generator by Kyle Robinson Young](https://www.youtube.com/watch?v=Zk_rX2n3Ml8)
