import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { article } from '../article';
import { FormulaireArticleComponent } from '../formulaire-article/formulaire-article.component';
import { articleService } from '../formulaire-article/formulaire-article.service';
import { panierService } from '../panier/panier.servcie';
import { accessoiresService } from './accessoires.service';

@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.css']
})
export class AccessoiresComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private accessoireService: accessoiresService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
    ) { }

  listeAccessoires: article[] = [];

  ngOnInit(): void {
    this.accessoireService.getAccessoires().subscribe({
      next: listeAccessoires => {
        this.listeAccessoires = listeAccessoires;
      },

      error: err => this.errMsg = err
    });

    this.panierService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addArticle(){
    this.modifierArticleForm.initializeArticleFormGroup();
    this.dialog.open(FormulaireArticleComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }
}
