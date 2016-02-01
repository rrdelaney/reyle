# Stylesheet

Styling for Javascript!

### Main differences to other solutions
- All javascript
- Autoprefixing
- Chained selectors
- Injects CSS into webpage
- Works with React!

## How to use

```js
import { StyleSheet } from 'relye'
import { loadIntoDOM } from 'relye/dom'

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
    '%input': {
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

Relye provides a nice helper to use with React

```js
import React, { Component } from 'react'
import { applyStyles } from 'relye/react'

class MyComponent extends Component {
  // ...
}

applyStyles({
  // ...
})(MyComponent)
```
