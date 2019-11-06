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
      await sleep(100)
      editor.insertText(data.charAt(i))
    }

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
        console.log(data)
        print_char(data)
        //for (var i = 0; i < data.length; i++) {
        //setTimeout(print_char, 100, data.charAt(i));
        //  await sleep(1000)
        //  console.log("Waited")
        //}
          //
          //setTimeout(this.print_char,10, data.charAt(i))
    });
  },

  toggle() {
    console.log('HackermodeAtom2 was toggled!');
    this.load_hack_file()
  }
};
