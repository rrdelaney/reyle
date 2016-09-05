# Usage in browser

Using Reyle in the browser is also very easy, without any library For
example, given the HTML file and these scripts:

```html
<html>
  <body>
    <div id="root"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://unpkg.com/reyle/dist/reyle.js"></script>
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

$('#root').append($(`<div class="${styles.button}">Button</div>`))
```

You can find the latest UMD build at unpkg
