import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ApiService} from "@core/services";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    public $titleChange = new Subject<string>();
    routes: any = {
        createPath: "/sales/product/create",
        getAllPath: "/sales/product/getAll",
        getAllHomePath: "/sales/product/getAllHome",
        getAllProductsAddToCartCountPath: "/sales/product/getAllProductsAddToCartCount",
        getAllProductsAddToCartPath: "/sales/product/getAllProductsAddToCart",
        getAllReportsPath: "/sales/product/reports",
        getAllMasterDataPath: "/sales/product/getAllMasterData",
        updatePath: (id: string) => `/sales/product/update/${id}`,
        getByIdPath: (id: string) => `/sales/product/getById/${id}`,
        deletePath: (id: string) => `/sales/product/delete/${id}`
    };
    constructor(private http: ApiService) {}

    create(payload: any) {
        return this.http.post(this.routes.createPath, payload);
    }

    getAll(params: any) {
        return this.http.get(this.routes.getAllPath, params);
    }
    getAllHome(params: any) {
        return this.http.get(this.routes.getAllHomePath, params);
    }
    getAllProductsAddToCartCount(params: any) {
        return this.http.get(this.routes.getAllProductsAddToCartCountPath, params);
    }
    getAllProductsAddToCart(params: any) {
        return this.http.get(this.routes.getAllProductsAddToCartPath, params);
    }
    getAllReport(params: any) {
        return this.http.get(this.routes.getAllReportsPath, params);
    }
    getAllMasterData(params: any) {
        return this.http.get(this.routes.getAllMasterDataPath, params);
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
}
