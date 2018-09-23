import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent{
  private _usuarioService: UsuarioService;
  
  //outra forma de iniciar o objeto
  // @Input() usuario : Usuario ={
  //   nome:'',
  //   senha:''
  // };
  @Input() usuario = {} as Usuario;  
  @Input() modoEdicao: boolean = false;

  constructor(usuarioUservice: UsuarioService) {
    this._usuarioService = usuarioUservice;
  }

  salvarUsuario(usuario: Usuario) {
    if(this.modoEdicao){
      this._usuarioService.atualizarUsuario(usuario);
      this.modoEdicao = false;
    }
    else{
      this._usuarioService.incluirUsuario(usuario);
    }
    swal(
      'Salvo com sucesso!',
      'O usuário foi salvo na base de dados.',
      'success'
    )
  }
}
