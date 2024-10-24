import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Interpreter from './core/Interpreter';

import Registers from './core/Registers';
import RegistersTable from './ui/RegistersTable';

const editor = aceBuilds.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");


function setupRegisters(div : HTMLElement) : void{
    RegistersTable.build();
    div.appendChild(RegistersTable.getTable());
}


const divRegisters : HTMLElement = document.getElementById("registers")!;
setupRegisters(divRegisters);

// first Test
Registers.set("r1", 1)
Registers.set("r2", 2)
Registers.set("r3", 3)

let code = `
add r1, r2, r3
add r4, r2, r3
`

const compiler = new Compiler(code);
const interpreter = new Interpreter(compiler.getInstructions());
interpreter.executeAll()

//const buttonExecuteAll = document.getElementById("executeAll");
//buttonExecuteAll!.addEventListener("click", main);
