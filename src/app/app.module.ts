import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing";
import {environment} from "../environments/environment";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { IstoricComponent } from './istoric/istoric.component';


import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

import {HttpClientModule} from "@angular/common/http";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookListComponent } from './books/book-list/book-list.component';
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { CarouselComponent } from './carousel/carousel.component';
import {BookItemComponent} from "./books/book-list/book-item/book-item.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import { BookLenderComponent} from "./book-lender/book-lender.component";
import {CalendarModule} from "primeng/calendar";

import { LendersListComponent } from './book-lender/lenders-list/lenders-list.component';
import { LenderItemComponent } from './book-lender/lenders-list/lender-item/lender-item.component';
import { UserLendersListComponent } from './book-lender/user-lenders-list/user-lenders-list.component';
import { UserLederItemComponent } from './book-lender/user-lenders-list/user-leder-item/user-leder-item.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import { CustomersComponent } from './customers/customers.component';
import {TableModule} from "primeng/table";
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";
import { LibrarianComponent } from './librarian/librarian.component';
import {AuthModule} from "./auth/auth.module";
import { AdaugareComponent } from './customers/adaugare/adaugare.component';
import { EditareComponent } from './customers/editare/editare.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    IstoricComponent,
    BooksComponent,
    BookDetailComponent,
    BookEditComponent,
    BookListComponent,
    LoadingSpinnerComponent,
    CarouselComponent,
    BookItemComponent,
    BookLenderComponent,
    LendersListComponent,
    LenderItemComponent,
    UserLendersListComponent,
    UserLederItemComponent,
    DropdownDirective,
    CustomersComponent,
    ProfileComponent,
    EditProfileComponent,
    LibrarianComponent,
    AdaugareComponent,
    EditareComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        CarouselModule,
        ButtonModule,
        FileUploadModule,
        CalendarModule,
        TableModule,
        GalleriaModule,
        ImageModule,
        AuthModule
    ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
