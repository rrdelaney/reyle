# :sunny: Reyle :sunny: [![Build Status](https://travis-ci.org/rrdelaney/reyle.svg?branch=master)](https://travis-ci.org/rrdelaney/reyle)

Styling for Javascript

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Reyle, { StyleSheet } from 'reyle'

const styles = StyleSheet.create({
  example: {
    color: 'white',
    backgroundColor: 'blue'
  }
})

class Example extends Component {
  render () {
    return <div className={styles.example}>
      Hello!
    </div>
  }
}

Reyle.loadIntoDOM()
ReactDOM.render(<Example />, document.getElementById('root'))
```

### Main differences to other solutions
- Uses real CSS, either injected or preloaded
- Works with React, both on server and client
- Built in HMR
- Autoprefixing
- Nested selectors

## How does it work?
Reyle takes each stylesheet you create and transforms it into pure CSS. The CSS can be exported,
or loaded directly into the DOM (`Reyle.loadIntoDOM`). This allows Reyle to be used in a universal
setting. Reyle is also smart about what it can render on the server to try to minimize the injected
CSS. By using identifiers with each stylesheet, Reyle can trace what styles are loaded. This is
built into the React helper.

## How to use

```js
import Reyle, { StyleSheet } from 'reyle'

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

Reyle.loadIntoDOM()
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
import { applyStyles } from 'reyle'

class MyComponent extends Component {
  // ...
}

applyStyles({
  // ...
})(MyComponent)
```
