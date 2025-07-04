export function circle(x: number, y: number, radius: number) {
  // https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
  // return [
  //   ['M', x + radius, y],
  //   ['a', radius, radius, 0, 1, 1, radius * -2, 0],
  //   ['a', radius, radius, 0, 1, 1, radius * 2, 0],
  //   ['Z'],
  // ]

  // https://github.com/jarek-foksa/path-data-polyfill
  // return [
  //   ['M', x, y - radius],
  //   ['A', radius, radius, 0, 0, 0, x, y + radius],
  //   ['A', radius, radius, 0, 0, 0, x, y - radius],
  //   ['Z'],
  // ]

  return `M ${x} ${y - radius}
A ${radius} ${radius} 0 0 0 ${x} ${y + radius}
A ${radius} ${radius} 0 0 0 ${x} ${y - radius}
Z`
}
