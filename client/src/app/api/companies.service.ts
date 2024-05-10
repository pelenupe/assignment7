import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  private http = inject(HttpClient);

  public getAllCompanies(): Observable<any[]> {
    return this.http.get<any>(`${environment.api}/companies`);
  }

  public createCompany(company: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/companies`, company);
  }

  public updateCompany(company: any): Observable<any> {
    return this.http.put<any>(
      `${environment.api}/companies/${company.id}`,
      company,
    );
  }

  public deleteCompany(company: any): Observable<any> {
    return this.http.delete(`${environment.api}/companies/${company._id}`);
  }
}
