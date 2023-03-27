import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FormModalComponent } from 'src/app/shared/form-modal/form-modal.component';

export interface infoproduct {
  tipo: string;
  modelo: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

const ELEMENT_DATA: infoproduct[] = [
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'modelo', 'preco', 'quantidade','imagem','acao'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: infoproduct | null): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '250px',
      data: element == null ? {
        tipo: '',
        modelo: '',
        preco: null,
        quantidade: null,
        imagem: ''
      } : {
        ...element
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.modelo).includes(result.modelo)){
          const index = this.dataSource.findIndex(p => p.modelo === result.modelo);
          this.dataSource[index] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  deletarproduto(modelo: string): void{
    this.dataSource = this.dataSource.filter(p => p.modelo !== modelo);
  }

  editarprodutor(element: infoproduct): void{
    this.openDialog(element);
  }
}