package fr.iutinfo.skeleton.common.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UtilisateurDTO {
    final static Logger logger = LoggerFactory.getLogger(UserDto.class);
    String nom;
    String prenom;
	
    public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public static Logger getLogger() {
		return logger;
	}
}
