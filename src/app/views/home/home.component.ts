import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FormModalComponent } from 'src/app/shared/form-modal/form-modal.component';

export interface infoproduct {
  tipo: string;
  modelo: string;
  preco: number;
  quantidade: number;
}

const ELEMENT_DATA: infoproduct[] = [
  {tipo: 'sad', modelo: 'Hydrogen', preco: 1.0079, quantidade: 10, },
  {tipo: 'sad', modelo: 'Helium', preco: 4.0026, quantidade: 10},
  {tipo: 'sad', modelo: 'Lithium', preco: 6.941, quantidade: 10},
  {tipo: 'sad', modelo: 'Beryllium', preco: 9.0122, quantidade: 10},
  {tipo: 'sad', modelo: 'Boron', preco: 10.811, quantidade: 10},
  {tipo: 'sad', modelo: 'Carbon', preco: 12.0107, quantidade: 10},
  {tipo: 'sad', modelo: 'Nitrogen', preco: 14.0067, quantidade: 10},
  {tipo: 'sad', modelo: 'Oxygen', preco: 15.9994, quantidade: 10},
  {tipo: 'sad', modelo: 'Fluorine', preco: 18.9984, quantidade: 10},
  {tipo: 'sad', modelo: 'Neon', preco: 20.1797, quantidade: 10},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'modelo', 'preco', 'quantidade','acao'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: infoproduct | null): void{
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '250px',
      data: element === null ? {
        tipo: '',
        modelo: '',
        preco: null,
        quantidade: null
      }: {
        tipo: element.tipo,
        modelo: element.modelo,
        preco: element.preco,
        quantidade: element.quantidade
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.modelo).includes(result.modelo)){
          this.dataSource[result.modelo -1] = result;
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
