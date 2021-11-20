import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {IstoricComponent} from "./istoric/istoric.component";
import {BooksComponent} from "./books/books.component";
import {AuthComponent} from "./auth/auth.component";
import {BookEditComponent} from "./books/book-edit/book-edit.component";
import {LendersListComponent} from "./book-lender/lenders-list/lenders-list.component";
import {UserLendersListComponent} from "./book-lender/user-lenders-list/user-lenders-list.component";
import {CustomersComponent} from "./customers/customers.component";
import {ProfileComponent} from "./profile/profile.component";
import {BookLenderComponent} from "./book-lender/book-lender.component";
import {LibrarianComponent} from "./librarian/librarian.component";




const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomeComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'istoric', component: IstoricComponent },
  { path: 'carti', component: BooksComponent},
  // {path: 'adaugareCarte', component:BookEditComponent},
  {path: 'imprumuturi', component:LendersListComponent},
  {path: 'imprumuturiutilizator', component:UserLendersListComponent},
  {path: 'bibliotecari', component:LibrarianComponent},
  {path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)

  },
  {path: 'customers', component:CustomersComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'adaugarecarte', component:BookEditComponent},
  {path: 'adaugareimprumut', component:BookLenderComponent},


  /*{path: 'forms',
    loadChildren: () => import('./forms/my-forms.module').then(module => module.MyFormsModule)},
  {path: 'list',
    loadChildren: () => import('./lists/lists.module').then(module => module.ListsModule)},*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
