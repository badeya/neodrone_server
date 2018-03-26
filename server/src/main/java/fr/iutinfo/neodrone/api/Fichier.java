package fr.iutinfo.neodrone.api;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.FichierDTO;


public class Fichier {
    final static Logger logger = LoggerFactory.getLogger(Fichier.class);
	private String idF;
	private String idM;
	private String dateF;
	private String nomS;
	private String nomO;
	
	
	public Fichier(String idF, String idM, String dateF, String nomS, String nomO) {
		super();
		this.idF = idF;
		this.idM = idM;
		this.dateF = dateF;
		this.nomS = nomS;
		this.nomO = nomO;
	}
	public Fichier() {
		
	}
	public String getIdF() {
		return idF;
	}
	public void setIdF(String idF) {
		this.idF = idF;
	}
	public String getIdM() {
		return idM;
	}
	public void setIdM(String idM) {
		this.idM = idM;
	}
	public String getdateF() {
		return dateF;
	}
	public void setdateF(String dateF) {
		this.dateF = dateF;
	}
	public String getNomS() {
		return nomS;
	}
	public void setNomS(String nomS) {
		this.nomS = nomS;
	}
	public String getNomO() {
		return nomO;
	}
	public void setNomO(String nomO) {
		this.nomO = nomO;
	}
	public static Logger getLogger() {
		return logger;
	}
	
	public FichierDTO converToDTO() {
		FichierDTO user = new FichierDTO();
		user.setIdF(idF);
		user.setIdM(idM);
		user.setNomO(nomO);
		user.setNomS(nomS);
		user.setDateF(dateF);
		return user;
	}
	
    public void initFromDto(FichierDTO dto) {
    	this.setIdF(dto.getIdF());
    	this.setIdM(dto.getIdM());
    	this.setNomO(dto.getNomO());
    	this.setNomS(dto.getNomS());
    	this.setdateF(dto.getDateF());
    }
}
