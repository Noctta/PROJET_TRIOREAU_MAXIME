import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  login : string = "";
  password : string = "";
  
  formCorrect : boolean = false;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public connect() {
    if( this.login != "" && this.password != ""){
      this.formCorrect = true;
      this.authService.login(this.login,this.password).subscribe();     
    }else{
      this.formCorrect = true;
    }   
  }
}
