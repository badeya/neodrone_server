package fr.iutinfo.skeleton.common.dto;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FichierDTO {
	final static Logger logger = LoggerFactory.getLogger(FichierDTO.class);
	private String idF;
	private String idM;
	private String dateF;
	private String nomS;
	private String nomO;
	
	public String getIdF() {
		return idF;
	}
	public void setIdF(String idF) {
		this.idF = idF;
	}
	public String getDateF() {
		return dateF;
	}
	public void setDateF(String dateF) {
		this.dateF = dateF;
	}
	public String getIdM() {
		return idM;
	}
	public void setIdM(String idM) {
		this.idM = idM;
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
	
}
