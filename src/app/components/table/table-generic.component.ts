import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-generic',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent {
  @Input() title!: string;
  @Input() columns!: { def: string, header: string }[];
  @Input() data: any[] = [];

  get displayedColumns() {
    return this.columns.map(c => c.def);
  }
}
