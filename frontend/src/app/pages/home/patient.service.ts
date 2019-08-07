import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {
    Patient,
    ProbabilityPrediction,
} from "./types";

const SERVER_URL: string = 'api/';

@Injectable()
export class PatientService {

    constructor(private http: Http) {
    }

    public predictPatient(patient: Patient): Observable<ProbabilityPrediction[]> {
        return this.http.post(`${SERVER_URL}predict`, patient).map((res) => res.json());
    }
}
