export class Level {
    id: string;
    idSection: number;
    codSection: number;
    title: string;
    orden: number;
    main: boolean;
    unlocked: boolean;
    complete: boolean;
    numAttemps: boolean;
    numCorrectQuestion: number;
    numIncorrectQuestion: number;
    nextLevels: string[];
    questions: any[];
    experience: number;
}
