---
title: 'Maps in Go Programming Language'
description: 'A comprehensive guide to maps in Go programming language with examples.'
tags: [Golang, Maps, Programming]
pubDate: 'Oct 14, 2025'
heroImage: '/maps-in-go.webp'
---

Map in go is similar to what object is in JavaScript, hash in Python. I will be heavily using JavaScript as reference to discuss maps in go programming language, because that's the one of the languages I excel in.

In go programming language a map looks like this `map[keyType]valueType`. So how do you declare and use a map in Go?

Simple

```go
var names map[string]string
```

Here we have declared a names map whose keys are string and the values are also string. Now that we have declared a map, how do we use it?

If we try to use it like

```go
names["ceo"] = "Zuck"
```

We will get a `panic: assignment to entry in nil map` error. Let me explain the reason behind the error. Maps are reference types like slices or pointers, when we declare a map like this, it doesn't point to anything, it's a nil map, you can read from a nil map, it will act like an empty map, but trying to write to it will result in an error.

Hmm, confusing, isn't it? So how do we declare and use a map in Go? We use the `make` function again to create maps in Go.

```go
names := make(map[string]string)
names["ceo"] = "Zuck"
names["cto"] = "Andrew"
```

You can see it in action here :  <https://go.dev/play/p/cjTO5klGADe>

Why this works, is the make function initializes a hash map data structure and returns a value which points to it. I personally find it a bit odd as in JavaScript you can just declare an object like this

```javascript
 var names = {
  ceo: "Zuck",
  cto: "Andrew"
 }
```

We can also do something similar in Go as well,

```go
 names := map[string]string{
  "ceo": "Zuck",
  "cto": "Andrew"
 }
```

I like this compared to using make function, because it feels more natural, but it's a personal choice, and make has some tricks up its sleeve, which is not possible without it.

With this syntax we can also create an empty map (not a nil map)

```go
 names := map[string]string{}
```

Neat, isn't it? That's the gist of how we can create maps with or without values in Go. Just remember don't try to write to a nil map, or you will have a bad time!

Now let's see how we interact with a map in Go.

**Iterating over:** We can iterate a map using the range keyword

```go
 for k, v := range names {
  fmt.Println(k, v)
 }
```

Working example: <https://go.dev/play/p/qPUj26njUk3>

**Number of Items**: We can use the built in `len` function to check the available items on a map.

Working example: <https://go.dev/play/p/pWNpyMhbSqF>

**Deleting an Item:** We can use the delete function to delete an item from a map. It returns nothing on success or on failure. The `delete` function takes two arguments, the first is the map and second is the key.

```go

 delete(names, "ceo") // will delete zuck from facebook :-)

```

Working example: <https://go.dev/play/p/qhjlxOfFtgV>

**Accessing Items:** Accessing an item is pretty straight forward, `names["ceo"]` will give you the item for key "ceo", here is the interesting bit, this also returns a second value, a boolean, it indicates if something exist on the map or not.

```go
  _, ok := names["ceo"]

  if ok {
   fmt.Println("Zuck lives on")
  }
```

Working example: <https://go.dev/play/p/RCReolabhYq>

**Key Types**: According to official Go documentation, all primitive data types which can be compared using `==` can be used as a key in maps.
Which means you can use struct as a key for a map. Trippy, isn't it?

Here is a snippet of a map of maps, where the key is a string and the value is another map with string keys and int values.

```go
  pokemonxp := make(map[string]map[string]int)

  // First, initialize the inner map for "red_blue" generation
  pokemonxp["red_blue"] = make(map[string]int)

  // Now we can add charizard's XP
  pokemonxp["red_blue"]["charizard"] = 1000

  // Access the value
  charizardxp := pokemonxp["red_blue"]["charizard"]
  fmt.Println(charizardxp) // Output: 1000
```

Adding item to this type of map is a bit difficult to maintain, as before I can add `charizard` to the `map` I have to make sure `red_blue` generation exists within the map first (Charizard was introduced first in Pokemon Red and Blue). So instead if we used a Struct as key, it would be easier to maintain.

```go
 type Key struct {
 Generation, Name string
 }

 pokemonxp := make(map[Key]int)

 pokemonxp[Key{"red_blue", "Charizard"}] = 1000
 pokemonxp[Key{"red_blue", "Raichu"}] = 800
 
 fmt.Println(pokemonxp[Key{"red_blue", "Raichu"}]) // Output: 800
```

Live example: <https://go.dev/play/p/X1r_RXFD6jS>

The three types that can't be used as map keys are: slices, maps, and functions

**Accessing Zero Values:** Trying to access from a nil map, as you already know would result in returning zero value. Defaults to the type of values intended to be kept in the map.

Working example: <https://go.dev/play/p/0FRbPXTkCtq>

It outputs an empty string("") that's why we don't see anything as output. If the value type was number, zero would have been returned.

There are a few caveats while using Maps in go, for example Map is by default pass by reference, so if you pass a Map to a function and make change to it, it will also mutate the original value.

Example:

```go

package main

import "fmt"

func addToMeta(names map[string]string, position string, name string) map[string]string {
 names[position] = name
 return names
}

func main() {
 names := make(map[string]string)
 names["ceo"] = "Zuck"
 names["cto"] = "Andrew"
 newNames := addToMeta(names, "ceo", "elon")
 fmt.Println(newNames["ceo"]) // elon
 fmt.Println(names["ceo"]) // elon
}

```

Working example: <https://go.dev/play/p/wMUaaTZ0QuL>

Another caveat is Map doesn't bode well with concurrency, I am planning to write a whole article on it, in short it's not possible to read and write to maps using goroutines, it causes a panic. We have to use `RWMutex` to make it work.

You can read about it here: <https://go.dev/blog/maps>

**Conclusion:** Maps in Go are powerful and flexible, it's absolutely essential to understand how to use them effectively. You will find yourself using maps in almost every Go program you write. I hope this article has helped you understand the basics of maps in Go programming language.

Feel free to file an issue or suggest an edit if you find something wrong or missing in this article.
