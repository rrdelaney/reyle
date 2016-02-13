# Reyle API

## `StyleSheet`

StyleSheet is a object that exports two methods

#### `StyleSheet.create`

Creates a stylesheet saves into `StyleSheet.rules`. Takes in a styles object.
Returns a mapping of old classnames to unique id's. For example:

```js
var styles = StyleSheet.create({
  example: {
    color: 'blue'
  }
})

// styles = {
//   example: 'UNIQUE_IDENTIFER'
// }
```

#### `StyleSheet.getCSS`

Returns an object with two properties. `StyleSheet.getCSS().css` is a string
that contains a CSS file ready to be processed. `StyleSheet.getCSS().components`
returns a value to be set on any style objects created in the DOM. See
[UsageOnServer.md](https://github.com/rrdelaney/reyle/blob/master/docs/UsageOnServer.md)
for a more in-depth explanation.

## `applyStyles`

Wrapper for applying `StyleSheet.create` to classes and named functions.
Ideally used for React components.

## `loadIntoDOM`

Loads all of the stylesheet Reyle currently knows about into the DOM.

## `removeFromDOM`

Disables all stylesheets Reyle has created.
