# Writing Reyle styles

## Basic Styling
Writing styles for reyle is very simple and follows the same format of
React Native's StyleSheet. Ex:

```js
import { StyleSheet } from 'reyle'

var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
})
```

Each key is the classname, and the children are styles that apply. Any camelCase
is replaced by the hyphenated alternative.The equivalent CSS to this is:

```css
.container {
  border-radius: 4px;
  border-width: 0.5px;
  ...
}

.title {
  ...
}

.active-title {
  ...
}
```

## Tags and Id's
Reyle also adds selectors for tags and id's:

```js
StyleSheet.create({
  '%h1': {
    // Styles all h1 elements
    fontSize: 24
  },
  '#root': {
    // Styles elements with id="root"
    paddingTop: 50
  }
})
```

## Nested Selectors
Reyle adds support for nested selectors too. This is also how you can apply
hover and active effects with reyle

```js
StyleSheet.create({
  container: {
    ':hover': {
      // Styling for ".container:hover"
    },
    '%button': {
      // Styling for ".container button"
      ':active': {
        // Styling for ".container button:active"
      }
    }
  }
})
```

## Media Queries
Media queries can be achieved with the '@' symbol

```js
StyleSheet.create({
  '@media(...)': {
    container: {
      // Styling for "@media (...) { .container }"
    }
  }
})
```

## CSS Imports
Imports can be done with Reyle quite easily too

```js
StyleSheet.create({
  '@import': 'url("https://fonts.googleapis.com/css?family=Raleway:400,200,700")'
})
```
