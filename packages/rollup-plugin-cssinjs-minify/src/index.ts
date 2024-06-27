import { jsx2tokens, TOKEN_TYPES } from 'jsx2tokens'

export default function () {
  return {
    name: 'rollup-plugin-cssinjs-minify',
    transform(code: string, id: string) {
      if (/\.[mc]?[tj]sx?$/.test(id) && /\bcss`/.test(code)) {
        const insideTemplate: number[] = []
        const tokens = jsx2tokens(code, {
          proxy(token, index, tokens) {
            if (
              ((token.type === TOKEN_TYPES.TEMPLATE || token.type === TOKEN_TYPES.TEMPLATE_HEAD) &&
                tokens[index - 1] &&
                tokens[index - 1].value === 'css') ||
              ((token.type === TOKEN_TYPES.TEMPLATE_MIDDLE ||
                token.type === TOKEN_TYPES.TEMPLATE_TAIL) &&
                insideTemplate[0] === token.deep)
            ) {
              if (token.type === TOKEN_TYPES.TEMPLATE_HEAD) insideTemplate.unshift(token.deep)
              else if (token.type === TOKEN_TYPES.TEMPLATE_TAIL) insideTemplate.shift()

              token.value = token.value.replace(
                /(?<=\:|\;|\{|\}|\,)\s+|\s+(?=\:|\;|\{|\}|\,)|\s*\n\s*|\/\*[^]*?\*\//g,
                ''
              )
            }
          }
        })
        code = tokens.map((v) => v.value).join('')
        return { code }
      }
      return null
    }
  }
}
