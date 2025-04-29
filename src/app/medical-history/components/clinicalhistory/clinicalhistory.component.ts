import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinicalhistory',
  templateUrl: './clinicalhistory.component.html',
  styleUrls: ['./clinicalhistory.component.css']
})
export class ClinicalhistoryComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['reasonConsultation'], { relativeTo: this.route });
  }

}
