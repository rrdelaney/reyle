import { StyleSheet } from './StyleSheet'

export function apply (styles) {
  return component => {
    const identifier = component.name || '_' + Object.keys(styles).join('_')
    const classNames = StyleSheet.create(styles, identifier)

    component.styles = classNames
    component.prototype.styles = classNames

    if (module && module.hot) {
      module.hot.accept()
      Stylesheet.removeStyles()
      Stylesheet.loadIntoDOM()
    }
  }
}
