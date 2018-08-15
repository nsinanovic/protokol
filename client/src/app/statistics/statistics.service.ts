import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistic } from './statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) { }

  getstatistics() {
    return this.http.get<Statistic[]>('/api/statistics');
  }

  getstatistic(id: number) {
    return this.http.get<Statistic>(`/api/statistics/${id}`);
  }
}
