# Usage with Isomorphic React

Here is a real-world example usage of Reyle and React:

```js
// server.js

import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StyleSheet } from 'reyle'
import Example from './components/Example'

const APP_PORT = 3001

app.use((req, res) => {
  const content = renderToString(<Example />)

  let { components, css } = Stylesheet.getCSS()

  res.send(`
    <!doctype html>
    <html>
      <head>
        <script src="app.js"></script>
        <style data-components="${components}" data-stylesheet="static">
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `)
})

app.listen(APP_PORT, 'localhost', err => {
  console.log('Listening at ' + APP_PORT)
})
```

```js
// client.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet } from 'reyle'
import { loadIntoDOM } from 'reyle/dom'
import Example from './components/Example'

loadIntoDOM(StyleSheet)

ReactDOM.render(<Example />, document.getElementById('root'))
```
