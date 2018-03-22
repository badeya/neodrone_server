package fr.iutinfo.neodrone.api;

import java.security.Principal;
import java.security.SecureRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Charsets;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;

import fr.iutinfo.skeleton.common.dto.UtilisateurDTO;

public class Utilisateur implements Principal  {
    final static Logger logger = LoggerFactory.getLogger(Utilisateur.class);
    private String nom;
    private String prenom;
    private String role;
    private String societe;
    private String fonction;
    private String ville;
    private String codep;
    private String rue;
    private String mobile;
    private String fixe;
    private int id = 0;
    private String email;
    private String password;
    private static Utilisateur anonymous = new Utilisateur(-1, "Anonymous", "anonym");
    private String passwdHash;
    private String salt;
    private String search;
	
    public Utilisateur(int id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public Utilisateur(int id, String nom, String prenom) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
    }
    public Utilisateur(int id, String nom, String prenom, String societe) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.societe=societe;
    }

    public Utilisateur() {
    }
    
    public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getSociete() {
		return societe;
	}
	public void setSociete(String societe) {
		this.societe = societe;
	}
	public String getFonction() {
		return fonction;
	}
	public void setFonction(String fonction) {
		this.fonction = fonction;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	public String getCodep() {
		return codep;
	}
	public void setCodep(String codep) {
		this.codep = codep;
	}
	public String getRue() {
		return rue;
	}
	public void setRue(String rue) {
		this.rue = rue;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getFixe() {
		return fixe;
	}
	public void setFixe(String fixe) {
		this.fixe = fixe;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public static Logger getLogger() {
		return logger;
	}
	
	public UtilisateurDTO converToDTO() {
		UtilisateurDTO user = new UtilisateurDTO();
		user.setNom(nom);
		user.setPrenom(prenom);
		user.setRole(role);
		user.setCodep(codep);
		user.setEmail(email);
		user.setFixe(fixe);
		user.setFonction(fonction);
		user.setId(id);
		user.setMobile(mobile);
		user.setRue(rue);
		user.setSociete(societe);
		return user;
	}

	public Utilisateur( int id ,String nom, String prenom, String role, String societe, String fonction, String ville,
			String codep, String rue, String mobile, String fixe, String email, String password) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.role = role;
		this.societe = societe;
		this.fonction = fonction;
		this.ville = ville;
		this.codep = codep;
		this.rue = rue;
		this.mobile = mobile;
		this.fixe = fixe;
		this.id = id;
		this.email = email;
		this.password = password;
	}
	

	public boolean isGoodPassword(String password) {
        if (isAnonymous()) {
            return false;
        }
        /*String hash = buildHash(password, getSalt());
        return hash.equals(getPasswdHash());*/
        //On remettra le Hash plus tard
        return this.password.equals(password);
    }
	
	public boolean isAnonymous() {
        return this.getId() == getAnonymousUser().getId();
    }
	
	 public static Utilisateur getAnonymousUser() {
	        return anonymous;
	    }
	 
	 private String buildHash(String password, String s) {
	        Hasher hasher = Hashing.sha256().newHasher();
	        hasher.putString(password + s, Charsets.UTF_8);
	        return hasher.hash().toString();
	    }
	 
	 public String getPasswdHash() {
	        return passwdHash;
	    }

	    public void setPasswdHash(String passwdHash) {
	        this.passwdHash = passwdHash;
	    }
	    public String getSalt() {
	        if (salt == null) {
	            salt = generateSalt();
	        }
	        return salt;
	    }
	    private String generateSalt() {
	        SecureRandom random = new SecureRandom();
	        Hasher hasher = Hashing.sha256().newHasher();
	        hasher.putLong(random.nextLong());
	        return hasher.hash().toString();
	    }

	    public void setSalt(String salt) {
	        this.salt = salt;
	    }
	    
	    public boolean isInUserGroup() {
	        return !(id == anonymous.getId());
	    }
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return nom;
	}
    
}	
