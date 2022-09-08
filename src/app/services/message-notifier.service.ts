import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";
@Injectable({
    providedIn: "root",
})
export class MessageNotifierService {
    constructor(private notifier: NotifierService) {}

    successMessage(success) {
        this.notifier.show({
            type: "success",
            message: success,
        });
    }

    warningMessage(error) {
        this.notifier.show({
            type: "warning",
            message: error,
        });
    }

    errorMessage(error) {
        this.notifier.show({
            type: "error",
            message: error,
        });
    }
}
