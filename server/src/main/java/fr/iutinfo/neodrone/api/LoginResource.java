package fr.iutinfo.neodrone.api;

import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;

@Path("/")
public class LoginResource {
    final static Logger logger = LoggerFactory.getLogger(LoginResource.class);

    @GET
    @Path("/login")
    public UtilisateurDTO secureWhoAmI(@Context SecurityContext context) {
        Utilisateur user = (Utilisateur) context.getUserPrincipal();
        return user.converToDTO();
    }

    @GET
    @Path("/profile")
    @RolesAllowed({"user"})
    public UtilisateurDTO secureByAnnotation(@Context SecurityContext context) {
        Utilisateur user = (Utilisateur) context.getUserPrincipal();
        return user.converToDTO();
    }

}
