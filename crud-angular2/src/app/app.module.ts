import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosListaComponent,
    UsuarioFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'projeto-teste-63cd3'),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    AngularFirestore,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
