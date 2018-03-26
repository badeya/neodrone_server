package fr.iutinfo.neodrone.api;

import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.MediaType;

@Path("/")
public class DowloadDemo {
	
		
	
	String localDir = System.getProperty("user.dir");
	private final String FILE_PATH3 = new File(localDir+"/src/main/webapp/dowload/videotest.mp4").getPath();
			
	

	@GET
	@Path("/download")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile() {

		File file = new File(FILE_PATH3);

		ResponseBuilder response = Response.ok((Object) file);
		response.header("Content-Disposition", "attachment; filename="+file.getName());
		return response.build();

		
	}
	
	
	
	

}
