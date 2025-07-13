---
title: A Note About Big O Notation
description: My personal reference on Big O Noation.
tags: [algorithms, javascript, dom]
pubDate: 'jul 13 2025'
heroImage: '/a-note-on-big-o-notation.webp'
---
# A Note About Big O Notation

*P.S. This is for my personal reference. If you spot anything wrong, please open an issue on GitHub.*

We use Big O Notation every day while writing code. Most standard-library algorithms are already designed with it in mind, yet many of us hardly think about it. Every time we make a decision in code, though, it matters. Below is a plain-English look at Big O Notation that anyone who works on the web can follow without much trouble.

Big O Notation measures how much **time** and **space** a program needs as its input grows. Think of washing dishes: if it takes two minutes to wash one plate, it would take one hundred minutes to wash fifty plates. In code, the same idea helps us predict how a function behaves when data sizes explode.

I will use DOM manipulation examples to explain four common complexities.

---

## 1. `O(1)` — Constant time

A program runs in the same time, no matter the input. Fetching an element by id with `getElementById` is typically `O(1)`. Regardless of whether the page holds one element or ten thousand, the lookup cost stays constant.

```js
const header = document.getElementById("header");
```

*(Browsers implement fast id lookups internally, so in practice this is as close to constant as we get.)*

---

## 2. `O(n)` — Linear time

Execution time grows in direct proportion to input size. Washing fifty plates takes fifty times longer than washing one. Here is a DOM example: find all buttons, then update each one.

```js
const buttons = document.querySelectorAll("button"); // n buttons
buttons.forEach(btn => {
  btn.style.background = "yellow";
});
```

Collecting the NodeList already costs `n` steps. Styling every node adds another `n`, so the total work rises linearly with the number of buttons.

---

## 3. `O(n²)` — Quadratic time

Now things get interesting. If every guest at a party greets every other guest, the number of handshakes skyrockets. Ten guests need forty-five introductions, fifty guests need twelve hundred twenty-five. The formula is `n (n – 1) / 2`.

Here is a DOM example: highlight duplicate list items in a naive way.

```js
const items = Array.from(document.querySelectorAll(".item"));

for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < items.length; j++) {
    if (i === j) continue;                              // skip self-comparison
    if (items[i].textContent === items[j].textContent) {
      console.log("duplicate item is:", items[i]);
      items[i].classList.add("duplicate");
    }
  }
}
```

With ten list items the code performs one hundred comparisons. With one hundred items it performs ten thousand, making it painfully slow for large data sets. We usually refactor such logic into something closer to `O(n)` with a map or set.

---

## 4. `O(log n)` — Logarithmic time

Logarithmic growth feels like magic. Each step slices the work roughly in half. Imagine hunting for a book called *Introduction to Algorithms* in an alphabetized library. Instead of starting at “A,” you jump directly to the “I” section, instantly discarding half the shelves.

Binary search is the classic example. Suppose we have an alphabetically ordered list of names and need to find “Charlie.”

```html
<ul id="names">
  <li>Alice</li>
  <li>Bob</li>
  <li>Charlie</li>
  …
  <li>Zoey</li>
</ul>
```

```js
const items = Array.from(document.querySelectorAll("#names li"));

function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = arr[mid].textContent.trim();

    if (value === target) {
      return mid;                 // found it
    } else if (value < target) {
      low = mid + 1;              // target is in upper half
    } else {
      high = mid - 1;             // target is in lower half
    }
  }
  return -1;                      // not found
}

const nameToFind = "Charlie";
const index = binarySearch(items, nameToFind);

if (index !== -1) {
  console.log(`Found "${nameToFind}" at index ${index}`, items[index]);
  items[index].style.backgroundColor = "lightgreen";
} else {
  console.log(`"${nameToFind}" not found in the list.`);
}
```

Worst-case comparisons:

* 10 items → 4 checks
* 100 items → 7 checks
* 1000 items → 10 checks

Every time you double the data size you add **one** extra comparison. That is why `O(log n)` scales beautifully.

---

## A quick note on space complexity

Big O also measures **memory** usage. A function that creates no extra structures beyond a few variables has `O(1)` space complexity. One that copies an input array of length `n` into a new array uses `O(n)` extra space. Sometimes a time/space trade-off is worth it, for example when a hash map speeds lookups to constant time at the cost of additional memory.

---

### Final thoughts

* Big O Notation focuses on growth, not exact milliseconds.
* When in doubt, benchmark, then refactor the bottleneck.
* Think about both time **and** space, and pick the right balance for your data size.

Happy coding, and may your plate-washing stay quick even when the stack gets tall.
