# Basic Usage

You can use Reyle without any other libraries, and even outside of the browser.
It's easy to do this. For example, to create a StyleSheet:

```js
import { StyleSheet } from 'reyle'

const styles = StyleSheet.create({
  myClass: {
    color: 'blue',
    textAlign: 'center'
  },
  otherClass: {
    color: 'green'
  }
})

console.log(styles) // { myClass: '_0', otherClass: '_1' }
```

When finally ready to grab all of your CSS, it's very easy too:

```js
import { StyleSheet } from 'reyle'

const CSS = StyleSheet.getCSS().css
```

`CSS` is then a CSS stylesheet ready to be printed to a file, or really whatever
you want.
