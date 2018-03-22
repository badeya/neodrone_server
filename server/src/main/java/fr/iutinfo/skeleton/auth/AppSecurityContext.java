package fr.iutinfo.skeleton.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.api.User;
import fr.iutinfo.neodrone.api.Utilisateur;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class AppSecurityContext implements SecurityContext {
    final static Logger logger = LoggerFactory.getLogger(AppSecurityContext.class);
    private Utilisateur utilisateur;
    private String scheme;

    public AppSecurityContext(Utilisateur user, String scheme) {
        this.utilisateur = user;
        this.scheme = scheme;
    }

    @Override
    public Principal getUserPrincipal() {
        return this.utilisateur;
    }

    @Override
    public boolean isUserInRole(String s) {
        logger.debug("isUserInRole called for : "+ s);
        if ("client".equals(s)){
            return utilisateur.isInUserGroup();
        }
            return true;

    }

    @Override
    public boolean isSecure() {
        return "https".equals(this.scheme);
    }

    @Override
    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }
}
