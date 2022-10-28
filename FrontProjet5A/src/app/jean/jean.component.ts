import { Component, OnInit } from '@angular/core';
import { article } from '../article';
import { jeanService } from './jean.service';

@Component({
  selector: 'app-jean',
  templateUrl: './jean.component.html',
  styleUrls: ['./jean.component.css']
})
export class JeanComponent implements OnInit {

  public errMsg: string | undefined;

  constructor(private jeanService: jeanService) { }

  listeJeans: article[] = [];

  ngOnInit() {
    this.jeanService.getJean().subscribe({
      next: listeJeans => {
        this.listeJeans = listeJeans;
      },

      error: err => this.errMsg = err
    });
  }



}
