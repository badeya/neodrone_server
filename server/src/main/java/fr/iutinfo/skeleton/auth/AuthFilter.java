package fr.iutinfo.skeleton.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.api.BDDFactory;
import fr.iutinfo.neodrone.api.Utilisateur;
import fr.iutinfo.neodrone.api.UtilisateurDAO;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

@Provider
@PreMatching
public class AuthFilter implements ContainerRequestFilter {
    private final static Logger logger = LoggerFactory.getLogger(AuthFilter.class);

    @Override
    public void filter(ContainerRequestContext containerRequest) throws WebApplicationException {
        String authorizationHeader = containerRequest.getHeaderString(HttpHeaders.AUTHORIZATION);
        String scheme = containerRequest.getUriInfo().getRequestUri().getScheme();
        logger.debug("authorizationHeader : " + authorizationHeader);

        if (authorizationHeader != null) {
            String[] loginPassword = BasicAuth.decode(authorizationHeader);
            checkLoginPassword(loginPassword);
            String login = loginPassword[0];
            String password = loginPassword[1];
            logger.debug("login : " + login + ", password : " + password);
            Utilisateur user = loadUserFromLogin(login);
            if (user.isGoodPassword(password)) {
                logger.debug("good password !");
                containerRequest.setSecurityContext(new AppSecurityContext(user, scheme));
            } else {
                containerRequest.setSecurityContext(new AppSecurityContext(Utilisateur.getAnonymousUser(), scheme));
            }
        } else {
            containerRequest.setSecurityContext(new AppSecurityContext(Utilisateur.getAnonymousUser(), scheme));
        }
    }

    private Utilisateur loadUserFromLogin(String login) {
        UtilisateurDAO dao = BDDFactory.getDbi().open(UtilisateurDAO.class);
        Utilisateur user = dao.findByName(login);
        if (user == null) {
            user = Utilisateur.getAnonymousUser();
        }
        return user;
    }

    private void checkLoginPassword(String[] loginPassword) {
        if (loginPassword == null || loginPassword.length != 2) {
            throw new WebApplicationException(Status.NOT_ACCEPTABLE);
        }
    }
}
