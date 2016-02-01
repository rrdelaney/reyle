# Using Reyle with React

Reyle providers a convenient helper to use with React that also allows for
isomorphic rendering too.

Basic usage is:

```js
import React, { Component } from 'react'
import { applyStyles } from 'reyle/react'

export class Button extends Component {
  render () {
    return <button className={this.styles.button}>
      Click Me!
    </button>
  }
}

applyStyles({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    ':hover': {
      color: 'dark-blue'
    }
  }
})(Button)
```

This also works with Stateless Functional Components:

```js
import React from 'react'
import { applyStyles } from 'reyle/react'

export function Button () {
  return <button className={this.styles.button}>
    Click Me!
  </button>
}

applyStyles({
  // ...
})(Button)
```
