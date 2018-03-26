package fr.iutinfo.neodrone.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

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
	
	private String uploadRoot = "/home/infoetu/sengesc/neodrone/neodrone_serveur/server/src/main/webapp/uploads/";

	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response postForm(
			@FormDataParam("exampleFileUpload") InputStream file,
			@FormDataParam("exampleFileUpload") FormDataContentDisposition fileDetail) {
		
		// --- LOG
		Logger logger = LoggerFactory.getLogger(AuthFilter.class);
		logger.debug("Trying to upload file...");
		// --- ENDOF LOG
		
		String originalFileName = fileDetail.getFileName();
		String serverFileName = generateFileName(originalFileName);
		
		String uploadedFileLocation = uploadRoot + serverFileName;

		// save it
		writeToFile(file, uploadedFileLocation);

		// --- LOG
		String output = "File uploaded to : " + uploadedFileLocation;
		logger.debug(output);
		// --- ENDOF LOG

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
	
	private String generateFileName(String original) {
		String raw = original + (new Timestamp(System.currentTimeMillis()));
		
		MessageDigest messageDigest = null;
		
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			System.exit(1);
		}
		
		messageDigest.update(raw.getBytes());
		
		String hashName = new String(messageDigest.digest());
		
		return hashName;
	}
}