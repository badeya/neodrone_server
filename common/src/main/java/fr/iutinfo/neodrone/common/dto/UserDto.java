package fr.iutinfo.neodrone.common.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;

public class UserDto {
    final static Logger logger = LoggerFactory.getLogger(UserDto.class);
    private String name;
    private String prenom;
    private int id = 0;
    private String email;
    private String password;
    private String role;
    private String societe;
    private String fonction;
    private String ville;
    private String codep;
    private String rue;
    private String mobile;
    private String fixe;

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

	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

}
