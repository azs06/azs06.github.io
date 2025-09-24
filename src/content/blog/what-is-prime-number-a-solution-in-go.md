---
title: Prime Number in Go
description: Understanding prime numbers in Golang with examples
tags: [Golang, Prime Numbers, Programming]
pubDate: 'Sept 23 2025'
heroImage: '/blog-placeholder-1.jpg'
---

### Intro to Prime Numbers

A prime number is an integer greater than 1 that is only divisible by 1 and itself. For example: 2, 3, 5, 7, 11.

Basic ways to check if a number is prime:

1. Is it greater than 1?
2. Trial division: test divisibility by any number between 2 and n-1.
3. Optimized trial division: only test divisors between 2 and the square root of the number.

### Prime Number in Go

```go
package main

import (
 "fmt"
)

func isPrime(n int) bool {
    if n <= 1 {
        return false
    }
    for i := 2; i < n; i++ {
        if n%i == 0 {
            return false
        }
    }
    return true
}

func printPrimes(max int) {
    for n := 2; n <= max; n++ {
        if isPrime(n) {
            fmt.Println(n)
        }
    }
}

func main() {
 printPrimes(100)
}

```

#### Optimized version using square root

```go

package main

import (
    "fmt"
    "math"
)

func isPrime(n int) bool {
    if n < 2 {
        return false
    }
    if n == 2 {
        return true
    }
    if n%2 == 0 {
        return false
    }

    // Check odd divisors up to sqrt(n)
    limit := int(math.Sqrt(float64(n)))
    for i := 3; i <= limit; i += 2 {
        if n%i == 0 {
            return false
        }
    }
    return true
}

```
