import {Component, OnInit} from '@angular/core';
import {PatientService} from "./patient.service";
import {
    Patient,
    ProbabilityPrediction,
} from "./types";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public patient: Patient = new Patient();
    public probabilityPredictions: ProbabilityPrediction[];

    // graph styling
    public colorScheme = {
        domain: ['#ffd740', '#ff9800', '#e67303', '#f0f0f0']
    };

    constructor(private patientService: PatientService) {
    }

    ngOnInit() {
    }

    public predictPatient() {
        this.patientService.predictPatient(this.patient).subscribe((probabilityPredictions) => {
            this.probabilityPredictions = probabilityPredictions;
        });
    }

}
