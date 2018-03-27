package fr.iutinfo.neodrone.api;

import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("/")
public class DowloadDemo {
	
		
	
	private final String localDir = System.getProperty("user.dir");
	
			
	

	@GET
	@Path("/download/{idF}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile(@PathParam("idF") String idF) {
		String FILE_PATH = new File(localDir+"/src/main/webapp/uploads/"+idF).getPath();
		File file = new File(FILE_PATH);
		
		System.out.println(idF);
		System.out.println(FILE_PATH);

		ResponseBuilder response = Response.ok((Object) file);
		Fichier data = FichierRessource.getDao().findByFileName(idF);
		
		response.header("Content-Disposition", "attachment; filename="+ data.getNomO());
		return response.build();

		
	}
	
	
	
	

}
