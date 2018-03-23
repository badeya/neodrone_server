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

	private static final String FILE_PATH = "/home/infoetu/badeya/nedrone/neodrone_serveur/server/src/main/webapp"
			+ "/dowload/videotest.mp4";
	private static final String FILE_PATH2 = "/tmp/DJI_0137.MOV";

	@GET
	@Path("/download")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getFile() {

		File file = new File(FILE_PATH);

		ResponseBuilder response = Response.ok((Object) file);
		response.header("Content-Disposition", "attachment; filename="+file.getName());
		return response.build();

		
	}

}
