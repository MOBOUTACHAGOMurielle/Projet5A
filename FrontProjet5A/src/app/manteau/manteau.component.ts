import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { article } from '../article';
import { FormulaireArticleComponent } from '../formulaire-article/formulaire-article.component';
import { articleService } from '../formulaire-article/formulaire-article.service';
import { panierService } from '../panier/panier.servcie';
import { manteauService } from './manteau.service';

@Component({
  selector: 'app-manteau',
  templateUrl: './manteau.component.html',
  styleUrls: ['./manteau.component.css']
})
export class ManteauComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private manteauService: manteauService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
    ) { }

  listeManteau: article[] = [];

  ngOnInit(): void {
    this.manteauService.getManteau().subscribe({
      next: listeManteau => {
        this.listeManteau = listeManteau;
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
