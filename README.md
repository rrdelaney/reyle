# :sunny: Reyle :sunny: [![Build Status](https://travis-ci.org/rrdelaney/reyle.svg?branch=master)](https://travis-ci.org/rrdelaney/reyle)

Styling for Javascript

### Main differences to other solutions
- Uses real CSS, either injected or preloaded
- Works with React, both on server and client
- Built in HMR
- Autoprefixing
- Nested selectors

## Demo

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Reyle, { StyleSheet } from 'reyle'

class Example extends Component {
  render () {
    return <div className={this.styles.example}>
      Hello!
    </div>
  }
}

Reyle.applyStyles({
  example: {
    color: 'white',
    backgroundColor: 'blue'
  }
})(Example)

Reyle.loadIntoDOM()
ReactDOM.render(<Example />, document.getElementById('root'))
```

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
