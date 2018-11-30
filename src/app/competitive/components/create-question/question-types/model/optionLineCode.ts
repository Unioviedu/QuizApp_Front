export class OptionLineCode {
    id: number;
    name:string;
    contId: number;
    responses: string[] = []

    constructor(id, name) {
       this.id = id;
       this.contId = 0;
       this.name = name;
       this.addResponse();
    }

    addResponse() {
        this.contId++;
        let id = this.id + '_' + this.contId;

        this.responses.push(id);
        return id;
    }

    removeResponse() {
        return this.responses.pop();
    }
}