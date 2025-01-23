/**
 * Enforce the use of `for..of` loops over `Array.forEach`.
 *
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce `for..of` loops over `Array.forEach`',
      url: 'https://github.com/github/eslint-plugin-github/blob/main/docs/rules/array-foreach.md',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression: node => {
        if (node.callee.property && node.callee.property.name === 'forEach') {
          context.report({ node, message: 'Prefer for...of instead of Array.forEach' })
        }
      },
    }
  },
}
