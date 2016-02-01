export function loadIntoDOM (StyleSheet) {
  let newStyle = document.createElement('style')
  newStyle.setAttribute('data-reyle', 'dynamic')

  const preloadedStylesheet = Array.from(document.styleSheets)
    .filter(sheet => sheet.ownerNode.getAttribute('data-reyle') === 'static')[0]

  if (preloadedStylesheet) {
    const preloadedComponents = preloadedStylesheet.ownerNode.getAttribute('data-components').split('+')
    const unloadedComponents = StyleSheet.rules.filter(style => !preloadedComponents.includes(style.component))
    newStyle.innerHTML = unloadedComponents.map(s => s.rule).join('\n')
  } else {
    newStyle.innerHTML = StyleSheet.getCSS().css
  }

  document.head.appendChild(newStyle)
}

export function removeFromDOM () {
  Array.from(document.styleSheets)
    .filter(sheet => sheet.ownerNode.getAttribute('data-reyle') === 'dynamic')
    .forEach(sheet => sheet.disabled = true)
}
