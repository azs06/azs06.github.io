---
title: Interfaces in Golang
description: Understanding interfaces in Golang with examples
tags: [Golang, Interfaces, Programming]
pubDate: 'Sept 28 2025'
heroImage: '/golang-interfaces.webp'
---

### Intro to Interfaces in Golang

Like structs, interfaces are another of Go's interesting features. The simplest explanation of an interface is that it defines a collection of method signatures. Go is not an object oriented programming language, but with features like interfaces, it's possible to get some of the benefits of OOP without the complexities. If structs give you structure, interfaces give you behavior, both in combination become really powerful.

Let's see an example:

```go
type Shape interface {
    Area() float64
}
```

Here we have a very simple `Shape` interface. Interfaces are implemented by structs/types, and an interface can be implemented by more than one type.

```go
type Circle struct {
    Radius float64
}

type Rectangle struct {
    Width, Height float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
```

Here, Circle and Rectangle fulfill the Shape interface by implementing the required Area() method, that's pretty much it.  
Any other shape can also fulfill the Shape interface by implementing the Area method; it can be a trapezoid, parabola, hyperbola, as long as it has Area implemented.

Usage of the Area method:

```go
import (
    "fmt"
    "math"
)

func main() {
    c := Circle{Radius: 5}
    rc := Rectangle{Width: 4, Height: 6}
    fmt.Printf("Circle Area: %.2f\n", c.Area())
    fmt.Printf("Rectangle Area: %.2f\n", rc.Area())
    // Output:
    // Circle Area: 78.54
    // Rectangle Area: 24.00
}
```

Even without being an OOP language, with features like this, we can reap the benefits of OOP from Go. It's just so simple and elegant. On the web, if you google interfaces in Go, you will probably come across examples of Shape, as it's quite easy to understand and makes sense with interfaces for Go.

Here is another example:

```go
package main

import (
    "fmt"
    "log"
    "os"
)

type Logger interface {
    Info(msg string)
    Error(msg string)
}

type ConsoleLogger struct{}

func (cl ConsoleLogger) Info(msg string) {
    fmt.Printf("INFO: %s\n", msg)
}

func (cl ConsoleLogger) Error(msg string) {
    fmt.Printf("ERROR: %s\n", msg)
}

// FileLogger implements Logger by writing to a file
type FileLogger struct {
    file *os.File
}

func (fl *FileLogger) Info(msg string) {
    // simulate file logging
    fmt.Fprintf(fl.file, "INFO: %s\n", msg) // Example implementation
}

func (fl *FileLogger) Error(msg string) {
    // simulate file logging
    fmt.Fprintf(fl.file, "ERROR: %s\n", msg) // Example implementation
}

func (fl *FileLogger) Close() error {
    return fl.file.Close()
}

func NewFileLogger(filename string) (*FileLogger, error) {
    file, err := os.Create(filename)
    if err != nil {
        return nil, err
    }
    return &FileLogger{file: file}, nil
}

func someOperation() error {
    // Simulate an operation that might fail
    return nil // Or return an error for testing
}

func ProcessData(logger Logger) {
    logger.Info("Starting data processing")
    // Simulate some work
    if err := someOperation(); err != nil {
        logger.Error(err.Error())
        return
    }
    logger.Info("Data processing completed")
}

func main() {
    consoleLog := ConsoleLogger{}
    ProcessData(consoleLog)

    fileLog, err := NewFileLogger("app.log")
    if err != nil {
        fmt.Println("Error creating file logger:", err)
        return
    }
    defer fileLog.Close()
    ProcessData(fileLog)
}
```

You get the idea: as long as some types fulfill the two methods of Info and Error, they have implemented the Logger interface. If a type does just one, then it will not be fulfilled, and thus the interface will not be implemented.

With interfaces, structs become even more powerful. I like how they work in tandem and make our lives easier when writing Go code.
