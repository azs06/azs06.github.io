---
title: Pointers in Go Programming Language
description: Understanding pointers in Golang with examples
tags: [Golang, Pointers, Programming, Pointers in Go]
pubDate: 'Oct 24 2025'
heroImage: '/pointers-in-go.webp'
---

## What is a pointer?

Oh pointers where art thou? It's stupid, I know! I am not a very serious person, sorry about that. So what is a pointer? If you have any familiarity with C or C++, you probably know about pointers. A pointer is variable that stores the memory address of another variable. Instead of it holding a variable directly, it holds a memory reference of another variable.

## Pointers in Go

By default Go passes values by copying them, not by sharing their memory location, which means, if we have something like this

```go
 n := 10
 p := 12
 n = p
 n++
 fmt.Println(p) // 12
 fmt.Println(n) // 13
```

Go playground example: <https://go.dev/play/p/Ai_FPAxQ9Wa>  
When we assign `p` to `n`, `n` gets its own copy of 12, they both point to different segments in the memory. Now if we want both n and p to point to same exact memory location, we need to use pointers. In Go, you declare a pointer using the \* operator before the type.

```go
    var n *int
    p := 12
    n = &p

    p++

    fmt.Println(p)
    fmt.Println(*n)
```

Go playground example: <https://go.dev/play/p/w0VmjxBVayH>  
One thing to note: you can’t initialize a pointer directly with a literal value

```go
 numberofPokemon := &150 // this will not work!
```

The way to make this work is, declare/initialize an int value first. In Go, & gets the address of a variable, and \* accesses the value at that address. Together, they let you ‘share’ data between functions instead of just copying it

```go
 x := 150
 numberOfPokemons := &x
 fmt.Println(*numberOfPokemons)
 fmt.Println(numberOfPokemons) // prints memory
```

Working example: <https://go.dev/play/p/le4mCTOyx4t>

## Pointers and Functions

Pointers are really handy when we want a function to modify the passed arguments. Here is an example

```go
 func inc(n *int){
   *n++
 }

 func main() {
  number := 10
  inc(&number)
  fmt.Println(number) // 11
 }

```

Go playground example: <https://go.dev/play/p/1pmlRhwdzvL>

## Pointers and Struct

Pointers work great with Structs and become a really powerful combo

```go
type Config struct {
    Url string
    Next string
    Previous string
}

type LocationResponse struct {
    Count     int        `json:"count"`
    Next      string     `json:"next"`
    Previous  string     `json:"previous"`
}

func fetchPokemonLocations(url string, c *Config) (LocationResponse, error) {
    response := LocationResponse{}
   if strings.TrimSpace(url) == "" {
        return response, errors.New("Invalid input")
    }

    res, err := http.Get(url)
    if err != nil {
        return response, err
    }
    defer res.Body.Close()
    if res.StatusCode != http.StatusOK {
        return response, fmt.Errorf("failed to fetch data: %s", res.Status)
    }

    decodedData, err := io.ReadAll(res.Body)
    if err != nil {
        return response, err
    }

    err = json.Unmarshal(decodedData, &response)
    if err != nil {
     return response, err
    }
    c.Next = response.Next
    c.Previous = response.Previous

    return response, nil
    
    
}

func getPokemonLocation(c *Config){
 url := c.Url + "/location-area/"
 if c.Next != "" {
        url = c.Next
    }
 res, err := fetchPokemonLocations(url, c)
 if err != nil {
  fmt.Println("Failed to fetch pokemon location")
 } else {
    fmt.Println(res)
 }
}

func main() {
    config := Config{
        Url: "https://pokeapi.co/api/v2",
        Next: "",
        Previous: ""
    }

    getPokemonLocation(&config)
    getPokemonLocation(&config)
}

```

In the above code, we used a configuration pointer to move around the api, we could keep everything within the configuration and update from the function because of pointers.

## Important Notes

- Pointers can be nil, which means it doesn't point to anything!(¯\_(ツ)_/¯).

- Unlike C , you can't do pointer arithmetic, e.g `ptr++`

- Go automatically manages memory, so you don't have to manually free pointers.

- Dereferencing a nil pointer will cause panic.

- Don't get carried over and use it all the time, use only when necessary.

    ```go
    var p *int
    fmt.Println(*p) // this will cause Panic error
    
    ```

## A Pokémon Analogy (Because Why Not?)

Imagine you’re a Pokémon Trainer. Instead of carrying your Pokémon around in your hands, you store them in Poké Balls. The Poké Ball doesn’t contain the Pokémon—it’s a way to access the Pokémon when you need it.

- Pikachu with level 100 is your variable.
- Pikachu does not live in the Poké Ball, the Poké Ball contains a reference to where Pikachu is stored.
- When you want to use Pikachu, you open the Poké Ball (dereference the pointer) to access Pikachu.

If you find any issue with the article, please feel free to reach out to me on X [@soikat](https://x.com/soikat) or open an issue on GitHub. Happy coding!
