package fr.iutinfo.neodrone.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;


@Path("/")
public class RestFileDemo  {
	
    @POST
    @Path("/upload")
    @Consumes("multipart/form-data")
    public Response uploadFile(MultipartFormDataInput input) throws IOException {
          
        Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
 
        // Get file data to save
        List<InputPart> inputParts = uploadForm.get("attachment");
 
        for (InputPart inputPart : inputParts) {
            try {
 
                MultivaluedMap<String, String> header = inputPart.getHeaders();
                String fileName = getFileName(header);
   
                // convert the uploaded file to inputstream
                InputStream inputStream = inputPart.getBody(InputStream.class,
                        null);
 
                byte[] bytes = IOUtils.toByteArray(inputStream);
                // constructs upload file path
                fileName = "/home/infoetu/sengesc/neodrone/neodrone_serveur/server/src/main/webapp" + fileName;
                writeFile(bytes, fileName);
 
                  
                return Response.status(200).entity("Uploaded file name : " + fileName).build();
 
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
 
    private String getFileName(MultivaluedMap<String, String> header) {
 
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
 
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
 
                String[] name = filename.split("=");
 
                String finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }
 
    // Utility method
    private void writeFile(byte[] content, String filename) throws IOException {
        File file = new File(filename);
        if (!file.exists()) {
            System.out.println("not exist> " + file.getAbsolutePath());
            file.createNewFile();
        }
        FileOutputStream fop = new FileOutputStream(file);
        fop.write(content);
        fop.flush();
        fop.close();
    }
}