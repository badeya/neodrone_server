package fr.iutinfo.neodrone.api;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import fr.iutinfo.neodrone.auth.AuthFilter;

@ApplicationPath("/test/")
public class Api extends ResourceConfig {

	public Api() {
		packages("fr.iutinfo.neodrone.api");
		register(AuthFilter.class);
		// packages("fr.iutinfo.skeleton.api");
		// register(LoggingFilter.class);
		// packages("org.glassfish.jersey.media.multipart");
		register(MultiPartFeature.class);
		// packages("org.glassfish.jersey.media.multipart.internal");
	}

}
