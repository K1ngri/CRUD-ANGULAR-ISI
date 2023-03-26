import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { infoproduct } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  element!: infoproduct;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: infoproduct,
    public dialogRef: MatDialogRef<FormModalComponent>
    ) {}

  ngOnInit(): void{
    if(this.data.preco != null){
      this.isChange = true;
    }else {
      this.isChange = false;
    }   
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}