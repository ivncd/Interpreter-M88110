import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Interpreter from './core/Interpreter';

import Registers from './core/Registers';
import RegistersTable from './ui/RegistersTable';
import StatusTable from './ui/StatusTable';


aceBuilds.config.set('basePath', '/ace');
const editor = aceBuilds.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.setValue("");

function setupRegisters(div : HTMLElement) : void{
    RegistersTable.build();
    div.appendChild(RegistersTable.getTable());
}

function setupStatus(div : HTMLElement) : void{
    StatusTable.build();
    div.appendChild(StatusTable.getTable());
}


const divRegisters : HTMLElement = document.getElementById("registers")!;
setupRegisters(divRegisters);

const divStatus : HTMLElement = document.getElementById("status")!;
setupStatus(divStatus);



// first Test
Registers.set("r1", 1)
Registers.set("r2", 2)
Registers.set("r3", 3)

editor.setValue("add r5, r2, r3\nadd r6, r5, r1\nsub r7, r1, 2");

function main(){
    let code = editor.getValue();

    const compiler = new Compiler(code);
    const interpreter = new Interpreter(compiler.getInstructions());
    interpreter.executeAll()
}

const buttonExecuteAll = document.getElementById("executeAll");
buttonExecuteAll!.addEventListener("click", main);