import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {  
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;

  constructor(private afs: AngularFirestore) {
    this.usuariosCollection = afs.collection<Usuario>('usuarios');
    //this.usuarios = this.usuariosCollection.valueChanges();
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  listarUsuarios() {
    return this.usuarios;
  }

  incluirUsuario(usuario: Usuario) {
    this.usuariosCollection.add(usuario);
  }

  atualizarUsuario(usuario: Usuario) {
    this.usuarioDoc = this.afs.doc(`usuarios/${ usuario.id }`);
    this.usuarioDoc.update(usuario);
  }

  excluirUsuario(usuario: Usuario){
    this.usuarioDoc = this.afs.doc(`usuarios/${ usuario.id }`);
    this.usuarioDoc.delete();
  }
}
