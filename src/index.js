import Prefixer from 'inline-style-prefixer'

let DEBUG = {
  mangle: true
}

function uuid () {
  let d = new Date().getTime()

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export const StyleSheet = {
  rules: [],
  components: [],

  create (rules, identifier = '') {
    let instanceClasses = {}

    const hyphenate = name => name
      .replace('Webkit', '-webkit')
      .replace(/^ms/g, '-ms')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()

    const addRules = (rules, prefix = '', postfix = '') => {
      let instanceRules = {}

      Object.keys(rules).forEach(rule => {
        if (typeof rules[rule] === 'object') {
          if (rule[0] === '@') {
            addRules(rules[rule], `${prefix} ${rule} {`, `} ${postfix}`)
          } else if (rule[0] === ':') {
            addRules(rules[rule], `${prefix}${rule}`, postfix)
          } else if (rule[0] === '#') {
            addRules(rules[rule], `${prefix} ${rule}`, postfix)
          } else if (rule[0] === '%') {
            addRules(rules[rule], `${prefix} ${rule.substr(1)}`, postfix)
          } else {
            const newClassName = !DEBUG.mangle
              ? rule
              : identifier
              ? '_' + identifier + '_' + rule
              : '_' + uuid()

            instanceClasses[rule] = newClassName
            addRules(rules[rule], `${prefix} .${newClassName}`, postfix)
          }
        } else if (rule === '@import') {
          StyleSheet.rules.unshift({ rule: `@import ${rules[rule]}` })
        } else {
          instanceRules[rule] = rules[rule]
        }
      })

      if (Object.keys(instanceRules).length > 0) {
        const prefixed = Prefixer.prefixAll(instanceRules)
        const instanceStyleSheet = Object.keys(prefixed)
          .map(rule => `  ${hyphenate(rule)}: ${prefixed[rule]};`)
          .join('\n')

        StyleSheet.rules.push({ component: identifier, rule: `${prefix} {\n${instanceStyleSheet}\n}${postfix}` })
      }
    }

    addRules(rules)

    if (identifier) {
      StyleSheet.components.push(identifier)
    }

    return instanceClasses
  },

  getCSS () {
    return {
      css: StyleSheet.rules.map(s => s.rule).join('\n'),
      components: StyleSheet.components.join('+')
    }
  },

  destroy () {
    StyleSheet.rules = []
    StyleSheet.components = []
  }
}

export function loadIntoDOM () {
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

export function applyStyles (styles) {
  return component => {
    const identifier = component.name || '_' + Object.keys(styles).join('_')
    const classNames = StyleSheet.create(styles, identifier)

    component.styles = classNames
    component.prototype.styles = classNames

    if (module && module.hot) {
      module.hot.accept()
      removeFromDOM()
      loadIntoDOM()
    }
  }
}

export default {
  DEBUG,
  loadIntoDOM,
  removeFromDOM,
  applyStyles,
  StyleSheet
}
