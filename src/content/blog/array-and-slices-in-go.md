---
title: 'Understanding Arrays and Slices in Go'
description: 'A comprehensive guide to arrays and slices in Go programming language with examples.'
tags: [golang, arrays, slices, programming]
pubDate: 'September 30, 2025'
heroImage: '/array-and-slices-in-go.webp'
---
For most of my career I have written programs in JavaScript and later TypeScript, so I would be using that as a reference while discussing array and slices in go.

Now you may be wondering, what is a slice? I am glad you asked, But to answer your question, I have to give you introduction to Arrays first.

## Arrays in Go

Arrays in go is a sequence of elements with a fixed length. Each element has an Index within the Array. Once you declare an Array, you can't change it's length. You can change it's item within the length but can't add more items on to it.

```go
  var pokemons [3]string
  pokemons[0] = "Charizard"
  pokemons[1] = "Bulbasur"
  pokemons[2] = "Squirtle"

  fmt.Println(pokemons[0])
  fmt.Println(pokemons[1])
  fmt.Println(pokemons[2])

  fmt.Println(pokemons)

  ```

 We can declare an array with values initialized also

 ```go
 eliteFour := [4]string{"Bruno", "Lorelei", "Lance", "Agatha"}
 eliteFour[4] = "Ash"
```

Guess what will happen when we try to add `Ash` to the eliteFour? it will blow up with an out of bound error, here you can see it for yourself: <https://go.dev/play/p/2Ado9ewULST>

At first we might be wondering, it doesn't seem that useful, why would anyone want something like that? For once go is a very performant language, so the goal is to squeeze every bit of performance possible, so when we are absolutely sure the lenth of a sequence of elements will not change we should use array, like the `eliteFour`, it's always going to be four!

Now onto the Slice:

## Slice in Go

Think of a slice in go is literally a slice of an array, it's a mutable array.  It's much more commonly used in go compared to arrays. If you declare an array without a fixed length it becomes a slice.

You can create a slice by literally slicing an array. The way you slice an array is by using their indexes, low bound and high bound `eliteFour[low : high]`

```go
elitePlayers := eliteFour[0: 2]
```

Or you can declare a slice directly like this

```go
 midPokemons := []string{"Grumpig", "Seismitoad", "Glalie", "Sandslash"}
```

Now if we do the same thing as we did previously and trying to add an item to the `midPokemons` slice.

```go
 midPokemons[4] = "Dunsparce"
```

Guess, what will happen? You might think, this should work, it's mutable, no this will also give you an out of bound index error, here you can check that <https://go.dev/play/p/J5XiiHwxDoK>

Don't curse yet! If you think I mislead you, This is because how slices works under the hood,  you need to use `append`  to add items to a slice, correct version

```go
 package main

 import "fmt"

 func main() {
    fmt.Println("Mid Pokemons")
    midPokemons := []string{"Grumpig", "Seismitoad", "Glalie", "Sandslash"}
    midPokemons = append(midPokemons, "Dunsparce")
    fmt.Println("Not Dunsparce?", midPokemons[4])
 }
```

This will not blow up and will work, why? What happens is `append` creates a new slice by copying the previous one and adding an item to it. It re-allocates new space in the memory if it does not have the capacity already defined, we will learn about capacity more later.

Another way you could create is using the `make` function.

```go
  legendaryPokemons := make([]string, 3, 3) 
```

The `make` function takes three arguments, first is the type, second is the `length` and third is `capacity`  or `cap` for short. So this slice will have prefilled three empty items, for string it's "", for number it's 0. So to add items, we could use their indexes

```go
 legendaryPokemons[0] = "Articuno"
 legendaryPokemons[1] = "Zapdos"
 legendaryPokemons[2] = "Moltres"
```

Go playground with examples: <https://go.dev/play/p/fVWRZ-kzaWb>.
We can check the length of the slice using `len` keyword and capacity using `cap` keyword. According to the official doc, the length of a slice is the number of items it contains, and capacity is the number of elements in the underlying array. We can extend a slice's length by re-slicing it.

To add items we could use `append` as before, so what was the point of providing a pre-defined capacity? Well as I have already mentioned that slices are basically array without hard limit, so when we set a capacity for a slice, the underlying array will make room for that beforehand, until it runs of it then it will re-allocate more memory. We use capacity to make our programs more performant, it's ideal to use if we know how many items a slice going to have beforehand. Most of the times you will see the use of `make` function without the `capacity` argument. But it's good to know why and how it works to write better performant go code.

## Copying Slice

You can copy a slice using the official `copy` function

```go
package main

import "fmt"

func main() {
 animeCharacters := []string{"Ash", "Misty", "Brock"}
 rebootCharacters := make([]string, len(animeCharacters))
 copiedElements := copy(rebootCharacters, animeCharacters)
 fmt.Println(copiedElements)
}
 
```

The `copy` function takes two arguments, first, is the destination and second is the source. It returns the number of elements copied. Here is the go playground link: <https://go.dev/play/p/WU0IeOVLikn>
