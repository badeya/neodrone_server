package fr.iutinfo.neodrone.api;
import java.util.List;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;
public interface MissionDAO {
	@SqlUpdate("create table mission (id integer primary key autoincrement,client varchar(100),etat varchar(100))")
	void createMissionTable();
	
	
	@SqlQuery("select * from mission where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Mission findById(@Bind("id") int id);
	
	@SqlQuery("select * from mission where client = :client")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Mission findByClient(@Bind("client") String client);
	  
	@SqlUpdate("insert into mission(etat) values (:etat)")
    @GetGeneratedKeys
    int insert(@BindBean() Mission user);  
	
	@SqlQuery("select * from mission order by id")
    @RegisterMapperFactory(BeanMapperFactory.class)
    List<Mission> all();
}
