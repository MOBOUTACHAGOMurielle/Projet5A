import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service/auth.service';
import { commande } from 'src/app/model/commande';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  public user! : User;

  constructor(private authService:AuthenticationService) {
    this.user = this.authService.getUserFromLocalCache();
  }

  ngOnInit(): void {
    this.authService.refreshuser();
    this.user = this.authService.getUserFromLocalCache();
  }

}
