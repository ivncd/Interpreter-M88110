import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Instruction from './models/Instruction';
import Interpreter from './core/Interpreter';


import RegistersTable from './ui/RegistersTable';

/* Setting up code editor */
function setupEditor(editorId : string) : void{
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
}

function setupRegisters(div : HTMLElement) : void{
    RegistersTable.build();
    console.log(RegistersTable.getTable())
    div.appendChild(RegistersTable.getTable());
}



const divRegisters : HTMLElement = document.getElementById("registers")!;
const buttonExecuteAll = document.getElementById("executeAll");

const editor = aceBuilds.edit("editor");
setupEditor(editor)
setupRegisters(divRegisters);

//buttonExecuteAll?.addEventListener("click", main);
