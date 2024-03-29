import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Equipment} from "../../../interface/Equipment";
import {map, startWith} from "rxjs/operators";
import {CommitteeService} from "../../../services/committee.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-newissue',
  templateUrl: './newissue.component.html',
  styleUrls: ['./newissue.component.css']
})
export class NewissueComponent implements OnInit{

  buildingsWithSites: Map<string, string[]> = new Map<string, string[]>();
  siteName = new FormControl('', Validators.required);
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  equipments: Equipment[] = [];
  issueTypes: string[] = [];
  issueForm!: FormGroup;

  constructor(private committeeService: CommitteeService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.issueForm = new FormGroup({
      buildingName: new FormControl('', Validators.required),
      issueType: new FormControl(),
      equipment: new FormControl(),
      description: new FormControl(''),

    })

    this.issueForm.addControl("siteName", this.siteName)

    this.filteredOptions = this.siteName.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
    this.committeeService.getBuildingsWithSites().subscribe({
      next: (res: Map<string, string[]>) => this.buildingsWithSites = new Map<string, string[]>(Object.entries(res)),
      error: err => console.error(err)
    })

    this.committeeService.getStaticEnums().subscribe({
      next: (res: any) => this.issueTypes = res.IssueTypes,
      error: err => console.error(err)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {

    if(this.issueForm.valid){
      const data = {
        siteName: this.siteName.value,
        issueType: this.issueForm.get("issueType")?.value,
        equipment: this.issueForm.get("equipment")?.value,
        description: this.issueForm.get("description")?.value
      }
      console.log(data)
      this.committeeService.submitIssue(this.issueForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open('Success: ' + res.message, "Close", {
            duration: 3000
          });
          this.issueForm.reset();
          this.siteName.reset();
          console.log(res)
        },
        error: err => {
          this.snackBar.open('Error: ' + err.error.message, "Close", {
            duration: 3000
          });
          console.error(err)
        }
      })
    }
  }

  onBuildingSelected(value: string) {
    if (this.buildingsWithSites.has(value)) {
      this.options = this.buildingsWithSites.get(value) || [];
      this.filteredOptions = this.siteName.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '')),
      );
    } else {
      this.siteName.reset();
      this.options = [];
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    this.committeeService.getSiteEquipments(event.option.value).subscribe({
      next: (value: Equipment[]) => {
        this.equipments = value
      },
      error: err => console.error(err)
    })
  }
}
