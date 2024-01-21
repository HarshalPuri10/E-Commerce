import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SharedService {
    private dataSubject = new BehaviorSubject<any>(null);
    data$ = this.dataSubject.asObservable();

    refreshData(updatedData: any) {
        this.dataSubject.next(updatedData);
    }
}
