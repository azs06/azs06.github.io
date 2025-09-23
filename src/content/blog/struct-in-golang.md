---
title: Struct in Golang
description: Understanding structs in Golang with examples
tags: [Golang, Structs, Programming]
pubDate: 'Sept 23 2025'
heroImage: '/golang-struct.webp'
---
### Intro to Struct in Golang

Go is an  amazing programming language, it's highly performant compared scripting languages like Python and JavaScript. It's not an object oriented programming language and it doesn't require any virtual machine like Java to run. One of the best feature of the language to me it's when you compile the program you get a single native build file, it's just amazing. The go programming language syntax is somewhat inspired by C like languages, with some changes and caveats. Go comes with types out of the box and it comes with great features out of the box. I can go on talking about why go is one of my favourite language all day, instead let's focus on two important features of the language. I absolutely adore these features about the go programming language.

### Struct

Struct is how you define types in go, say you have a person type, this is how you would define them in go

```go
  package main
  import (
    "fmt"
  )

  type Person struct {
    name string
    age float64
    job string
    salary int
    phone int
  }

```

That's pretty much it, another great thing about go is it's built in type checking, say if you have a function that prints out a person details, something like this

```go

  package main

  import ("fmt")

  func printPerson(p Person){
    fmt.Println(p.name)
    fmt.Println(p.age)
    fmt.Println(p.job)
    fmt.Println(p.salary)
    fmt.Println(p.phone)
  }

  func main(){
    myself := Person{
      name: "soikat"
      age: 35.5
      job: "Tech writer"
      salary: 0
      phone: 0128282292
    }

    printPerson(myself)

    //this will give error
    printPerson("something else")
    // this will aslo give error
    missingPerson := Person{
     name: "missing"
     age: 10
    }
    printPerson(missingPerson)
    // this is not fullfilling Person struct and will throw an error

}

```

Pretty cool isn't it? Wanna see something even cooler ? Say you want to add a functionality to each person, like checking their availability within the database, or check if a person has a phone number or not, you could write a function and use that function by passing a person as a parameter, or you can attach a function to struct itself, we call them methods, let's see an example

```go
  // oversimplified phone checking function
  func (p Person) checkPhone() bool {
   if p.phone != 0 {
      return true
   }
   return false
  }

  /*
    Now we can check any person's phone like this(using the myself Person we created earlier)
  */

  fmt.Println(myself.checkPhone())

```

Cool, isn't it? Go doesn't have anything like classes, but with features like this, you will be not missing them :-)

I absolutely love this about go, it's just so simple. To learn more about go methods

1. https://gobyexample.com/methods

2. https://go.dev/tour/methods/1

3. https://go101.org/article/method.html