import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { FormulaireArticleComponent } from 'src/app/formulaire-article/formulaire-article.component';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { GuideDesTaillesComponent } from 'src/app/guide-des-tailles/guide-des-tailles.component';
import { panierService } from 'src/app/panier/panier.servcie';
import { jeanService } from '../jean.service';

@Component({
  selector: 'app-jean-detail',
  templateUrl: './jean-detail.component.html',
  styleUrls: ['./jean-detail.component.css']
})
export class JeanDetailComponent implements OnInit {

  public jean: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeJean: jeanService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!; //+ pour convertir un string en un nombre snapshot recupère la valeur initiale

    this.listeJean.getJean().subscribe((liste: article[]) => {
      this.jean = liste.find(jean => jean.id_article == id)!;
      console.log('jean', this.jean);
    })
  }

  addToCart(item:any, id:number){
    this.panierService.addtoCart(item, id);
  }

  onEdit(element:any){
    this.modifierArticleForm.populateArticleForm(element);
    this.dialog.open(FormulaireArticleComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  onView() {
    this.dialog.open(GuideDesTaillesComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

}
