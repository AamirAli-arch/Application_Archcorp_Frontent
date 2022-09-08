import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.getLocation();
    }

    getLocation(): void{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
              const longitude = position.coords.longitude;
              const latitude = position.coords.latitude;
            
            });
        } else {
           console.log("No support for geolocation")
        }
    }
}
