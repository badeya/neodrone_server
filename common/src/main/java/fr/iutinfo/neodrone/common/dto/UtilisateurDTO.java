package fr.iutinfo.neodrone.common.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UtilisateurDTO {
    final static Logger logger = LoggerFactory.getLogger(UtilisateurDTO.class);
    private String nom;
    private String prenom;
    private String role;
    private String societe;
    private String fonction;
    private String ville;
    private String codep;
    private String rue;
    private String mobile;
    private String fixe;
    private int id;
    private String email;
    private String password;
    
    public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getFonction() {
		return fonction;
	}
	public void setFonction(String fonction) {
		this.fonction = fonction;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	public String getCodep() {
		return codep;
	}
	public void setCodep(String codep) {
		this.codep = codep;
	}
	public String getRue() {
		return rue;
	}
	public void setRue(String rue) {
		this.rue = rue;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getFixe() {
		return fixe;
	}
	public void setFixe(String fixe) {
		this.fixe = fixe;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
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

	public String getSociete() {
		return societe;
	}
	public void setSociete(String societe) {
		this.societe = societe;
	}
	public static Logger getLogger() {
		return logger;
	}
}
