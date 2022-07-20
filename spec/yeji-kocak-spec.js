'use babel';

import YejiKocak from '../lib/yeji-kocak';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('YejiKocak', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('yeji-kocak');
  });

  describe('when the yeji-kocak:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.yeji-kocak')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'yeji-kocak:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.yeji-kocak')).toExist();

        let yejiKocakElement = workspaceElement.querySelector('.yeji-kocak');
        expect(yejiKocakElement).toExist();

        let yejiKocakPanel = atom.workspace.panelForItem(yejiKocakElement);
        expect(yejiKocakPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'yeji-kocak:toggle');
        expect(yejiKocakPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.yeji-kocak')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'yeji-kocak:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let yejiKocakElement = workspaceElement.querySelector('.yeji-kocak');
        expect(yejiKocakElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'yeji-kocak:toggle');
        expect(yejiKocakElement).not.toBeVisible();
      });
    });
  });
});
