package fr.iutinfo.neodrone.api;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/test/")
public class Api extends ResourceConfig {

    public Api() {
        packages("fr.iutinfo.skeleton.api");
        //register(LoggingFilter.class);
        
    }

}
