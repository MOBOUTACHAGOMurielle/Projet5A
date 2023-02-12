import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { article } from 'src/app/article';
import { manteauService } from '../manteau.service';
import { panierService } from 'src/app/panier/panier.servcie';
import { GuideDesTaillesComponent } from 'src/app/guide-des-tailles/guide-des-tailles.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { FormulaireArticleComponent } from 'src/app/formulaire-article/formulaire-article.component';

@Component({
  selector: 'app-manteau-detail',
  templateUrl: './manteau-detail.component.html',
  styleUrls: ['./manteau-detail.component.css']
})
export class ManteauDetailComponent implements OnInit {

  public manteau: article = <article>{};

  constructor(
    private route: ActivatedRoute,
    private listeManteau: manteauService,
    private panierService: panierService,
    private dialog: MatDialog,
    private modifierArticleForm: articleService
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;

    this.listeManteau.getManteau().subscribe((liste: article[]) => {
      this.manteau = liste.find(manteau => manteau.id_article == id)!;
      console.log('hotel', this.manteau);
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
