---
title: 'Maps in Go Programming Language'
description: 'A comprehensive guide to maps in Go programming language with examples.'
tags: [Golang, Maps, Programming]
pubDate: 'September 30, 2025'
heroImage: '/maps-in-go.webp'
---

Map in go is similar to what object is in JavaScript, hash in Python. I will be heavily using JavaScript as reference to discuss maps in go programming language, because that's the one of the language I excel in.

In go programming language a map looks like this `map[keyType]valueType`. So how do you declare and use a map in Go?

Simple
```
var names map[string]string
```

Here we have declared a names map which keys are string and the values are also string. Now that we have declared a map, how do we use it?

If we try to use it like
```
names["ceo"] = "Zuck"
```

Guess what will happen? It will cause a panic error. You can check it here https://go.dev/play/p/q7XMDKymCnD

We will get a `panic: assignment to entry in nil map` error. Let me explain the reason behind the error. Maps are reference types like slices or pointers, when we declare a map like this, it doesn't point to anything, it's a nil map, you can read from a nil map, it will act like an empty map but trying to write to it will result in an error.

Hmm, confusing, isn't it? So how do we declare and use a map in Go? We use the `make` function again to create maps in Go.

```
names := make(map[string]string)
names["ceo"] = "Zuck"
names["cto"] = "Andrew"
```

You can see it in action here :  https://go.dev/play/p/cjTO5klGADe

Why this works, is the make function initializes a hash map data structure and returns a value which points to it. I personally find it a bit odd as in JavaScript you can just declare an object like this

```
 var names = {
  ceo: "Zuck",
  cto: "Andrew"
 }
```

We can also do something similar in Go as well,

```
 names := map[string]string{
  "ceo": "Zuck",
  "cto": "Andrew"
 }
```

I like this compared to using make function, because it feels a bit natural, but it's personal choice, and make has some tricks up it's sleeve which is not possible without it.

With this syntax we can also create an empty map(not a nil map)

```
 names := map[string]string{}
```

Neat, isn't it? That's the gist of how we can create maps with or without values in Go. Just remember don't try to write to an nil map, or you will have a bad time!

Now let's see how we interact with an map in Go.

**Iterating over:** We can iterate a map using the range keyword

```
 for k, v := range names {
  fmt.Println(k, v)
 }
```

Working example: https://go.dev/play/p/qPUj26njUk3

**Number of Items**: We can use the built in `len` function to check the available items on a map.

Working example: https://go.dev/play/p/pWNpyMhbSqF

**Deleting an Item:** We can use the delete function to delete an item form a map. It returns nothing on success or on failure. The `delete` function takes two arguments, the first is the map and second is the key.

```

 delete(names, "ceo") // will delete zuck from facebook :-)

```

Working example: https://go.dev/play/p/qhjlxOfFtgV

**Accessing Items:** Accessing an item is pretty straight forward, `names["ceo"]` will give you the item for key "ceo", here is the interesting bit, this also returns a second value, a boolean, it indicates if something exist on the map or not.

```
  _, ok := names["ceo"]

  if ok {
   fmt.Println("Zuck lives on")
  }
```

Working example: https://go.dev/play/p/RCReolabhYq

**Key Types**: According to official Go documentation, all primitive data types which can be compared using `==` can be used as a key in maps.
Which means you can use struct as a key for a map. Trippy isn't it? 

Here is a snippet of it

```
  pokemonxp := make(map[string]map[string]int)
  charizardxp := pokemonxp["red_blue"]["charizard"]
```

Adding item to this type of map is a bit difficult to maintain, as before I can add `charizard` to the `map` I have to make sure `red_blue` generation exist within the map first(Charizard was introduced first in Pokemon Red and Blue).

The three types that can't be used as map kyes are: slices, maps, and functions


**Accessing Zero Values:** Trying to access from a nil map, as you have already know would result in returning zero value. Defaults to tye type of values intented to be kept in the map.

Working example: https://go.dev/play/p/0FRbPXTkCtq

It outputs an empty string("") that's why we don't see anything as output. If the value type was number, zero would have been returned.

There are a lot to learn about go, if you are curious you can check more at the official go blog: https://go.dev/blog/maps 