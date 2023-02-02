import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { FormulaireArticleComponent } from 'src/app/formulaire-article/formulaire-article.component';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { GuideDesTaillesComponent } from 'src/app/guide-des-tailles/guide-des-tailles.component';
import { panierService } from 'src/app/panier/panier.servcie';
import { accessoiresService } from '../accessoires.service';


@Component({
  selector: 'app-accessoires-detail',
  templateUrl: './accessoires-detail.component.html',
  styleUrls: ['./accessoires-detail.component.css']
})
export class AccessoiresDetailComponent implements OnInit {

  public accessoire: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeAccessoire: accessoiresService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!; //+ pour convertir un string en un nombre snapshot recupère la valeur initiale
    
    this.listeAccessoire.getAccessoires().subscribe((liste: article[]) => {
      this.accessoire = liste.find(accessoire => accessoire.id_article == id)!;
      console.log('hotel', this.accessoire);
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
