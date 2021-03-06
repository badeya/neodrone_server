package fr.iutinfo.neodrone.api;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

public interface UtilisateurDAO {
	
	@SqlUpdate("create table utilisateur (id integer primary key autoincrement,nom varchar(100),prenom varchar(100),role varchar(100),societe varchar(100),fonction varchar(100),ville varchar(100),codep varchar(100),rue varchar(100),mobile varchar(100),fixe varchar(100),email varchar(100),password varchar(100))")
	void createUtilisateurTable();
	
	
	@SqlQuery("select * from utilisateur where nom = :nom")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Utilisateur findByName(@Bind("nom") String nom);
	
	@SqlQuery("select * from utilisateur where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Utilisateur findById(@Bind("id") String id);
	  
	@SqlUpdate("insert into utilisateur (nom,prenom,role,societe,fonction,ville,codep,rue,mobile,fixe,email,password) values (:nom, :prenom, :role, :societe, :fonction, :ville, :codep, :rue, :mobile, :fixe, :email, :password)")
    @GetGeneratedKeys
    int insert(@BindBean() Utilisateur user);  
	
	@SqlQuery("select * from utilisateur order by id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Utilisateur> all();
	
	@SqlQuery("select * from utilisateur where email = :email")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Utilisateur findByMail(@Bind("email") String email);
	
	@SqlQuery("select password from utilisateur where email = :email")
	@RegisterMapperFactory(BeanMapperFactory.class)
	String findMDPByMail(@Bind("email") String email);
	
	@SqlUpdate("update utilisateur set nom = :nom, prenom = :prenom, role = :role, societe = :societe, fonction = :fonction, ville = :ville, codep = :codep, rue = :rue, mobile = :mobile, fixe = :fixe, email = :email, password = :password where email = :email")
	@GetGeneratedKeys
	int modifierProfil(@BindBean() Utilisateur user);

}
