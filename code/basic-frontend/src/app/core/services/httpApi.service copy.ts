import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, body: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, {params, headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // You can customize error handling based on your application's needs
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => error)
  }
}
// usage
// getUserData(){
//   const params = new HttpParams()
//     .set('firstName', 'john')
//     .set('lastName', 'Doe');
//   this.httpService.get('https://abc.com/user-service/v1/api/user', params)
//     .subscribe((response) => {
//     // Handle the response data
//     console.log(response);
//   });
// }