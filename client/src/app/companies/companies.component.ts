import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIModalClassicComponent } from '../ui/modals/modal-classic.component';
import { Observable } from 'rxjs';
import { CreateCompanyModalComponent } from './forms/create/create-company.component';
import { CompaniesApiService } from '../api/companies.service';
import { UpdateCompanyModalComponent } from './forms/update/update-company.component';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    UIModalClassicComponent,
    CreateCompanyModalComponent,
    UpdateCompanyModalComponent,
  ],
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit {
  private companiesApiService = inject(CompaniesApiService);

  public newCompanyModalIsOpen: WritableSignal<boolean> = signal(false);
  public updateCompanyModalIsOpen: WritableSignal<boolean> = signal(false);

  public companies$!: Observable<any[]>;
  public selectedCompany: any;

  ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies() {
    this.companies$ = this.companiesApiService.getAllCompanies();
  }

  public openNewCompanyModal(): void {
    this.newCompanyModalIsOpen.set(true);
  }

  public closeNewCompanyModal(): void {
    this.newCompanyModalIsOpen.set(false);
  }

  public openUpdateCompanyModal(logo: any): void {
    this.selectedCompany = logo;
    this.updateCompanyModalIsOpen.set(true);
  }

  public closeUpdateCompanyModal(): void {
    this.updateCompanyModalIsOpen.set(false);
  }

  public deleteCompany(logo: any) {
    this.companiesApiService.deleteCompany(logo).subscribe({
      complete: () => this.getCompanies(),
    });
  }
}
