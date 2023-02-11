package com.polytech.apishop.Controllers;

public class UploadFileException extends Exception {
    public UploadFileException() {
        super("Erreur d'upload de fichier");
    }
}
