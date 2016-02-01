# Stylesheet

Styling for Javascript!

### Main differences to other solutions
- All javascript
- Autoprefixing
- Chained selectors
- Injects CSS into webpage

## How to use

```js
import { Stylesheet } from 'stylesheet'

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

Stylesheet.load()
```

This creates this stylesheet in the browser

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