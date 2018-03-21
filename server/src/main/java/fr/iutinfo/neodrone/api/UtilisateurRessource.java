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

import fr.iutinfo.skeleton.common.dto.UserDto;
import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;

@Path("/utilisateur")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UtilisateurRessource {
	final static Logger logger = LoggerFactory.getLogger(UtilisateurRessource.class);
    private static UtilisateurDAO dao = getDbi().open(UtilisateurDAO.class);
    
    public UtilisateurRessource() throws SQLException {
        if (!tableExist("utilisateur")) {
            logger.debug("Crate table users");
            dao.createUtilisateurTable();
            dao.insert(new Utilisateur(1, "Carle", "Jean"));
        }
    }
    
    @GET
    @Path("/{nom}")
    public UtilisateurDTO getUser(@PathParam("nom") String nom) {
        Utilisateur user = dao.findByName(nom);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
    }
    
    @GET
    public List<UtilisateurDTO> getAllUsers() {
        List<Utilisateur> users;
        users = dao.all();
        List<UtilisateurDTO> usersDTO = new ArrayList<UtilisateurDTO>();
        for(Utilisateur u : users) {
        	usersDTO.add(u.converToDTO());
        }
        return usersDTO;
    }
}
