export class Statement{

    public Index: number;
    public StatementText: string;
    public Explanation: string;

    constructor(
        index: number = 0,
        statementText: string = '',
        explanation: string= '') {
        this.Index = index;
        this.StatementText = statementText;
        this.Explanation = explanation;
    }
}