import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Interpreter from './core/Interpreter';

import Registers from './core/Registers';
import RegistersTable from './ui/RegistersTable';


aceBuilds.config.set('basePath', '/ace');
const editor = aceBuilds.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.setValue("");

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

function main(){
    let code = editor.getValue();

    const compiler = new Compiler(code);
    const interpreter = new Interpreter(compiler.getInstructions());
    interpreter.executeAll()
}

const buttonExecuteAll = document.getElementById("executeAll");
buttonExecuteAll!.addEventListener("click", main);