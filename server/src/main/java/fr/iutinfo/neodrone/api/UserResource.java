package fr.iutinfo.neodrone.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.neodrone.common.dto.UserDto;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import static fr.iutinfo.neodrone.api.BDDFactory.getDbi;
import static fr.iutinfo.neodrone.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    final static Logger logger = LoggerFactory.getLogger(UserResource.class);
    private static UserDao dao = getDbi().open(UserDao.class);

    public UserResource() throws SQLException {
        if (!tableExist("users")) {
            logger.debug("Crate table users");
            dao.createUserTable();
            dao.insert(new User(0, "Margaret Thatcher", "la Dame de fer"));
        }
    }

    @POST
    public UserDto createUser(UserDto dto) {
        User user = new User();
        user.initFromDto(dto);
        user.resetPasswordHash();
        int id = dao.insert(user);
        dto.setId(id);
        return dto;
    }

    @GET
    @Path("/{name}")
    public UserDto getUser(@PathParam("name") String name) {
        User user = dao.findByName(name);
        if (user == null) {
            throw new WebApplicationException(404);
        }
        return user.convertToDto();
    }

    @GET
    public List<UserDto> getAllUsers(@QueryParam("q") String query) {
        List<User> users;
        if (query == null) {
            users = dao.all();
        } else {
            logger.debug("Search users with query: " + query);
            users = dao.search("%" + query + "%");
        }
        return users.stream().map(User::convertToDto).collect(Collectors.toList());
    }

    @DELETE
    @Path("/{id}")
    public void deleteUser(@PathParam("id") int id) {
        dao.delete(id);
    }

}
