import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
  useStore as baseUseStore
} from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { State, Mutations, Actions, Getters } from './interfaces'

const state: State = {
  user: null,
  activeExam: null
}

const store = createStore<State>({
  state,
  getters,
  mutations,
  actions
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore() {
  return baseUseStore() as Store
}

if (import.meta.hot) {
  import.meta.hot?.accept(
    ['./mutations', './actions', './getters'],
    ([newMutations, newActions, newGetters]) => {
      store.hotUpdate({
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    }
  )
}

export default store
