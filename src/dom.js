import { StyleSheet } from './StyleSheet'

export function loadIntoDOM () {
  let newStyle = document.createElement('style')
  newStyle.setAttribute('data-stylesheet', 'dynamic')

  const preloadedStylesheet = Array.from(document.styleSheets)
    .filter(sheet => sheet.ownerNode.getAttribute('data-stylesheet') === 'static')[0]

  if (preloadedStylesheet) {
    const preloadedComponents = preloadedStylesheet.ownerNode.getAttribute('data-components').split('+')
    const unloadedComponents = Stylesheet.rules.filter(style => !preloadedComponents.includes(style.component))
    newStyle.innerHTML = unloadedComponents.map(s => s.rule).join('\n')
  } else {
    newStyle.innerHTML = Stylesheet.getCSS().css
  }

  document.head.appendChild(newStyle)
}

export function removeFromDOM () {
  Array.from(document.styleSheets)
    .filter(sheet => sheet.ownerNode.getAttribute('data-stylesheet') === 'dynamic')
    .forEach(sheet => sheet.disabled = true)
}
