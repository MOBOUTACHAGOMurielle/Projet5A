import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { article } from '../article';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-formulaire-article',
  templateUrl: './formulaire-article.component.html',
  styleUrls: ['./formulaire-article.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class FormulaireArticleComponent implements OnInit {

  // public article: article = new article();

  constructor(public articleService: articleService, 
    public dialogRef: DialogRef<FormulaireArticleComponent>) { }

  ngOnInit(): void {
  }

  onClear() {
    this.articleService.form.reset();
    this.articleService.initializeArticleFormGroup();
  }

  onSubmit() {
    if (this.articleService.form.value.id_article) {
      console.log(this.articleService.form.value);
      this.articleService.updateArticle(this.articleService.form.value,this.articleService.form.value.id_article);
      this.articleService.form.reset();
      this.articleService.initializeArticleFormGroup();
      this.onClose();
    }
    else
      this.articleService.addNewArticle(this.articleService.form.value); 
      this.onClose();
  }

  onClose() {
    this.articleService.form.reset();
    this.articleService.initializeArticleFormGroup();
    this.dialogRef.close();
  }

}
 