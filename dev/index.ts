import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { EditorView, highlightActiveLine } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { xml } from '@codemirror/lang-xml';
import { Vim, vim } from "../src/"

import * as commands from "@codemirror/commands";

const doc = `
import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { vim } from "../src/"

const doc = \`
console.log('hi')
\`

Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. 
Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Wenn's dann um meine Augen dämmert, und die Welt um mich her und der Himmel ganz in meiner Seele ruhn wie die Gestalt einer Geliebten - dann sehne ich mich oft und denke : ach könntest du das wieder ausdrücken, könntest du dem Papiere das einhauchen, was so voll, so warm in dir lebt, daß es würde der Spiegel deiner Seele, wie deine Seele ist der Spiegel des unendlichen Gottes! - mein Freund - aber ich gehe darüber zugrunde, ich erliege unter der Gewalt der Herrlichkeit dieser Erscheinungen.Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. 
Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen,

new EditorView({
  state: EditorState.create({
    doc,
    extensions: [vim(), basicSetup, javascript()],
  }),
  parent: document.querySelector('#editor'),
});

`;


let wrapCheckbox = document.getElementById("wrap") as HTMLInputElement
wrapCheckbox.checked = localStorage.wrap == "true"
wrapCheckbox.onclick = function() {
  updateView();
  localStorage.wrap = wrapCheckbox.checked;
}
let htmlCheckbox = document.getElementById("html") as HTMLInputElement
htmlCheckbox.checked = localStorage.html == "true"
htmlCheckbox.onclick = function() {
  updateView();
  localStorage.html = htmlCheckbox.checked;
}
let statusBox = document.getElementById("status") as HTMLInputElement
statusBox.checked = localStorage.status == "true"
statusBox.onclick = function() {
  updateView();
  localStorage.status = statusBox.checked;
}
let jjBox = document.getElementById("jj") as HTMLInputElement
jjBox.checked = localStorage.jj == "true"
jjBox.onclick = function() {
  if (jjBox.checked)
    Vim.map("jj", "<Esc>", "insert");
  else 
    Vim.unmap("jj", "insert")
  localStorage.status = statusBox.checked;
}
jjBox.onclick()


let global = window as any;
global._commands = commands;
global._Vim = Vim;

let view
function updateView() {
  if (view) view.destroy()
  view = global._view = new EditorView({
    state: EditorState.create({
      doc: htmlCheckbox.checked ? document.documentElement.outerHTML : doc,
      extensions: [
        // make sure vim is included before all other keymaps
        vim({status: statusBox.checked}), 
        // include the default keymap and all other keymaps you want to use in insert mode
        basicSetup,
        htmlCheckbox.checked ? xml(): javascript(), 
        highlightActiveLine(),
        wrapCheckbox.checked && EditorView.lineWrapping,
      ].filter(Boolean),
    }),
    parent: document.querySelector('#editor'),
  });

  if (jjBox.checked) {
    Vim.map
  }
}

updateView()
