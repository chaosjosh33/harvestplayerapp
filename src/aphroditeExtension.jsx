import { StyleSheet as Aphrodite } from 'aphrodite'

const { StyleSheet, css } = Aphrodite.extend([{
    selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
        if (selector[0] === ' ') {
            console.log(selector + ':' + baseSelector)
            generateSubtreeStyles(`${baseSelector} ${selector.slice(1)}`)
        }
        if (selector[0] === '>') nestedTag = generateSubtreeStyles(`${baseSelector} > ${selector.slice(1)}`)
        return null;
    }
}])
export { StyleSheet,css }
