# :sunny: Reyle :sunny: [![Build Status](https://travis-ci.org/rrdelaney/reyle.svg?branch=master)](https://travis-ci.org/rrdelaney/reyle)

Styling for Javascript

### Main differences to other solutions
- Uses real CSS, either injected or preloaded
- Works with React, both on server and client
- Built in HMR
- Autoprefixing
- Nested selectors
-
## How to use

```js
import { StyleSheet } from 'reyle'
import { loadIntoDOM } from 'reyle/dom'

const styles = Stylesheet.create({
  myClass: {
    color: 'white',
    backgroundColor: 'blue',
    ':hover': {
      backgroundColor: 'green'
    }
  },
  otherClass: {
    margin: '.5rem',
    '#input': {
      outline: 'none'
    }
  }
})

console.log(styles) // { myClass: '_0', otherClass: '_1' }

loadIntoDOM(StyleSheet)
```

This creates this stylesheet in the browser. The identifiers will be different though!

```css
._0:hover {
  background-color: green;
}

._0 {
  color: white;
  background-color: blue;
}

._1 input {
  outline: none;
}

._1 {
  margin: '.5rem'
}
```

## Usage with React

Reyle provides a nice helper to use with React

```js
import React, { Component } from 'react'
import { applyStyles } from 'reyle/react'

class MyComponent extends Component {
  // ...
}

applyStyles({
  // ...
})(MyComponent)
```
