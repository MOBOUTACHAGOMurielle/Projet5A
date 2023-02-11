package com.polytech.apishop;

import com.polytech.apishop.Entities.ERole;
import com.polytech.apishop.Entities.panier;
import com.polytech.apishop.Entities.role;
import com.polytech.apishop.Entities.utilisateur;
import com.polytech.apishop.Repos.utilisateurRepository;
import com.polytech.apishop.ServiceImpl.articleServiceImpl;
import com.polytech.apishop.ServiceImpl.categorieServiceImpl;

import com.polytech.apishop.ServiceImpl.utilisateurServiceImpl;
import com.polytech.apishop.Services.utilisateurService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class ApishopApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApishopApplication.class, args);
	}



	@Bean
	CommandLineRunner runner(articleServiceImpl service, categorieServiceImpl categorie, utilisateurService userservice){
		return args -> {

			userservice.saveRole(new role(ERole.ROLE_USER));
			userservice.saveRole(new role(ERole.ROLE_ADMIN));

			categorie.addCategorie("Jean", "Jean Taille haute", "https://img.ltwebstatic.com/images3_pi/2022/11/17/16686539168424991a5eff2b21190289a0f54e30d9.webp");
			categorie.addCategorie("Manteau", "Manteau d'hiver", "https://img.ltwebstatic.com/images3_pi/2022/10/16/1665890756543a3ecf8cc86fb7b45e5fbc16be5339.webp");
			categorie.addCategorie("Tee-shirt", "T-shirt à rayures","https://img.ltwebstatic.com/images3_pi/2021/07/19/1626688710567f48a418db802fc1a7aeb6e530e82d_thumbnail_405x552.webp");
			categorie.addCategorie("Accessoire", "Ceinture tressée","https://img.ltwebstatic.com/images3_pi/2020/06/12/15919394560e46d25e8cf1f922ba3e0d7e71c9ff33_thumbnail_405x552.webp");

			service.addArticle("Jean permé à poche","Jean Bleu 100% coton",20,"L",5,4,"https://img.ltwebstatic.com/images3_pi/2022/11/26/1669398247e40df689ca9060b99f93d6fec96a2f97_thumbnail_900x.webp", categorie.getCategorie("Jean"));
			service.addArticle("Jean skinny à poche","Jean unicolore, zippé à fermeture éclair",18,"S",15,4,"https://img.ltwebstatic.com/images3_pi/2022/12/25/1671957997c091511b3688a268d341cb0590b73929_thumbnail_900x.webp", categorie.getCategorie("Jean"));
			service.addArticle("Jogging à poche","Couleur kaki, unicolore, zippé",40,"L",5,5,"https://img.ltwebstatic.com/images3_pi/2021/10/13/1634103329e75da45c149814b4fd7d61e4bb8949ef_thumbnail_900x.webp", categorie.getCategorie("Jean"));
			service.addArticle("Jean skinny délavé","Jean clair, élasticité moyenne",40,"XL",15,4,"https://img.ltwebstatic.com/images3_pi/2022/10/09/1665282721faa7e2c2ef775d25a5608ee33b1938d4_thumbnail_900x.webp", categorie.getCategorie("Jean"));
			service.addArticle("Jean skinny déchiré","Gris foncé coupe régulière",35,"M",20,5,"https://img.ltwebstatic.com/images3_pi/2022/09/23/166392024681f1d9a2f1d8c5701153e5f365d32b6e_thumbnail_900x.webp", categorie.getCategorie("Jean"));

			service.addArticle("Manteau à doublure","Bleu marine, col chemise",100,"L",15,5,"https://img.ltwebstatic.com/images3_pi/2022/11/09/16679568160efff600c940a47727029f4961e81893_thumbnail_900x.webp", categorie.getCategorie("Manteau"));
			service.addArticle("Manteau Col à revers","100% polyvester",150,"M",10,5,"https://img.ltwebstatic.com/images3_pi/2021/09/07/16309926408d96c656301eaf08bba3a02ef70b908f_thumbnail_900x.webp", categorie.getCategorie("Manteau"));
			service.addArticle("Manteau à tissu duveteux","Carreau, boutons, poche",100,"L",15,5,"https://img.ltwebstatic.com/images3_pi/2021/10/25/1635142335f67098686c3506e9c2d04143f7950230_thumbnail_900x.webp", categorie.getCategorie("Manteau"));
			service.addArticle("Doudoune avec poche","Mi-Long, Classique",60,"S",5,4,"https://img.ltwebstatic.com/images3_pi/2021/11/16/16370710463bfe657261237a1d30d2348db00f7323.webp", categorie.getCategorie("Manteau"));
			service.addArticle("Manteau à bloc de couleur et revers","Fermeture éclair, flanelle",80,"XS",20,5,"https://img.ltwebstatic.com/images3_pi/2021/10/09/1633762261cc5d60d6a3e4282f6545e8f1a07675e5_thumbnail_900x.webp", categorie.getCategorie("Manteau"));

			service.addArticle("Tee-Shirt à bloc de couleurs","Multicore, col rond",40,"L",55,5,"https://img.ltwebstatic.com/images3_pi/2022/06/28/16563984587e0037f04d11633190a91f5b15d67b47_thumbnail_900x.webp", categorie.getCategorie("Tee-shirt"));
			service.addArticle("T-Shirt à lettres","Blanc, Lettres, Col rond",20,"S",5,3,"https://img.ltwebstatic.com/images3_pi/2022/05/25/1653468327fe9d8ab2dfa3c0cd1696d5b51d995e30_thumbnail_900x.webp", categorie.getCategorie("Tee-shirt"));
			service.addArticle("T-Shirt bicolore","tabac, Casual",50,"M",15,5,"https://img.ltwebstatic.com/images3_pi/2022/08/29/1661740693ae956e5ab5590f4d4ab398d76991b5be_thumbnail_900x.webp", categorie.getCategorie("Tee-shirt"));
			service.addArticle("Blouse avec dentelle","Top, col en V",40,"XS",25,5,"https://img.ltwebstatic.com/images3_pi/2022/04/06/1649208782f8e6f8c29159199a48be250a6783580e_thumbnail_900x.webp", categorie.getCategorie("Tee-shirt"));
			service.addArticle("Blouse à rayure","Découpe V",40,"S",33,5,"https://img.ltwebstatic.com/images3_pi/2022/04/22/1650593879644b54a7b868bfcf89bce6ad6d8acc4f_thumbnail_900x.webp", categorie.getCategorie("Tee-shirt"));

			service.addArticle("Aneau avec zicorne cubique","Glamour",40,"S",55,5,"https://img.ltwebstatic.com/images3_pi/2022/09/20/16636380254593352c89f149981052797cb74060fb_thumbnail_900x.webp", categorie.getCategorie("Accessoire"));
			service.addArticle("Pendant d'oreilles","Vacance, rond, bois",20,"L",5,4,"https://img.ltwebstatic.com/images3_pi/2022/09/20/1663654870a4eff61b288baf537f6ffbf17ee0049d_thumbnail_900x.webp", categorie.getCategorie("Accessoire"));
			service.addArticle("Echarpe à carreaux","Gris, carreaux, Tissu tissé",20,"L",10,5,"https://img.ltwebstatic.com/images3_pi/2022/09/19/166356555234952e4ac397dd2dece225e014a49f8c_thumbnail_900x.webp", categorie.getCategorie("Accessoire"));
			service.addArticle("Epingle à cheveux","Perle géométrique",50,"XS",55,5,"https://img.ltwebstatic.com/images3_pi/2022/05/26/16535668433c0868a0e823e8c6236dd8285ae0a87d_thumbnail_900x.webp", categorie.getCategorie("Accessoire"));
			service.addArticle("Cravate & Noeud","Bleu marine, unicolore",50,"L",35,5,"https://img.ltwebstatic.com/images3_pi/2022/01/21/16427294077e69fef2e8de2df6b050d141a15366e4_thumbnail_900x.webp", categorie.getCategorie("Accessoire"));
//
//			utilisateur user = new utilisateur("user@test.fr","password","Borne","Christine","mail",null,new ArrayList<>(),null,null);
			userservice.save(new utilisateur("user@test.fr","password","Borne","Christine","mail",null,new ArrayList<>(),null,null));

			userservice.addRoleToUSer("user@test.fr", ERole.ROLE_ADMIN.name());

//			utilisateur user = new utilisateur();
//			user.setUsername("test");
//			user.setPassword("password");
//			user.setAuthorities(new ArrayList<>());
//			userservice.save(user);
//
//			utilisateur admin = new utilisateur();
//			admin.setNom("Sam");
//			admin.setPrenom("Alex");
//			admin.setUsername("user@test.fr");
//			admin.setPassword("password");
//			userservice.save(admin);
//			userservice.addRoleToUSer(admin.getUsername(), ERole.ROLE_ADMIN.name());
		};
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		//corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200","http://13.37.112.147","http://www.tosucceed.site" ,"http://tosucceed.site"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
