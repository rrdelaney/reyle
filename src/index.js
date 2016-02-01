import Prefixer from 'inline-style-prefixer'
import { uuid } from './uitls/uuid'

export class StyleSheet {
  static rules = [];
  static components = [];

  static create (rules, identifier = '') {
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
            const newClassName = identifier
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
  }

  static getCSS () {
    return {
      css: StyleSheet.rules.map(s => s.rule).join('\n'),
      components: StyleSheet.components.join('+')
    }
  }
}
