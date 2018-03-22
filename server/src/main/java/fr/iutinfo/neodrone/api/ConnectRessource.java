package fr.iutinfo.neodrone.api;

import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/")
public class ConnectRessource {
	
    private static UtilisateurDAO dao = getDbi().open(UtilisateurDAO.class);

	@GET
	@Path("/connect")
	public int verif(@PathParam("login") String login, @PathParam("mdp") String mdp) {
		Utilisateur user = dao.findByMail(login);
		if(user == null) {
			return -1;
		}
		String passwd = dao.findMDPByMail(login);
		if(passwd.equals(mdp)) {
			return user.getId();
		}else {
			return -1;
		}
	}
}
