import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseBase } from './api.models';
import { environment } from '../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private http = inject(HttpClient);

  // ✅ base fija
  private baseUrl = environment.apiUrl.replace(/\/+$/, ''); // quita slash final si viene

  get<T>(url: string, query?: Record<string, any>) {
    const params = this.toParams(query);
    return firstValueFrom(this.http.get<ResponseBase<T>>(`${this.baseUrl}${url}`, { params }));
  }

  post<T>(url: string, body: any) {
    return firstValueFrom(this.http.post<ResponseBase<T>>(`${this.baseUrl}${url}`, body));
  }

  put<T>(url: string, body: any) {
    return firstValueFrom(this.http.put<ResponseBase<T>>(`${this.baseUrl}${url}`, body));
  }

  private toParams(query?: Record<string, any>) {
    let params = new HttpParams();
    if (!query) return params;

    for (const [k, v] of Object.entries(query)) {
      if (v === null || v === undefined || v === '') continue;
      params = params.set(k, String(v));
    }
    return params;
  }
}
