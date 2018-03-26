package fr.iutinfo.neodrone.api;
import java.util.List;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;
public interface MissionDAO {
	@SqlUpdate("create table mission (id integer primary key autoincrement,etat varchar(100),client varchar(100),description varchar(500),mission varchar(100))")
	void createMissionTable();
	
	@SqlQuery("select * from mission where client = :nom")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Mission findByName(@Bind("nom") String nom);

	  
	@SqlUpdate("insert into mission(etat,client,description,mission) values (:etat,:client,:description,:mission)")
    @GetGeneratedKeys
    int insert(@BindBean() Mission user);  
	
	@SqlQuery("select * from mission order by id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Mission> all();
	
	@SqlUpdate("update mission set etat = :etat, client = :client, description = :description, mission = :mission where mission = :mission")
    @GetGeneratedKeys
    int modifierMission(@BindBean() Mission mission);
	
}
