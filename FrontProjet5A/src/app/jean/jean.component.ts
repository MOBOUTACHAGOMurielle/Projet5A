import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { article } from '../article';
import { FormulaireArticleComponent } from '../formulaire-article/formulaire-article.component';
import { articleService } from '../formulaire-article/formulaire-article.service';
import { panierService } from '../panier/panier.servcie';
// import { article } from '../formulaire-article/article';
import { jeanService } from './jean.service';

@Component({
  selector: 'app-jean',
  templateUrl: './jean.component.html',
  styleUrls: ['./jean.component.css']
})
export class JeanComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private jeanService: jeanService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
    ) { }

  listeJeans: article[] = [];

  ngOnInit() {
    // this.jeanService.getJean().subscribe({
    //   next: listeJeans => {
    //     this.listeJeans = listeJeans;
    //   },

    //   error: err => this.errMsg = err
    // });

    this.jeanService.getJean().subscribe(
      (listeJeans : article []) => {
        this.listeJeans = listeJeans;
      },

      // error: err => this.errMsg = err
    );

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addArticle(){
    this.modifierArticleForm.initializeArticleFormGroup();
    this.dialog.open(FormulaireArticleComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }
}
