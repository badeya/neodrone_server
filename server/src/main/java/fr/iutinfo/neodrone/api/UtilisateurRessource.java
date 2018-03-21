package fr.iutinfo.neodrone.api;

import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;

@Path("/Utilisateur")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UtilisateurRessource {
	final static Logger logger = LoggerFactory.getLogger(UtilisateurRessource.class);
    private static UtilisateurDAO dao = getDbi().open(UtilisateurDAO.class);
    
    public void UtlisateurRessource() throws SQLException {
        if (!tableExist("users")) {
            logger.debug("Crate table users");
            dao.createUtilisateurTable();
            dao.insert(new User(0, "Margaret Thatcher", "la Dame de fer"));
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
}
