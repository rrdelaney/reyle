import test from 'ava'
import { StyleSheet } from './reyle'

test.afterEach(() => {
  StyleSheet.destroy()
})

test('class names', t => {
  StyleSheet.create({
    class1: {
      color: 'blue'
    },
    class2: {
      color: 'green'
    }
  })

  t.pass()
})
