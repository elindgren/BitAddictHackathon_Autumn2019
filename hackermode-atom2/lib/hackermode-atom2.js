'use babel';
var fs = require('fs')

import HackermodeAtom2View from './hackermode-atom2-view';
import { CompositeDisposable } from 'atom';

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function print_char(data){
  let editor
  if (editor = atom.workspace.getActiveTextEditor()) {
    for (var i = 0; i < data.length; i++) {
      //document.body.style.marginTop = "10px"
      delay = Math.floor(Math.random() * 10)*2  // A random delay between 0 and 50 ms
      await sleep(delay)
      //document.body.style.marginTop = "0px"
      editor.insertText(data.charAt(i), options={'preserveTrailingLineIndentation':true, 'normalizeLineEndings':false})
    }
    editor.insertText("\n=========================================================================\n")
    atom.themes.config.settings.core.themes = ["one-dark-ui", "atom-dark-syntax"]
    atom.themes.activateThemes()
    console.log("Returning to standard theme")
  }
}

export default {

  hackermodeAtom2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hackermodeAtom2View = new HackermodeAtom2View(state.hackermodeAtom2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hackermodeAtom2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hackermode-atom2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hackermodeAtom2View.destroy();
  },

  serialize() {
    return {
      hackermodeAtom2ViewState: this.hackermodeAtom2View.serialize()
    };
  },

  load_hack_file(){
    filename = "C:\\Users\\ericl\\github\\hackermode-atom2\\temp.txt"
    data = ''
    // Load txt file
    var readStream = fs.createReadStream(filename, 'utf8');
    readStream.on('data', function(chunk) {
    data += chunk;
    }).on('end', function() {
        // On text load, print it to console
        console.log("Finished reading data")
        print_char(data)
    });
  },

  toggle() {
    console.log('HackermodeAtom2 was toggled!');
    atom.themes.config.settings.core.themes = ["black-and-red-ui", "rbe-matrix-syntax"]
    atom.themes.activateThemes()

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText("=============================== Hackerman V1.337 ==============================\n")
    }
    this.load_hack_file()
  }
};
