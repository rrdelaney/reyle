# :sunny: Reyle :sunny: [![Build Status](https://travis-ci.org/rrdelaney/reyle.svg?branch=master)](https://travis-ci.org/rrdelaney/reyle) [![npm version](https://badge.fury.io/js/reyle.svg)](https://www.npmjs.com/package/reyle) [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

StyleSheet management in Javascript
| [API](https://github.com/rrdelaney/reyle/tree/master/docs/API.md)
| [Docs](https://github.com/rrdelaney/reyle/tree/master/docs)
| [Examples](https://github.com/rrdelaney/reyle/tree/master/examples)

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

## What does it do?
Reyle provides an API to manage styles on a webpage with Javascript. It transforms style objects into pure CSS
which can be injected in the page. There are several other solutions that attempt to do the samething, but Reyle
has several major differences:
- Uses real CSS, either injected or preloaded
- Works with React, both on server and client
- Built in HMR
- Autoprefixing
- Nested selectors

For information on how to write style objects, see [WritingStyles.md](https://github.com/rrdelaney/reyle/blob/master/docs/WritingStyles.md)

## How does it work?
Reyle takes each [stylesheet](https://github.com/rrdelaney/reyle/blob/master/docs/WritingStyles.md) you create and transforms it into pure CSS. The CSS can be exported,
or loaded directly into the DOM (`Reyle.loadIntoDOM`). This allows Reyle to be used in a universal
setting. Reyle is also smart about what it can render on the server to try to minimize the injected
CSS. By using identifiers with each stylesheet, Reyle can trace what styles are loaded. This is
built into the React helper.

Reyle works with universal React applications very well. It can inject styles into the server-rendered payload
so no JS is needed to style elements at first. After all libraries are loaded, Reyle can pick up where it left off
if new styles need to be applied. For an example of this, see [UsageWithIsomorphicReact.md](https://github.com/rrdelaney/reyle/blob/master/docs/UsageWithIsomorphicReact.md).

## How to use

Install the library with `npm i -S reyle`. Using a bundler/loader such as webpack or browserify is recommended.
Otherwise a UMD build is available from unpkg at `https://unpkg.com/reyle/dist/reyle.js`.

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

Reyle provides a nice helper to use with React. By using the wrapper with your components,
you get universal rendering build in. This is because the wrapper assigns each of your components
a unique id that Reyle can identify on the server or client, so it knows not to reapply that
components styles. Server-side rendering isn't necessary to use the React wrapper, but if you ever
switch it adds a lot of benefits.

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
