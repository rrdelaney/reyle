# Usage in browser

Using Reyle in the browser is also very easy, without any library For
example, given the HTML file and these scripts:

```html
<html>
  <body>
    <div id="root"></div>
    <script src="reyle.js"></script>
    <script src="button.js"></script>
  </body>
</html>
```

```js
// button.js
var styles = Stylesheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white'
  }
})

document
  .getElementById('.root')
  .classList
  .append(styles.button)
```

No UMD build exists yet, but there should be one soon!
