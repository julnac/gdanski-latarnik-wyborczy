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
}