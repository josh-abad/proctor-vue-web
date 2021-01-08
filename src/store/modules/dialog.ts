import { DialogContent, DialogState, RootState } from '@/types'
import { Module } from 'vuex'
import { CLOSE_DIALOG, DISPLAY_DIALOG } from '../mutation-types'

export default {
  state: () => ({
    dialog: {
      header: '',
      message: '',
      actionLabel: '',
      closed: true
    }
  }),
  mutations: {
    [DISPLAY_DIALOG] (state, dialogContent: Omit<DialogContent, 'closed'>): void {
      state.dialog.closed = false
      state.dialog.header = dialogContent.header
      state.dialog.actionLabel = dialogContent.actionLabel
      state.dialog.message = dialogContent.message
    },
    [CLOSE_DIALOG] (state): void {
      state.dialog.closed = true
      state.dialog.header = ''
      state.dialog.actionLabel = ''
      state.dialog.message = ''
    }
  }
} as Module<DialogState, RootState>
