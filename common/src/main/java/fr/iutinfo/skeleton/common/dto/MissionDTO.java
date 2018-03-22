package fr.iutinfo.skeleton.common.dto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MissionDTO {
    final static Logger logger = LoggerFactory.getLogger(MissionDTO.class);
    private String Client;
    private int id;
    private String Etat;
	public String getClient() {
		return Client;
	}
	public void setClient(String client) {
		Client = client;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEtat() {
		return Etat;
	}
	public void setEtat(String etat) {
		Etat = etat;
	}
	public static Logger getLogger() {
		return logger;
	}
}
