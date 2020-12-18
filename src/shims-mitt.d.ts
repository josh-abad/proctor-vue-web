import { ComponentCustomProperties } from 'vue'
import mitt from 'mitt'

const emitter = mitt()

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $emitter: emitter;
  }
}
