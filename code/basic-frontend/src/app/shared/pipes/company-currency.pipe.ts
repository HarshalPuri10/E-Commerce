import {Pipe, PipeTransform} from "@angular/core";
import {StorageService} from "@core/services";
@Pipe({
    name: "companyCurrency"
})
export class CompanyCurrencyPipe implements PipeTransform {
    companyCurrency: string = "";
    constructor(private storageService: StorageService) {
        this.companyCurrency = this.storageService.get("IDMSAUser")?.currencySymbol;
    }

    transform(currencySymbol: string) {
        return this.companyCurrency ?? "INR";
    }
}
