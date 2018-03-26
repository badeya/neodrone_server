package fr.iutinfo.neodrone.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.auth.AuthFilter;


@Path("/")
public class RestFileDemo {

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response postForm(
			@FormDataParam("exampleFileUpload") InputStream file,
			@FormDataParam("exampleFileUpload") FormDataContentDisposition fileDetail) {
		
		Logger logger = LoggerFactory.getLogger(AuthFilter.class);
		logger.debug("Trying to upload file...");
		
		String uploadedFileLocation = "/home/infoetu/sengesc/neodrone/neodrone_serveur/server/src/main/webapp/uploads/"
				+ fileDetail.getFileName();

		// save it
		writeToFile(file, uploadedFileLocation);

		String output = "File uploaded to : " + uploadedFileLocation;
		logger.debug(output);

		return Response.status(200).entity(output).build();
	}

	// save uploaded file to new location
	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation) {

		try {
			OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {

			e.printStackTrace();
		}

	}

}