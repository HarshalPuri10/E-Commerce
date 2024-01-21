import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {ApiService} from "@core/services";

@Injectable({
    providedIn: "root"
})
export class UserService {
    public $titleChange = new Subject<string>();
    routes: any = {
        createPath: "/auth/user/register",
        loginPath: "/auth/user/login",
        getCompanyURLsPath: "/auth/company/getCompanyURLs",
        getAllPath: "/auth/user/getAll",
        getAllReportsPath: "/auth/user/reports",
        forgetPath: "/auth/user/forgot-password",
        getAllMasterDataPath: "/auth/user/getAllMasterData",
        excelDownloadPath: "/auth/user/excelDownload",
        updatePath: (id: string) => `/auth/user/update/${id}`,
        getByIdPath: (id: string) => `/auth/user/profile/${id}`,
        deletePath: (id: string) => `/auth/user/delete/${id}`
    };
    constructor(private http: ApiService) {}

    getCompanyURLs(params: any) {
        return this.http.get(this.routes.getCompanyURLsPath, params);
    }

    create(payload: any) {
        return this.http.post(this.routes.createPath, payload);
    }
    login(payload: any) {
        return this.http.post(this.routes.loginPath, payload);
    }
    getAll(params: any) {
        return this.http.get(this.routes.getAllPath, params);
    }
    getAllReport(params: any) {
        return this.http.get(this.routes.getAllReportsPath, params);
    }
    getAllMasterData(params: any) {
        return this.http.get(this.routes.getAllMasterDataPath, params);
    }
    excelDownload(params: any) {
        return this.http.getFile(this.routes.excelDownloadPath, params);
    }
    update(id: string, payload: any) {
        return this.http.put(this.routes.updatePath(id), payload);
    }
    getById(id: string) {
        return this.http.get(this.routes.getByIdPath(id));
    }
    delete(id: string) {
        return this.http.delete(this.routes.deletePath(id));
    }
    forgetpass(payload: any) {
        return this.http.post(this.routes.forgetPath, payload);
    }
}
