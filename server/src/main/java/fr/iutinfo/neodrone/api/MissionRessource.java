package fr.iutinfo.neodrone.api;
import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.MissionDTO;
import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;

@Path("/mission")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MissionRessource {
	final static Logger logger = LoggerFactory.getLogger(MissionRessource.class);
    private static MissionDAO dao = getDbi().open(MissionDAO.class);
    
    public MissionRessource() throws SQLException {
    	logger.debug("Crate table mission if necessary");
        if (!tableExist("mission")) {
            logger.debug("Crate table mission");
            dao.createMissionTable();
            dao.insert(new Mission(1,"Debut","Jean@gmail.com","C'est la meilleur mission"));
            dao.insert(new Mission(2,"Fin","Carle@free.fr","UNe mission incroyable"));
            dao.insert(new Mission(3,"Debut","Carle@yahoo.fr","La pire mission lul"));

        }
    }
    
    @GET
    @Path("/{nom}")
    public List<MissionDTO> getUser(@PathParam("nom") String nom) {
    	List<Mission> users;
        users = dao.all();
        List<MissionDTO> usersDTO = new ArrayList<MissionDTO>();
        for(Mission u : users) {
        	if(u.getClient().equals(nom))
        	usersDTO.add(u.converToDTO());
        }
        return usersDTO;
    }
    
    @POST
    public MissionDTO createMission(MissionDTO dto) {
        Mission user = new Mission();
        user.initFromDto(dto);
        int id = dao.insert(user);
        dto.setId(id);
        return dto;
    }
    
    
    
    
    @GET
    public List<MissionDTO> getAllUsers() {
        List<Mission> users;
        users = dao.all();
        List<MissionDTO> usersDTO = new ArrayList<MissionDTO>();
        for(Mission u : users) {
        	usersDTO.add(u.converToDTO());
        }
        return usersDTO;
    }
}
