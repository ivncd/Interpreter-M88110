import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Interpreter from './core/Interpreter';

import Registers from './core/Registers';
import RegistersTable from './ui/RegistersTable';
import StatusTable from './ui/StatusTable';
import MemoryTable from './ui/MemoryTable';

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

function setupMemory(div : HTMLElement) : void{
    MemoryTable.build();
    div.appendChild(MemoryTable.getTable());
}



const divRegisters : HTMLElement = document.getElementById("registers")!;
setupRegisters(divRegisters);

const divStatus : HTMLElement = document.getElementById("status")!;
setupStatus(divStatus);

const divMemory : HTMLElement = document.getElementById("memory")!;
setupMemory(divMemory);

// first Test
console.log(Registers.map)
console.log(RegistersTable.table)
Registers.set("r1", 1)
Registers.set("r2", 2)
Registers.set("r3", 3)
Registers.set("r4", 4294967000);
Registers.set('r5', 500);
editor.setValue("add r10, r4, 294\nadd r11, r10, -1\naddu r12, r11, 2");

function main(){
    let code = editor.getValue();

    const compiler = new Compiler(code);
    const interpreter = new Interpreter(compiler.getInstructions());
    interpreter.executeAll()
}

const buttonExecuteAll = document.getElementById("executeAll");
buttonExecuteAll!.addEventListener("click", main);