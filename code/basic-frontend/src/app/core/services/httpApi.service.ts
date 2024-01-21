import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, distinctUntilChanged, map, shareReplay, tap} from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private options = {
        headers: new HttpHeaders().set("Content-Type", "application/json")
    };

    constructor(private httpClient: HttpClient) {}

    private() {
        return `${location.protocol}//${location.hostname + (location.port ? ":" + location.port : "")}/`;
    }

    public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        distinctUntilChanged();
        return this.httpClient.get(path, {params}).pipe(
            map((res: any) => res),
            shareReplay()
        );
    }

    public put(path: string, body: object = {}): Observable<any> {
        distinctUntilChanged();
        return this.httpClient.put(path, body).pipe(
            map((res: any) => res),
            shareReplay()
        );
    }

    public post(path: string, body: object = {}): Observable<any> {
        distinctUntilChanged();
        return this.httpClient.post(path, body).pipe(
            map((res: any) => res),
            shareReplay()
        );
    }

    public delete(path: string): Observable<any> {
        distinctUntilChanged();
        return this.httpClient.delete(path).pipe(
            map((res: any) => res),
            shareReplay()
        );
    }

    public getFile(path: string, params: HttpParams = new HttpParams()) {
        return this.httpClient.get(path, {
            responseType: "blob",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }
    public getIp(): Observable<any> {
        distinctUntilChanged();
        return this.httpClient.get("https://ipapi.co/json/").pipe(shareReplay());
    }
}
