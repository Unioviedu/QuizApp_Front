import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SectionsService } from './sections.service';

@Injectable()
export class LevelGuard implements CanActivate {
 
    constructor(private router: Router, private sectionsService: SectionsService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sectionsService.currentLevel) {
            // logged in so return true
            return true;
        }

        let codSection = state.url.split("/")[2].split("_")[0];
        this.router.navigate( ['/section', codSection] );
        return false;
    }
}