package fr.iutinfo.neodrone.api;

import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/")
public class ConnectRessource {
	
    private static UtilisateurDAO dao = getDbi().open(UtilisateurDAO.class);

	@POST
	@Path("/connect")
	@Produces({"application/json", "application/xml"})
	public int verif(@FormParam("login:") String login, @FormParam("mdp:") String mdp) {
		System.out.println("LOOOOOOOOOOOOGIN" +login);
		Utilisateur user = dao.findByMail(login);
		/*if(user == null) {
			return -1;
		}*/
		String passwd = dao.findMDPByMail(login);
		System.out.println(passwd);
		if(passwd.equals(mdp)) {
			return user.getId();
		}else {
			return -1;
		}
	}
}
