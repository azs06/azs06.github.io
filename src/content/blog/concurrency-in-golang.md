---
title: Concurrency in Golang
description: Understanding concurrency in Golang with examples
tags: [Golang, Concurrency, Programming]
pubDate: 'Nov 17 2025'
heroImage: '/concurrency-in-go.webp'
---

For aspiring Go learners, I personally think Concurrency is your final boss. The dopamine rush you will get when you understand how it works and then you will also understand why Go is popular for concurrent applications.

In my opinion, Go has the most elegant implementations of concurrency. I haven't dug into the Rust or Zig world to know about their implementation, but based on my experience, the simplicity that Go provides is simply unmatched.

## Goroutines

What is a goroutine? Glad you asked, let's explore it together. A goroutine is a mechanism provided by the Go runtime to execute code concurrently. And how do you invoke a goroutine? It's stupidly simple using the keyword `go`. And remember, concurrency is not the same as parallelism.

```go
go dosomething()
go dosomethingElse()
```

Now if you just spawn a new goroutine like this, nothing will happen, the program will run and exit. Example:

```go
package main

import "time"

func worker(input string) {
 time.Sleep(2 * time.Second)
 println("done", input)
}

func main() {
 go worker("goroutine")
 go worker("goroutine 2")
}
```

Nothing will happen, you can check it here <https://go.dev/play/p/L5RA483OS4_4> and why is that? We are running the program asynchronously, but we are not waiting to get results from our worker function. There are two ways we could achieve that, one of those is using `WaitGroup`, here is how to make our worker work!

## WaitGroup

```go
package main

import (
 "sync"
 "time"
)

func worker(input string, wg *sync.WaitGroup) {
 defer wg.Done()
 time.Sleep(2 * time.Second)
 println("done", input)
}

func main() {
 var wg sync.WaitGroup
 wg.Add(2) // two goroutines
 go worker("goroutine", &wg) // first goroutine
 go worker("goroutine 2", &wg) // second goroutine
 // Wait for all goroutines to finish
 wg.Wait()
}

```

Here we are creating a waitgroup, adding 2, indicating 2 more goroutines to be waited for and spawning two goroutines. We pass the waitgroup to the goroutines, the `wg.Done()` decrements the counter from waitgroup. And `wg.Wait` blocks the main function until the counter is zero.

With Go 1.25, Go introduced a new way to work with `WaitGroup`, it simplifies the use of `WaitGroup`, here is the example: <https://go.dev/play/p/JjGwiWgxidW>

```go
package main

import (
 "sync"
 "time"
)

func worker(input string) {
 time.Sleep(2 * time.Second)
 println("done", input)
}

func main() {
 var wg sync.WaitGroup
 wg.Go(func() {
  worker("goroutine")
 })
 wg.Go(func() {
  worker("goroutine 2")
 })
 wg.Wait()
}
```

If we are going to use `WaitGroup`, I prefer this syntax over the other, and about the other syntax, generally you would not be using `WaitGroup` that way, you would probably do something like this

```go
package main

import (
 "sync"
 "time"
)

func worker(input string, wg *sync.WaitGroup) {
 defer wg.Done() // always defer as first statement
 time.Sleep(2 * time.Second)
 println("done", input)
}

func main() {
 inputs := []string{"goroutine 1", "goroutine 2", "goroutine 3"} // slice of work items

 var wg sync.WaitGroup
 wg.Add(len(inputs)) // add number of items dynamically

 for _, input := range inputs {
  go worker(input, &wg)
 }

 wg.Wait() // block until all goroutines finish
 println("all done")
}

```

That's how you would probably do it. Live example: <https://go.dev/play/p/XtjVMDDalTG>

## Channels

There is another way to communicate with goroutines, and it's channel, rightly named so. It's quite interesting how it works. Here is our worker using channels

```go
package main

import (
 "fmt"
 "time"
)

func worker(input string, ch chan string) {
 time.Sleep(2 * time.Second)
 str := "done " + input
 ch <- str
}

func main() {
 ch := make(chan string)
 go worker("goroutine 1", ch)
 go worker("goroutine 2", ch)
 // since we know we already have two goroutines
 for i := 0; i < 2; i++ {
  fmt.Println(<-ch)
 }
}
```

Few interesting tidbits:

* Use `ch<-` to send something to the channel
* Use `<-ch` to get it from the channel

Here in the above examples, I deliberately used `2` to iterate and get values, because we know we have only two goroutines sending values to the channel. Channels can be of two types: this is an example of an unbuffered channel. You can also create buffered channels with a fixed capacity, which allows the channel to hold multiple values before blocking the sender.

* Unbuffered channel (make(chan string)): Sender blocks until receiver is ready

* Buffered channel (make(chan string, 5)): Sender only blocks when buffer is full

```go
package main

import (
 "fmt"
 "time"
)

func worker(input string, ch chan string) {
 time.Sleep(2 * time.Second)
 str := "done " + input
 ch <- str
}

func main() {
 ch := make(chan string, 2) // buffered channel with capacity 2
 go worker("goroutine 1", ch)
 go worker("goroutine 2", ch)
 // The buffer allows both sends to complete without blocking,
 // but we still need to know how many values to receive
 for i := 0; i < 2; i++ {
  fmt.Println(<-ch)
 }
}

```

Another way to get values from channel and also close it is using range. If you use range to iterate then you don't have to use `<-ch` to get values from channel, Go does that for you.

Example:

```go
package main

import (
 "fmt"
 "time"
)

func worker(input string, ch chan string, done chan bool) {
 time.Sleep(2 * time.Second)
 str := "done " + input
 ch <- str
 done <- true // Signal completion
}

func main() {
 ch := make(chan string)
 done := make(chan bool)
 inputs := []string{"goroutine 1", "goroutine 2"}

 for _, input := range inputs {
  go worker(input, ch, done)
 }

 // Close channel after all goroutines complete
 go func() {
  for i := 0; i < len(inputs); i++ {
   <-done // Wait for each goroutine
  }
  close(ch)
 }()

 for result := range ch {
  fmt.Println(result)
 }
}


```

Here we use a "done channel" pattern. Each goroutine sends a signal to the done channel after sending its result to ch. A separate goroutine waits for all workers to complete (by receiving from done as many times as we have workers), then safely closes the ch channel. The way range works is, it will keep running forever expecting values until the channel is closed. If you don't close the channel, you will get a deadlock error.

The way I have written the code is not the most idiomatic way to write Go code, an ideal Go code could be something like this, using `WaitGroup`

```go
package main

import (
 "fmt"
 "sync"
 "time"
)

func worker(input string, ch chan string, wg *sync.WaitGroup) {
 defer wg.Done()
 time.Sleep(2 * time.Second)
 str := "done " + input
 ch <- str
}

func main() {
 ch := make(chan string)
 var wg sync.WaitGroup
 inputs := []string{"goroutine 1", "goroutine 2"}

 for _, input := range inputs {
  wg.Add(1)
  go worker(input, ch, &wg)
 }

 go func() {
  wg.Wait()
  close(ch)
 }()

 for i := range ch {
  fmt.Println(i)
 }
}

```

You would often use channels alongside `WaitGroup` to write more idiomatic Go code.

## Select

When dealing with multiple channels, the `select` statement makes it possible to wait on multiple channels, its syntax is similar to a switch statement. Check the below example

```go
package main

import (
 "fmt"
 "time"
)

func worker(input string, ch chan string, interval time.Duration) {
 time.Sleep(interval * time.Second)
 str := "done " + input
 ch <- str
}

func main() {
 ch1 := make(chan string)
 ch2 := make(chan string)

 go worker("goroutine 1", ch1, 2)
 go worker("goroutine 2", ch2, 1)

 for range 2 {
  select {
  case msg1 := <-ch1:
   fmt.Println("received", msg1)
  case msg2 := <-ch2:
   fmt.Println("received", msg2)
  }
 }
}

```

Here we will get

```text
received done goroutine 2
received done goroutine 1
```

This is really a powerful feature of Go, and becomes really useful when dealing with multiple channels and multiple goroutines. For example, if the computation of goroutine 2 is done before goroutine 1, there is no point in blocking goroutine 1's operations.

Like `switch`, the `select` statement also takes a default statement, it enables non-blocking channel operations. It would be much easier to explain with an example

```go
package main

import (
 "fmt"
 "time"
)

func main() {
 messages := make(chan string)
 signals := make(chan bool)

 // Non blocking receive
 select {
 case msg := <-messages:
  fmt.Println("received message", msg)
 default:
  fmt.Println("no message received")
 }

 // Non blocking send
 select {
 case messages <- "hello":
  fmt.Println("sent message", "hello")
 default:
  fmt.Println("no message sent")
 }

 // Using default for non-blocking multi way select
 select {
 case msg := <-messages:
  fmt.Println("received message", msg)
 case sig := <-signals:
  fmt.Println("received signal", sig)
 default:
  fmt.Println("no activity")
 }

 // Polling pattern: check for messages, do other work if none available
 go func() {
  time.Sleep(200 * time.Millisecond)
  messages <- "delayed message"
 }()

 go func() {
  time.Sleep(500 * time.Millisecond)
  signals <- true
 }()

 // Poll for messages while doing other work
 for i := 0; i < 5; i++ {
  select {
  case msg := <-messages:
   fmt.Println("received:", msg)
  case sig := <-signals:
   fmt.Println("received: signal ", sig)
  default:
   fmt.Printf("doing other work (iteration %d)\n", i)
   time.Sleep(50 * time.Millisecond)
  }
 }
}

```

On first `select` we are receiving message from `messages` channel in a non-blocking manner, on second `select` we are sending message to `messages` channel. On third `select` we are receiving from multi channels in non-blocking way.

We execute two anonymous functions and set different sleep intervals, in our example `delayed message` will be received.

On final `select` we have a fictional polling, where we do other work in between waiting for messages and signals.

The output would be

```text
no message received
no message sent
no activity
doing other work (iteration 0)
doing other work (iteration 1)
doing other work (iteration 2)
doing other work (iteration 3)
received: delayed message
```

Live example: <https://go.dev/play/p/qHc9Rx3RBTG>

## Conclusion

The simplified concurrency is one of the selling points of Go, it's really simple yet very powerful. We can easily write concurrent fast Go applications using these tools provided by Go, here is an example of how concurrency makes our program faster

```go
package main

import (
 "encoding/json"
 "fmt"
 "io"
 "net/http"
 "sync"
 "time"
)

var apiUrl = "https://pokeapi.co/api/v2/"

type PokemonType struct {
 Name           string `json:"name"`
 Height         int    `json:"height"`
 Weight         int    `json:"weight"`
 BaseExperience int    `json:"base_experience"`
}

func getPokemonDetails(p string) error {
 pokemonResponse := PokemonType{}
 url := apiUrl + "pokemon/" + p
 res, err := http.Get(url)

 if err != nil {
  return err
 }
 defer res.Body.Close()

 if res.StatusCode != http.StatusOK {
  return fmt.Errorf("failed to fetch data: %s", res.Status)
 }

 decodedData, err := io.ReadAll(res.Body)

 if err != nil {
  return err
 }
 err = json.Unmarshal(decodedData, &pokemonResponse)

 if err != nil {
  return err
 }
 fmt.Printf("Name: %s, Height: %d, Weight: %d, Base Experience: %d\n",
  pokemonResponse.Name,
  pokemonResponse.Height,
  pokemonResponse.Weight,
  pokemonResponse.BaseExperience,
 )
 return nil

}

func main() {
 fmt.Println("Hello Goroutine")
 func() {
  start := time.Now()
  withoutGoroutine()
  elapsed := time.Since(start)
  fmt.Printf("Without Goroutine took %s\n", elapsed)
 }()

 func() {
  start := time.Now()
  withGoRoutine()
  elapsed := time.Since(start)
  fmt.Printf("With Goroutine took %s\n", elapsed)
 }()

}

func withGoRoutine() {
 var wg sync.WaitGroup

 wg.Go(func() {
  getPokemonDetails("ditto")
 })
 wg.Go(func() {
  getPokemonDetails("charizard")
 })

 wg.Go(func() {
  getPokemonDetails("abra")
 })
 wg.Wait()

}

func withoutGoroutine() {
 getPokemonDetails("piplup")
 getPokemonDetails("bulbasaur")
 getPokemonDetails("hypno")

}

```

Example output:

```text
Hello Goroutine
Name: piplup, Height: 4, Weight: 52, Base Experience: 63
Name: bulbasaur, Height: 7, Weight: 69, Base Experience: 64
Name: hypno, Height: 16, Weight: 756, Base Experience: 169
Without Goroutine took 578.913833ms
Name: ditto, Height: 3, Weight: 40, Base Experience: 101
Name: abra, Height: 9, Weight: 195, Base Experience: 62
Name: charizard, Height: 17, Weight: 905, Base Experience: 240
With Goroutine took 68.407375ms
```

This is what I got on first run, it will vary on your machine, but I can guarantee you that, the one with goroutine will always be faster

I would highly recommend checking out these resources as well to learn more about Go concurrency

* <https://go.dev/tour/concurrency/11>
* <https://www.youtube.com/watch?v=LvgVSSpwND8&>
* <https://www.youtube.com/watch?v=y2jP45S9BHk>

