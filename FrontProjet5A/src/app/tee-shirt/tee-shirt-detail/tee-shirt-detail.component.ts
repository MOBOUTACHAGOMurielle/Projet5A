import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { FormulaireArticleComponent } from 'src/app/formulaire-article/formulaire-article.component';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { GuideDesTaillesComponent } from 'src/app/guide-des-tailles/guide-des-tailles.component';
import { panierService } from 'src/app/panier/panier.servcie';
import { teeshirtService } from '../tee-shirt.service';

@Component({
  selector: 'app-tee-shirt-detail',
  templateUrl: './tee-shirt-detail.component.html',
  styleUrls: ['./tee-shirt-detail.component.css']
})
export class TeeShirtDetailComponent implements OnInit {

  public teeShirt: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeTeeShirt: teeshirtService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
    ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!; //+ pour convertir un string en un nombre snapshot recupère la valeur initiale
    
    this.listeTeeShirt.getTeeShirt().subscribe((liste: article[]) => {
      this.teeShirt = liste.find(shirt => shirt.id_article == id)!;
    })
  } 

  
  addToCart(id_a:number, quantite: number){
    this.panierService.addtoCart(id_a, quantite, this.route);
    location.reload();
  }

  onEdit(element:any){
    this.modifierArticleForm.populateArticleForm(element);
    this.dialog.open(FormulaireArticleComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  onView() {
    this.dialog.open(GuideDesTaillesComponent,{width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }
  
}
