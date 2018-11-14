export class InfoUser {
    levelsUnlock: string[] = [];
    sectionsUnlock: string[] = [];
    challangesComplete: string[] = [];
    trophiesComplete: string[] = [];
    newExp = 0;
    newRank: any = {};

    constructor(data: any) {
        if (!data) {
            return;
        }
        
        this.levelsUnlock = data.levelsUnlock !== undefined ? data.levelsUnlock : [];
        this.sectionsUnlock = data.sectionsUnlock !== undefined ? data.sectionsUnlock : [];
        this.challangesComplete = data.challangesComplete !== undefined ? data.challangesComplete : [];
        this.trophiesComplete = data.trophiesComplete !== undefined ? data.trophiesComplete : [];
        this.newExp = data.newExp;
        this.newRank = data.newRank;
    }


}