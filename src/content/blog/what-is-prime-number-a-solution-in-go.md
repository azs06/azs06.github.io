---
title: Prime Number in Go
description: Understanding prime numbers in Golang with examples
tags: [Golang, Prime Numbers, Programming]
pubDate: 'Sept 23 2025'
heroImage: '/blog-placeholder-1.jpg'
---

### Intro to Prime Numbers

A prime number is a number that is greater that 1 and only divislbe by 1 and itself. For example, 2, 3, 5, 7, 11 are prime numbers.

Here is the basic algorithm to check if a number is prime or not:

1. Is it greater than 1?
2. Check if it is divisible by any number between 2 and upto n-1 of the number.
3. Another approach is to check if it is divisible by any number between 2 and the square root of the number.

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
 for i := 2; i < n; i ++ {
  if n % i == 0 {
   return false
  }
 }
 return true
}

func printPrimes(max int) {
 for n := 0; n < max + 1; n ++ {
  if isPrime(n) == true {
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
    if n % 2 == 0 {
        return false
    }
    
    // Check odd divisors up to sqrt(n)
    // Before using math.Sqrt, we need to convert it to float64
    limit := int(math.Sqrt(float64(n)))
    for i := 3; i <= limit; i += 2 {
        if n % i == 0 {
            return false
        }
    }
    return true
}

```
