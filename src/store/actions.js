import * as types from './mutation-types'

export const setTest = function ({ commit, state }, parm) {
  // console.log('setTest')
  // console.log(parm)
  // console.log(state)
  // console.log(state.xlsModule)
  // let arrXlsModule = state.xlsModule
  // console.log(arrXlsModule)

  // console.log(arrXlsModule)

  commit(types.SET_TEST, parm)
}

export const pushModule = function ({ commit, state }, parm) {
  let arrXlsModule = state.xlsModule.slice()
  console.log(arrXlsModule)
  console.log(parm)
  // arrXlsModule.slice(parm, 1)
  arrXlsModule.push(parm)
  console.log(arrXlsModule)
  commit(types.SET_XLSMODULE, arrXlsModule)
}
