import { Level } from './level.model';
import { Challange } from './challange.model';

export class Section {
    id: string;
    orden: number;
    documentation: any;
    title: string;
    description: string;
    unlocked: boolean;
    completeAll: boolean;
    levels: Level[];
    nextSections: string[];
    challanges: Challange[];
}
