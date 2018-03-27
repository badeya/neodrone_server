package fr.iutinfo.neodrone.api;

import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Path("/fichier")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public interface FichierDAO {

	@SqlUpdate("create table fichier (idF integer primary key autoincrement,idM varchar(100),dateF  varchar(100),nomS varchar(100),nomO varchar(100))")
	void createFichierTable();
	
	@SqlQuery("select * from fichier where idM = :nom")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Fichier findByName(@Bind("nom") String nom);
	
	@SqlQuery("select * from fichier where nomS = :nom")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Fichier findByFileName(@Bind("nom") String nom);
	
	/*
	@SqlQuery("select * from fichier where idM = :idM")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Fichier findByIdM(@Bind("idM") String idM);
	  */
	@SqlUpdate("insert into fichier (idM,dateF,nomS,nomO) values (:idM, :dateF, :nomS, :nomO)")
    @GetGeneratedKeys
    int insert(@BindBean() Fichier fichier);  
	
	@SqlQuery("select * from fichier order by idF")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Fichier> all();
	
}
