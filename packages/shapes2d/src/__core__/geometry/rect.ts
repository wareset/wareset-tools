export function rect(x: number, y: number, w: number, h: number) {
  // return [
  //   ['M', x, y],
  //   ['L', x + w, y],
  //   ['L', x + w, y + h],
  //   ['L', x, y + h],
  //   ['Z'],
  // ]

  // return [
  //   ['M', x, y],
  //   ['l', w, 0],
  //   ['l', 0, h],
  //   ['l', -w, 0],
  //   ['Z'],
  // ]

  return `M ${x} ${y}
l ${w} 0
l 0 ${h}
l ${-w} 0
Z`
}
