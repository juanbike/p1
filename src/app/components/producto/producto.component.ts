import { CommonModule } from '@angular/common';
import { AfterViewInit ,Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule, MatTableDataSource} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


import { Junta } from '../../data/interface/juntas';
import {  JuntasService } from '../../data/service/juntas.service';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, ConfirmDeleteComponent, MatIconModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  //readonly const: string = 'Valor constante';

  mostrar = false;
  allJuntas: Junta[] = [];
  showMessage: boolean = false;
  messageText: string = '';
  isLoading: boolean = false;
  ismostrarModal: boolean = false;
  private apiurl = 'http://localhost:3500/api/juntas/';

  displayedColumns: string[] = [
  'id',
  'nominal',
  'nominal1',
  'lineaOSistema',
  'especificacion',
  'schedule',
  'diam_inch_contabilizadas',
  'factor_pulgadas_diametrales',
  'pulgadas_diametrales',
  'tipo_extremos',
  'tipo_material',
  'material',
  "diam_inch_contabilizadas",
'factor_pulgadas_diametrales',
];

  readonly const: Junta[] = [];
   dataSource:Junta[] = this.allJuntas;



  @ViewChild('juntasForm') form: NgForm;

  @ViewChild(MatPaginator) paginator: MatPaginator;


 @ViewChild(MatPaginator) dataSource1: MatTableDataSource<Junta[]>;

 ngAfterViewInit() {
  this.dataSource1.paginator = this.paginator;
}





  onPageChange(event: any) {
    console.log('Página cambiada', event);
  }


  editMode: boolean = false;

  constructor(private http: HttpClient, private juntasService: JuntasService) {}
  ngOnInit(): void {
    this.fetchJuntas();

  }

  onJuntas() {
    this.fetchJuntas();
  }

  onJuntaCreate(juntas: {
    nominal: string;
    nominal1: string;
    lineaOSistema: string;
    especificacion: string;
    schedule: string;
    tipo_extremos: string;
    tipo_material: string;
    material: string;
    diam_inch_contabilizadas: string;
    factor_pulgadas_diametrales: string;
    pulgadas_diametrales: string;
    proyectID: string;
    usuarioID: string;
  }): void {
    this.juntasService.onJuntaCreate(juntas).subscribe(
      (response: Junta) => {
        this.allJuntas.push(response);
        this.showMessageWithTimeout('Junta creada con exito', 3000);
      },
      (error: HttpErrorResponse) => {
        console.log('Error al crear la junta', error);
        this.showMessageWithTimeout('Error al crear la junta', 3000);
      }
    );
  }

  private fetchJuntas() {
    this.isLoading = true;
    this.juntasService.fetchJuntas().subscribe(
      (response: Junta[]) => {
        this.allJuntas = response;
        this.isLoading = false;
        const dataSource1 = new MatTableDataSource<Junta>(this.allJuntas);
        console.log(this.allJuntas);
       return this.dataSource= this.allJuntas;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        alert(error.message);
      }
    );
  }

  onDeleteJunta(id: string): void {
    this.http.delete<void>(`${this.apiurl}${id}`).subscribe(
      () => {
        this.showMessageWithTimeout('Junta eliminada con éxito', 3000);
      },
      (error: HttpErrorResponse) => {
        console.log('Error al eliminar la junta', error);
        this.showMessageWithTimeout('Error al eliminar la junta', 3000);
      }
    );
  }

  onDeleteAllJuntas(): void {
    this.http.delete<void>(`${this.apiurl}`).subscribe(
      () => {
        this.showMessageWithTimeout('Juntas eliminadas con exito', 3000);
      },
      (error: HttpErrorResponse) => {
        console.log('Error al eliminar las juntas', error);
        this.showMessageWithTimeout('Error al eliminar las juntas', 3000);
      }
    );
  }

  onEditClicked(id: string) {
    let junta = this.allJuntas.find((p) => p.id === id);
    if (junta) {
      console.log(junta);

      this.form.setValue({
        nominal: junta.nominal,
        nominal1: junta.nominal1,
        lineaOSistema: junta.lineaOSistema,
        especificacion: junta.especificacion,
        schedule: junta.schedule,
        tipo_extremos: junta.tipo_extremos,
        tipo_material: junta.tipo_material,
        material: junta.material,
        diam_inch_contabilizadas: junta.diam_inch_contabilizadas,
        factor_pulgadas_diametrales: junta.factor_pulgadas_diametrales,
        pulgadas_diametrales: junta.pulgadas_diametrales,
      });

      this.editMode = true;
    }
  }

  showMessageWithTimeout(message: string, timeout: number): void {
    this.showMessage = true;
    this.messageText = message;

    setTimeout(() => {
      this.showMessage = false;
      this.messageText = '';
    }, timeout);
  }
}



