import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { article } from '../article';
import { FormulaireArticleComponent } from '../formulaire-article/formulaire-article.component';
import { articleService } from '../formulaire-article/formulaire-article.service';
import { panierService } from '../panier/panier.servcie';
import { teeshirtService } from './tee-shirt.service';

@Component({
  selector: 'app-tee-shirt',
  templateUrl: './tee-shirt.component.html',
  styleUrls: ['./tee-shirt.component.css']
})
export class TeeShirtComponent implements OnInit {

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private teeShirtService: teeshirtService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
    ) { }

  listeTeeShirt: article[] = [];

  ngOnInit(): void {
    this.teeShirtService.getTeeShirt().subscribe(
      (listeTeeShirt : article []) => {
        this.listeTeeShirt = listeTeeShirt;
      },
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
