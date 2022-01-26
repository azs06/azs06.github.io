---
layout: post.njk
pageTitle: Ways to get CSS values in JavaScript
---
Occassionally while working with the dom(document object model) in JavaScript you might have to access CSS values of a certain dom element. There are couple of ways to do it. Let's check them out.

### Getting inline CSS styles

Inline CSS are CSS that are directly added to the dom, for example something like this

```
<div id="app" style="width: 200px; height: 200px; background: rebeccapurple; font-size: 23px;">
</div>

<script>
	const element = document.querySelector('#app');
	console.log(element.style.width);
	console.log(element.style.height);
	console.log(element.fontSize);
	
</script>

```
As you can see, the inline CSS could be retrived by accessing style property of the element. Don't be fooled by seemingly decieving `style` property. You won't be able to access external CSS for any element with this.

You can also use `cssText` property of element's `style` property to get text representation of element's inline css

```
<script>
	const element = document.querySelector('#app');
	console.log(element.style.cssText);
</script>
```

### Getting external CSS(Computed Style)

You can get any element's computed CSS property using `getComputedStyle()` method. This will return all CSS of an element, not only the CSS added in the stylesheets.

```
<style>
#app2{
	width: 200px;
	height: 200px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>
<div id="app2">
</div>
<script>
	const app2 = document.querySelector('#app2');
	console.log(window.getComputedStyle(app2));
</script>
```
This will return all the CSS that element has, including the one you added on Stylesheet, you can use dot(`.`) notation or bracket notation to access any specific property you want.

```
<script>
	const properties = window.getComputedStyle(app2);
	constole.log(properties.borderRadius)
	console.log(properties.width);
	console.log(properties['height'])
</script>
```

	