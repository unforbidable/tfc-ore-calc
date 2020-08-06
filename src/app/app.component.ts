import { Component } from '@angular/core';
import { Profile } from './models/profile.model';
import { ProfileService } from './core/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ore-calc';
  loaded: boolean;
  error: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.loadProfile('default').then(() => {
      this.loaded = true;
    }).catch((error: HttpErrorResponse) => {
      this.error = error.message;
    });
  }

}
