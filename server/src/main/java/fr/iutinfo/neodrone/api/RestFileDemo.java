package fr.iutinfo.neodrone.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.codec.binary.Hex;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.auth.AuthFilter;


@Path("/")
public class RestFileDemo {
	
	private String uploadRoot = System.getProperty("user.dir") + "/src/main/webapp/uploads/";
	//private String uploadRoot = "/tmp/";
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response postForm(
			@FormDataParam("exampleFileUpload") InputStream file,
			@FormDataParam("exampleFileUpload") FormDataContentDisposition fileDetail,
			@FormDataParam("missionId") String missionId) {
		
		// --- LOG
		Logger logger = LoggerFactory.getLogger(AuthFilter.class);
		logger.debug("Trying to upload file...");
		// --- ENDOF LOG
		
		String originalFileName = fileDetail.getFileName();
		String serverFileName = generateFileName(originalFileName);
		
		String uploadedFileLocation = uploadRoot + generateFileName(originalFileName);
		
		System.out.println(uploadRoot);
		
		// Insert in DB
		createEntry(missionId, serverFileName, originalFileName);

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
		
		Logger logger = LoggerFactory.getLogger(AuthFilter.class);
		logger.debug(raw);
		
		MessageDigest messageDigest = null;
		
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(raw.getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			System.exit(1);
		}
		
		String hashName = new String(Hex.encodeHexString(messageDigest.digest()));
		logger.debug(hashName);
		
		return hashName;
	}
	
	private void createEntry(String idMission, String serverName, String realName) {
		FichierRessource.getDao().insert(new Fichier(
				"42", 
				idMission,
				DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.SHORT).format(new Date()),
				serverName, 
				realName
		));
	}
}