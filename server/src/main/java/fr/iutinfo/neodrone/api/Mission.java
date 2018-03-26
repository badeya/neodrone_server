package fr.iutinfo.neodrone.api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.common.dto.MissionDTO;
import fr.iutinfo.neodrone.common.dto.UtilisateurDTO;
public class Mission {
    final static Logger logger = LoggerFactory.getLogger(Mission.class);
    private int id;
    private String etat;
    private String client;
    private String description;
    private String mission;
    
    public Mission() {
    	
    }

	public Mission( int id, String etat, String client, String description, String mission) {
		super();

		this.id = id;
		this.etat = etat;
		this.client=client;
		this.description=description;
		this.mission=mission;
	}


	public String getMission() {
		return mission;
	}

	public void setMission(String mission) {
		this.mission = mission;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
		MissionDTO mission1 = new MissionDTO();
		mission1.setEtat(etat);
		mission1.setId(id);
		mission1.setClient(client);
		mission1.setDescription(description);
		mission1.setMission((mission));
		return mission1;
	}
	
    public void initFromDto(MissionDTO dto) {
    	this.setMission(dto.getMission());
    	this.setClient(dto.getClient());
    	this.setDescription(dto.getDescription());
    	this.setEtat(dto.getEtat());
    	this.setId(dto.getId());
    }
}

