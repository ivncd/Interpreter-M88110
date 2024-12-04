import Status from "./core/Status";

export class CompilationError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "CompilationError";
    }
}

export class ExecutionError extends Error {
    constructor(message : string = "", errorType : string = "") {
        super(message);
        this.name = "ExecutionError";
        if(errorType != "")
            this.updateStatus(errorType);
    }

    // TODO: check this
    private updateStatus(errorType : string) : void{
        Status.set(errorType, 1)
    }
}