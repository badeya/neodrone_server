package fr.iutinfo.neodrone.common.dto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MissionDTO {
    final static Logger logger = LoggerFactory.getLogger(MissionDTO.class);
    
    private int id;
    private String etat;
    private String client;
    private String description;
    private String mission;
    
	public String getMission() {
		return mission;
	}
	public void setMission(String mission) {
		this.mission = mission;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEtat() {
		return etat;
	}
	public void setEtat(String etat) {
		this.etat = etat;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public static Logger getLogger() {
		return logger;
	}
}
