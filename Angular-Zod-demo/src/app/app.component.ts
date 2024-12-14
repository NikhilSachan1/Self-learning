import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { INewUser } from '../interfaces/users.type';
import { catchError, map, Observable, of } from 'rxjs';
import { parseUserDTO } from '../dto/users.dto';
import { fromUserDTO } from '../data-mapping/users.data.mapping';
import { IDirectSaleApiResponse, IDirectSaleTransformedData } from '../interfaces/direct-sales.type';
import { parseDirectSaleApiResponseDTO } from '../dto/direct-sales.dto';
import { fromDirectSaleApiResponseDTO } from '../data-mapping/direct-sales.data.mapping';
import { directSalesData } from './mock-data/direct-sales-data';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data!: INewUser[];
  directSalesData!: IDirectSaleTransformedData;

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchUsers().subscribe((transformData)=>{
      // this.data = transformData
      console.log(transformData);
      
    });

    this.fetchDirectSalesData().subscribe((transformData)=>{
      // this.directSalesData = transformData;
      console.log(transformData);
      
    });
  }

  fetchUsers(): Observable<INewUser[]> {
    const url = 'https://dummyjson.com/users';
    return this.httpClient.get(url).pipe(
      map((response) => {              
        const dto = parseUserDTO(response);
        if (dto.success) {
          return fromUserDTO(dto.data);
        } else {
          console.error(dto.error);
          return [];
        }
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  fetchDirectSalesData(): Observable<IDirectSaleTransformedData> {
    const url = 'https://dummyjson.com/users';
    return this.httpClient.get(url).pipe(
      map((response) => {  
        response = directSalesData;              
        const dto = parseDirectSaleApiResponseDTO(response);
        if (dto.success) {
          return fromDirectSaleApiResponseDTO(dto.data);
        } else {
          console.error(dto.error);
          return {};
        }
      }),
      catchError((error) => {
        console.error(error);
        return of({});
      })
    );
  }
}
