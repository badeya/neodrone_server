package fr.iutinfo.neodrone.api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.MissionDTO;
import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;
public class Mission {
    final static Logger logger = LoggerFactory.getLogger(Mission.class);
    private String client;
    private int id;
    private String etat;
    
    public Mission() {
    	
    }

	public Mission( int id,String client, String etat) {
		super();
		this.client = client;
		this.id = id;
		this.etat = etat;
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
    
	public static Logger getLogger() {
		return logger;
	}
	
	public MissionDTO converToDTO() {
		MissionDTO mission = new MissionDTO();
		mission.setClient(client);
		mission.setEtat(etat);
		mission.setId(id);
		return mission;
	}
}

