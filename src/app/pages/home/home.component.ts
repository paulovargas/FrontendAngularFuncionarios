import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  constructor( private funcionarioService: FuncionarioService){}

  ngOnInit(): void {

    this.funcionarioService.GetFuncionarios().subscribe(data => {
      const dados = data.dados;
      dados.map((item) =>{
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-BR')
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString('pt-BR')
      })
      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    })
  }
  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.funcionarios = this.funcionariosGeral.filter(funcionario => {
      return funcionario.nome.toLocaleLowerCase().includes(value);
    })
  }
}
