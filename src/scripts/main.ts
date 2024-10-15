import aceBuilds from 'https://cdn.jsdelivr.net/npm/ace-builds@1.36.2/+esm'

import Compiler from './models/Compiler';
import Instruction from './models/Instruction';
import Interpreter from './models/Interpreter';


/* Setting up code editor */
const editor = aceBuilds.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");


let code : string =  editor.getValue();
const compiler = new Compiler(code)
let instructions : Instruction[] = compiler.obtainInstructions()

const interpreter = new Interpreter(instructions);