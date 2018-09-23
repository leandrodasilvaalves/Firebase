import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import swal from 'sweetalert2'

@Component({
  selector: 'usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {
  private _usuarioService: UsuarioService;
  usuarios: Observable<Usuario[]>;
  usuario ={} as Usuario;
  modoEdicao: boolean = false;

  constructor(usuarioService: UsuarioService) {
    this._usuarioService = usuarioService;
  }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.listarUsuarios();
  }

  selecionarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.modoEdicao = true;
  }

  confirmarExclusao(usuario: Usuario){
    swal({
      title: `Deseja excluir: ${ usuario.nome } ?`,
      text: "Esta operação é irrversível!",
      type: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.excluirUsuario(usuario);
        swal(
          'Excluído com sucesso!',
          'O usuário foi removido da base de dados.',
          'success'
        )
      }
    });
  }
}   