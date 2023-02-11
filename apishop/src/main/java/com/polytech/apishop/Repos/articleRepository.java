package com.polytech.apishop.Repos;

import java.util.List;

import com.polytech.apishop.Entities.categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.polytech.apishop.Entities.article;

@Repository
public interface articleRepository extends JpaRepository<article,Integer> {
    List<article> findAllByNameStartingWithIgnoreCase(String name);

//    article getById_article(Integer id);

    @Query("SELECT a FROM article a WHERE a.id_article = :id")
     article findById_article(@Param("id") Integer id);



//    boolean existsById_article(Integer id);

    List<article> findAllByCategories(categories categorie);
    //article getArticleById(int id);

    @Query("SELECT a.description FROM article a WHERE a.id_article = :id")
    String findDescription(@Param("id") Integer id_article);

}
