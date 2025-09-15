import { Question } from '../../../models/question.model';

export function getCorrectCount(answers: number[], questions: Question[]) {
  return answers.reduce((acc, answer, index) => {
    if (index < questions.length && answer === questions[index].correctIndex) {
      acc++;
    }
    // console.log('acc :>> ', acc);
    return acc;
  }, 0);
}
