import { StatementAnswer } from "../enums/StatementAnswer";

export class Answer {
  public statementAnswer: StatementAnswer;

  constructor(
    statementAnswer = StatementAnswer.Unselected) 
  {
    this.statementAnswer = statementAnswer;
  }

    public isAnswered(): boolean {
        return this.statementAnswer === StatementAnswer.Neutral ||
                this.statementAnswer === StatementAnswer.Agree ||
                this.statementAnswer === StatementAnswer.Disagree;
    }
}