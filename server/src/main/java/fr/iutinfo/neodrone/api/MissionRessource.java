package fr.iutinfo.neodrone.api;
import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
            dao.insert(new Mission(1,"Carle","Debut"));
            dao.insert(new Mission(2,"Carle","Fin"));

        }
    }
    /*
    @GET
    @Path("/{id}")
    public MissionDTO getId(@PathParam("id") int id) {
    	Mission user = dao.findById(id);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
    }
    */
    @GET
    @Path("/{client}")
    public MissionDTO getClient(@PathParam("client") String id) {
    	Mission user = dao.findByClient(id);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
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
