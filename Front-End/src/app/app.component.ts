import { Component, OnInit, DoCheck } from '@angular/core';
import { faHome, faNewspaper, faUsers, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService} from './services/user.service';
import {  RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'ngFollow';
  public faHome = faHome;
  public faNewspaper = faNewspaper;
  public faUsers = faUsers;
  public faSignInAlt = faSignInAlt;
  public faUserPlus = faUserPlus;
  public identity;
  public url: string;

  constructor( private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.url = environment.backendUrl;
  }

  ngOnInit() {
     this.identity = this.userService.getIdentity();
  }

  ngDoCheck() {
     this.identity = this.userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/']);
  }

}
