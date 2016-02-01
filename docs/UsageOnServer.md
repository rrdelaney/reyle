# Usage on Server

It is possible to preload styles into the DOM so Reyle doesn't need to re-inject
what it doesn't need to. You can tell Reyle what _not_ to reload by specifying
two `data-*` attributes on a stylesheet.

Assume that sometime in your build process you generate a CSS file called
`reyle.styles.css`. You also generate a file called `reyle.components`. This
file is needed because the preloaded stylesheet must tell reyle what components
it includes.
It doesn't have to be this, it can be anything. Here is an
example node script to generate the CSS:

```js
var fs = require('fs')
var StyleSheet = require('reyle').StyleSheet

require(/* all source files you want to preload */)

var result = StyleSheet.getCSS()
fs.writeFileSync('reyle.styles.css', result.css)
fs.writeFileSync('reyle.components', result.components)
```

When using the server, you can then use the generated CSS, like in the following
example:

```js
let fs = require('fs')
let app = require('express')()
let preloadedComponents = fs.readFileSync('reyle.components')

app.get('/reyle.styles.css', (req, res) => {
  res.write(fs.readFileSync('reyle.styles.css'))
})

app.get('/', (req, res) => {
  res.write(`
<html>
  <head>
    <link
      rel="stylesheet"
      href="reyle.styles.css"
      data-reyle="static"
      data-components="${preloadedComponents}">
  </head>
  <body>
    <!-- .... -->
  </body>
</html>`)
})
```

The `data-reyle` property tells Reyle to look at that stylesheet for preloaded
styles. `data-components` lets Reyle know the classes that have already been
added.

For a full example with React, look at UsageWithIsomorphicReact.md
