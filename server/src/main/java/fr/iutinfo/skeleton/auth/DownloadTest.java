package fr.iutinfo.skeleton.auth;

import java.io.File;
import java.net.URL;

import org.apache.commons.io.FileUtils;

public class DownloadTest {
	public DownloadTest() throws Exception {
		run();
	}

	private void run() throws Exception {
		String LOCAL_FILE = "/home/infoetu/sengesc/testa.jpg";
		String URL_LOCATION = "http://localhost:8080";
		
		File dstFile = null;
		// check the directory for existence.
		String dstFolder = LOCAL_FILE.substring(0, LOCAL_FILE.lastIndexOf(File.separator));
		if(!(dstFolder.endsWith(File.separator) || dstFolder.endsWith("/")))
		    dstFolder += File.separator;
		
		dstFolder += "tata.jpg";

		// Creates the destination folder if doesn't not exists
		dstFile = new File(dstFolder);
		if (!dstFile.exists()) {
		    dstFile.mkdirs();
		}
		try {
		    URL url = new URL(URL_LOCATION);
		    FileUtils.copyURLToFile(url, dstFile);
		} catch (Exception e) {
		    System.err.println(e);
		    //VeBLogger.getInstance().log( e.getMessage());
		}
	}

	public static void main(String[] args) throws Exception {
		new DownloadTest();
	}
}
