// import 'pixi-7'
// import 'pixi-7-graphics-extras'
// import 'pixi-7-sound'

// declare global {
//   declare namespace PIXI {
//     export * from 'pixi-7'
//     export * from 'pixi-7-graphics-extras'
//     export * as sound from 'pixi-7-sound'
//   }
// }

import './pixi'

declare global {
  declare namespace PIXI {
    export * from './pixi'
  }
}
