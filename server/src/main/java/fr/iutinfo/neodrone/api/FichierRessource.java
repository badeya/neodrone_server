package fr.iutinfo.neodrone.api;
import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.common.dto.MissionDTO;
import fr.iutinfo.skeleton.common.dto.FichierDTO;


@Path("/fichier")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FichierRessource {
	final static Logger logger = LoggerFactory.getLogger(FichierRessource.class);
    private static FichierDAO dao = getDbi().open(FichierDAO.class);
    java.util.Date d1 = new java.util.Date();
    java.sql.Date d2 = new java.sql.Date(d1.getTime());



    public FichierRessource() throws SQLException {
    	logger.debug("Crate table fichier if necessary");
        if (!tableExist("fichier")) {
            logger.debug("Crate table fichier");
            dao.createFichierTable();
           dao.insert(new Fichier("1","2",d2+"", "0X121212", "photoAntenne"));
           dao.insert(new Fichier("2","2",d2+"", "xaxaxaxa", "photo90cm"));
           dao.insert(new Fichier("42","1",d2+"", "xoxoxoxoxo", "photo60cm"));



        }
    }

    @GET
    @Path("/{idM}")
    public List<FichierDTO> getUser2(@PathParam("idM") String idM) {
    	List<Fichier> users;
        users = dao.all();
        List<FichierDTO> usersDTO = new ArrayList<FichierDTO>();
        for(Fichier u : users) {
        	if(u.getIdM().equals(idM))
        	usersDTO.add(u.converToDTO());
        }
        return usersDTO;
    }
    
    
    
   
    
    
    @POST
    public FichierDTO createUser(FichierDTO dto) {
        Fichier user = new Fichier();
        user.initFromDto(dto);
        int id = dao.insert(user);
        dto.setIdF(id+"");
        return dto;
    }
    

    @GET
    public List<FichierDTO> getAllFichier() {
        List<Fichier> users;
        users = dao.all();
        List<FichierDTO> usersDTO = new ArrayList<FichierDTO>();
        for(Fichier u : users) {
        	usersDTO.add(u.converToDTO());
        	System.out.println(u.getNomO());
        }
        return usersDTO;
    }
    
    public static FichierDAO getDao() {
    	return dao;
    }
}
