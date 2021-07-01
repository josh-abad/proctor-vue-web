import { computed } from 'vue'

export default function useModelWrapper<
  P,
  N extends string & keyof P,
  E extends string = `update:${N}`
>(
  props: P,
  emit: (event: E, payload: P[N]) => void,
  name: N = 'modelValue' as N
) {
  return computed({
    get: () => props[name],
    set: payload => emit(`update:${name}` as E, payload)
  })
}
