import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Βλάβες',
            path: './issues',
        },
        {
            label: 'Στατιστικά',
            path: './statistics',
        },
        {
            label: 'Χρήστες',
            path: './users',
        },
        {
            label: 'Τεχνικές ομάδες',
            path: './technician-team',
        },
        {
            label: 'Νέος χρήστης',
            path: './newuser',
        },
        {
            label: 'Διαχείριση εξοπλισμού',
            path: './equipment',
        },
        {
            label: 'Διαμόρφωση κτηρίων',
            path: './building',
        },
        {
            label: 'Νέα βλάβη',
            path: './newissue',
        },
    ];
  }
  ngOnInit(): void {
  }

}
