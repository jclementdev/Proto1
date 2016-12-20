import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IDynamicDTO } from './dynamicDTO';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestService {
    constructor(private http: Http) {

    }

    getData(worId : number): Promise<IDynamicDTO> {
        return this.http.get(`http://localhost:64604/api/WorkOrder/GetById?id=${worId}&pfiToInclude=1,2`)
            .map((x) => {
                return x.json().dynamicDTO;
            })
            .toPromise();
    }
}

