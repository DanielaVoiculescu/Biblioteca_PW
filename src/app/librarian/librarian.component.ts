import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent implements OnInit {
  librarian: User[]=[];
  constructor(private authService: AuthService) {
    this.librarian=authService.getLibrarian();
  }
  ngOnInit(): void {
  }

}
