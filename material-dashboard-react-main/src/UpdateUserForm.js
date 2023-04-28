import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateUser from "UpdateUser";

const UpdateUserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8000/Ajouteruser/update/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <>
      {user && (
        <UpdateUser
          name={user.name}
          email={user.email}
          password={user.password}
          id={id}
        />
      )}
    </>
  );
};

export default UpdateUserForm;
