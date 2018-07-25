import { StyleSheet as Aphrodite } from 'aphrodite'

const { StyleSheet, css } = Aphrodite.extend([{
    selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
        if (selector[0] === '&') return generateSubtreeStyles(`${baseSelector} ${selector.slice(1)}`)
        if (selector[0] === '>') return generateSubtreeStyles(`${baseSelector} > ${selector.slice(1)}`)
        return null;
    }
}])
export { StyleSheet,css }
