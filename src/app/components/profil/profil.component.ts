import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  nom : string = "";
  prenom : string = "";
  email : string = "";
  login : string = "";

  formCorrect : boolean = false;
  displayError : boolean = false;
  constructor(private authService : AuthService, private clientService : ClientService) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe(client => {
      this.nom = client.nom;
      this.prenom = client.prenom;
      this.email = client.email;
      this.login = client.login;
    });
  }

  public validateForm() : void {
    if( this.nom != "" && this.prenom != "" 
        && this.email != "" && this.login != ""){
      this.formCorrect = true;

      let client = {
        nom : this.nom,
        prenom : this.prenom,
        email : this.email,
        login : this.login,
      }

      this.clientService.updateClient(client).subscribe();
    }else{
      this.formCorrect = false;
    }
    this.displayError = !this.formCorrect;
  }

  public logout() : void {
    this.authService.logout().subscribe();
  }

}
