package fr.iutinfo.neodrone.api;

import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

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

import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;

@Path("/utilisateur")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UtilisateurRessource {
	final static Logger logger = LoggerFactory.getLogger(UtilisateurRessource.class);
    private static UtilisateurDAO dao = getDbi().open(UtilisateurDAO.class);
    
    public UtilisateurRessource() throws SQLException {
    	logger.debug("Crate table users if necessary");
        if (!tableExist("utilisateur")) {
            logger.debug("Crate table users");
            dao.createUtilisateurTable();
           // dao.insert(new Utilisateur(1, "Carle", "Jean"));
           // dao.insert(new Utilisateur(1, "Carle", "Jean","test"));
            //dao.insert(new Utilisateur(2, "larle", "Jean","test"));
            dao.insert(new Utilisateur(1,"Carle","Jean","admin","neodrone","pdg","Lille","59000","rue 1","0602","0302","test@gmail.com","mdp"));
            dao.insert(new Utilisateur(2,"Bruno","François","client","neodrone","sousfifre","Paris","59000","rue de la liberté","06020040040","0300042012","dsdsds@gmail.com","mdp2ouf"));

        }
    }
    /*
    @GET
    @Path("/{nom}")
    public UtilisateurDTO getUser(@PathParam("nom") String nom) {
        Utilisateur user = dao.findById(nom);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
    }
    */
    @GET
    @Path("/{email}")
    public UtilisateurDTO getUser2(@PathParam("email") String email) {
        Utilisateur user = dao.findByMail(email);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
    }
    
    
    @PUT
    public UtilisateurDTO modifUser(UtilisateurDTO dto) {
    	Utilisateur user = dao.findByMail(dto.getEmail());
    	if (user == null) {
            throw new WebApplicationException(404);
        }
    	user.initFromDto(dto);
    	dao.modifierProfil(user);
    	return dto;
    }
    
    
    @POST
    public UtilisateurDTO createUser(UtilisateurDTO dto) {
        Utilisateur user = new Utilisateur();
        user.initFromDto(dto);
        user.resetPasswordHash();
        int id = dao.insert(user);
        dto.setId(id);
        return dto;
    }
    
    /*
    @POST
    @RolesAllowed({"admin"})
    @Path("/insertion")
    public void postUser(@PathParam("nom") String nom ,@PathParam("prenom") String prenom,@PathParam("role") String role,@PathParam("societe") String societe ,@PathParam("fonction") String fonction,@PathParam("ville") String ville,@PathParam("codep") String codep,@PathParam("rue") String rue,@PathParam("mobile") String mobile,@PathParam("fixe") String fixe,@PathParam("email") String email,@PathParam("password") String password)
    {
    	 dao.insert(new Utilisateur(1,nom,prenom,role,societe,fonction,ville,codep,rue,mobile,fixe,email,password));

    }*/
    /*
    @GET
    @Path("/{id}")
    public UtilisateurDTO getId(@PathParam("nom") String nom) {
        Utilisateur user = dao.findByName(nom);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.converToDTO();
    }
    */
    @GET
    public List<UtilisateurDTO> getAllUsers() {
        List<Utilisateur> users;
        users = dao.all();
        List<UtilisateurDTO> usersDTO = new ArrayList<UtilisateurDTO>();
        for(Utilisateur u : users) {
        	usersDTO.add(u.converToDTO());
        	System.out.println(u.getNom());
        }
        return usersDTO;
    }
}
