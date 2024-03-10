import { SignificanceAnswer } from "../enums/SignificanceAnswer";
import { StatementAnswer } from "../enums/StatementAnswer";

export class Answer {
  public statementAnswer: StatementAnswer;
  public significanceAnswer: SignificanceAnswer;

  constructor(
    statementAnswer = StatementAnswer.Unselected,
    significanceAnswer = SignificanceAnswer.Unselected) 
  {
    this.statementAnswer = statementAnswer;
    this.significanceAnswer = significanceAnswer;
  }

    public isAnswered(): boolean {
        return this.statementAnswer === StatementAnswer.Neutral ||
            ((this.statementAnswer === StatementAnswer.Agree ||
                this.statementAnswer === StatementAnswer.Disagree) &&
                this.significanceAnswer !== SignificanceAnswer.Unselected);
    }
}