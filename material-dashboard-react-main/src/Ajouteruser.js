import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import MDButton from "components/MDButton";
import { useNavigate,Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";




import { ToastContainer, toast } from 'react-toastify';
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";


import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MDBox from "components/MDBox";

const notifySuccess = () => {
  toast.success("L'utilisateur a été supprimé avec succès !");
};

const notifyError = () => {
  toast.error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
};



const Ajouteruser = function() {
  const [users, setUsers] = useState([]);
  const [lastId, setLastId] = useState(0);




  useEffect(() => {

    const getUser = () => {
      Axios.get("http://localhost:8000/Ajouteruser",
        {


        }).then((res) => {
          console.log('list', res);
          setUsers(res.data);


          if (res.data.length>0){

            setLastId(res.data[Response.data.length -1].id)
          }
        })

    };

    getUser();

  }, []);

    

      const { id } = useParams();
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [idrole, setIdrole] = useState('');
      const navigate = useNavigate();
      const [updatedUser, setUpdatedUser] = useState(false);



      
     

      const handleUpdateClick = (id) => {
        navigate(`/Ajouteruser/update/${id}`);
      };
     



      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          Axios.delete(`http://localhost:8000/Ajouteruser/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              setUsers(users.filter((user) => user.id !== id));
              notifySuccess();
            })
            .catch((err) => {
              console.log(err);
              notifyError();
            });
        }
      };


  const handleAdd = () => {
    const newUser = {
      id: lastId + 1,
      name,
      email,
      password,
      idrole,
    };
    Axios.post("http://localhost:8000/Ajouteruser", newUser)
      .then((res) => {
        setUsers([...users, newUser]);
        setName("");
        setEmail("");
        setPassword("");
        setIdrole("");
        setLastId(lastId + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout style={{ height: '100vh', overflowY: 'scroll' }}>
      <ToastContainer />
      <div className="UserList" style={{ height: '700px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          padding: '20px',
          marginTop: '10px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <MDTypography variant="h3" fontWeight="medium" style={{ marginRight: '10px' }}>
            Liste
          </MDTypography>
          <MDTypography variant="h3" fontWeight="medium">
            d'utilisateur
          </MDTypography>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name"
            style={{
              background: "white",
              color: "black",
              border: "2px solid blue",
              borderRadius: "5px",
              padding: "10px",
              flex: 2,
              marginRight: '10px',
              marginLeft: '600px',
            }}
          />
          <MDButton
            variant="gradient"
            color="success"
            component={Link}
            to="/add"
            onClick={handleAdd}
          >
            Add user
          </MDButton>
        </div>
        <div className="Table" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  marginTop: '40px' }}>
          <div style={{ maxWidth: '1200px' }}>
            <TableContainer style={{ width: '100%', margin: 'auto' }}>
              <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
  <TableRow>
    <TableCell align="left"   style={{  paddingLeft: '1px' }}>Id</TableCell>
    <TableCell align="center" style={{ paddingLeft: '210px'}}>Name</TableCell>
    <TableCell align="center" style={{  paddingLeft: '180px'}}>Email</TableCell>
    <TableCell align="center" style={{ paddingLeft: '180px'}}>Role</TableCell>
    <TableCell align="center" style={{ paddingLeft: '260px'}}>Action</TableCell>
  </TableRow>
</TableHead>
    <TableBody>
      {filteredUsers.map((user) => (
        <TableRow key={user.id}>
          <TableCell align="left" style={{ width: '25%' }}>{user.id}</TableCell>
          <TableCell align="left" style={{ width: '25%' }}>{user.name}</TableCell>
          <TableCell align="left" style={{ width: '25%' }}>{user.email}</TableCell>
          <TableCell align="left" style={{ width: '25%' }}>{user.role}</TableCell>
         
          <TableCell>
            <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <MDBox mr={1}>  
                <MDButton variant="text" color="success" onClick={() => handleUpdateClick(user.id)}>
                  <Icon>edit</Icon>&nbsp;edit
                </MDButton>
              </MDBox>
              <MDButton variant="text" color="error" onClick={() => handleDelete(user.id)}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>






   </div>
 </div>
        
      </div>

    </DashboardLayout>
  );
}

export default Ajouteruser;