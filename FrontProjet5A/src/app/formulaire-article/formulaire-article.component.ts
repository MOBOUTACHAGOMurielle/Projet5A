import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { article } from '../article';
import { articleService } from 'src/app/formulaire-article/formulaire-article.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FileInformation } from 'file';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-formulaire-article',
  templateUrl: './formulaire-article.component.html',
  styleUrls: ['./formulaire-article.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class FormulaireArticleComponent implements OnInit {

  // public article: article = new article();
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  file!: File;
  fileInformation: FileInformation | undefined;

  constructor(public articleService: articleService,private http: HttpClient,
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
      this.articleService.addNewArticle(this.articleService.form.value, this.file);
      this.onClose();
  }

  onClose() {
    this.articleService.form.reset();
    this.articleService.initializeArticleFormGroup();
    this.dialogRef.close();
  }

  onSelectFile(event:any){
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.articleService.form.get('image')?.setValue(this.file.name)
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation == null;
    }
  }

  selectFile(){
    this.fileInput.nativeElement.click();
  }

  sendFile(){
    const data: FormData = new FormData();
    data.append(`data`, this.file, this.file.name );
    // Pas d'ajout d'header exposant le content-type, le framework le fait pour vous.
    this.http.post(
      '/article/upload',
      data
    )
      .subscribe(value => {
        this.fileInformation = value as FileInformation;
      })
  }

}
