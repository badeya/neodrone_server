package fr.iutinfo.neodrone.api;

import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.MediaType;

@Path("/")
public class DowloadDemo {
	
		
	
	private final String localDir = System.getProperty("user.dir");
	
			
	

	@GET
	@Path("/download/{idF}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile(@PathParam("idF") String idF) {
		String FILE_PATH = new File(localDir+"/src/main/webapp/dowload/"+idF).getPath();
		File file = new File(FILE_PATH);

		ResponseBuilder response = Response.ok((Object) file);
		response.header("Content-Disposition", "attachment; filename="+file.getName());
		return response.build();

		
	}
	
	
	
	

}
