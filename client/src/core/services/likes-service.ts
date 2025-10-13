import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LikeParams, Member } from '../../types/member';
import { PaginatedResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<string[]>([]);

  toggleLike(targetMemberId: string) {
    return this.http.post(`${this.baseUrl}likes/${targetMemberId}`, {});
  }

  getLikes(likeParams: LikeParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', likeParams.pageNumber);
    params = params.append('pageSize', likeParams.pageSize);
    params = params.append('predicate', likeParams.predicate)
    return this.http.get<PaginatedResult<Member>>(this.baseUrl + 'likes', { params });
  }

  getLikeIds() {
    return this.http.get<string[]>(this.baseUrl + 'likes/list').subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }

  clearLikeIds() {
    this.likeIds.set([]);
  }
}
