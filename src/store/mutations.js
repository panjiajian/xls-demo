import * as types from './mutation-types'

const mutations = {
  [types.SET_TEST] (state, test) {
    state.test = test
  },
  [types.SET_XLSMODULE] (state, xlsModule) {
    state.xlsModule = xlsModule
  }
}

export default mutations
