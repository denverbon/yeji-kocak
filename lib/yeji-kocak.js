'use babel';

import YejiKocakView from './yeji-kocak-view';
import { CompositeDisposable } from 'atom';

export default {

  yejiKocakView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.yejiKocakView = new YejiKocakView(state.yejiKocakViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yejiKocakView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'yeji-kocak:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yejiKocakView.destroy();
  },

  serialize() {
    return {
      yejiKocakViewState: this.yejiKocakView.serialize()
    };
  },

  toggle() {
    console.log('YejiKocak was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
