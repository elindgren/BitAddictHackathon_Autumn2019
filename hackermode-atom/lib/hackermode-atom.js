'use babel';

import HackermodeAtomView from './hackermode-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  hackermodeAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hackermodeAtomView = new HackermodeAtomView(state.hackermodeAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hackermodeAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hackermode-atom:hack': () => this.hack()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hackermodeAtomView.destroy();
  },

  serialize() {
    return {
      hackermodeAtomViewState: this.hackermodeAtomView.serialize()
    };
  },

  hack() {
    let editor
    if (editor=atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
