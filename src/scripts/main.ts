import aceBuilds from 'ace-builds/src-min-noconflict/ace';

import Compiler from './core/Compiler';
import Instruction from './models/Instruction';
import Interpreter from './core/Interpreter';


/* Setting up code editor */
const editor = aceBuilds.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");


let code : string =  editor.getValue();
const compiler = new Compiler(code)
let instructions : Instruction[] = compiler.obtainInstructions()

const interpreter = new Interpreter(instructions);