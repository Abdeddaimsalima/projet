import { TableBody, TableCell, TableHead, TableRow ,Table} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { useNavigate,Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { ToastContainer, toast } from 'react-toastify';
const notifySuccess = () => {
  toast.success("examen supprimé!");
};



const Examen = () => {

  const [examens, setExamens] = useState([]);
  const [libelle, setLibelle] = useState('');
  const [type, setType] = useState('');
  const typesExamen = ['bilanSuivie', 'BilanInitiale'];
  
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    const getExamen = () => {
      Axios.get("http://localhost:8000/ListeExamens").then((res) => {
        console.log('mes examens', res);
        setExamens(res.data);
      });
    };
  
    getExamen();
  
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("confirmer suppression ")) {
      Axios.delete(`http://localhost:8000/ListeExamens/${id}`, {
      })
        .then((res) => {
          setExamens(examens.filter((examen) => examen.id !== id));
          notifySuccess();
        })
        .catch((err) => {
          console.log(err); 

        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:8000/ListeExamens', {
      libelle: libelle,
      type: type,
    })
      .then((res) => {
        console.log(res);
        setExamens([...examens, { libelle: libelle, type: type }]);
        setLibelle('');
        setType('');
      })
      .catch((err) => console.log(err));
  };
  const [searchQuery, setSearchQuery] = useState('');
  const filteredExamens = examens.filter((examen) =>
    examen.libelle.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
        <DashboardLayout>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '20px', marginTop: '10px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '100%' }}>
          
      <MDTypography  fontWeight="medium" >
            Liste des examens
          </MDTypography>
      <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by libelle"
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



<MDButton variant="gradient" color="info" style={{ marginLeft: '10px' }}  component={Link}
            to="/AjouterQuestion">
  ajouter question
</MDButton>
</div>
         <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '20px', marginTop: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '100%' }}>
            <input type="text" placeholder="entrer libelle examen" value={libelle} onChange={(e) => setLibelle(e.target.value)} style={{ background: 'white', color: 'black', border: '2px solid blue', borderRadius: '5px', padding: '10px', flex: 2, marginRight: '20px' }} />
            <h4 style={{ marginRight: '5px' }}>type examen :</h4>

{typesExamen.map((typeExamen) => (
  <div key={typeExamen} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <input type="radio" id={typeExamen} name="type" value={typeExamen} checked={type === typeExamen} onChange={handleTypeChange} />
    <label htmlFor={typeExamen}>{typeExamen}</label>
  </div>
))}

<MDButton variant="gradient" color="primary" style={{ marginLeft: '10px' }} onClick={handleSubmit}>
  ajouter examen
</MDButton>

</div>
</form>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <TableContainer style={{ marginTop: "20px" }}>
    <Table className="table">
      <TableBody>
      <TableRow>
  <TableCell style={{fontWeight: 'bold'}}> Libelle Examen </TableCell>
  <TableCell style={{fontWeight: 'bold'}}> type </TableCell>
  <TableCell style={{fontWeight: 'bold'}}> Action </TableCell>
</TableRow>
        {filteredExamens.map((examen) => (
          <TableRow key={examen.id} className={examen.id % 2 === 0 ? 'grey' : 'white'}>
            <TableCell>{examen.libelle}</TableCell>
            <TableCell>{examen.type}</TableCell>
            <TableCell>
              <MDButton gradient="variant" color="error" type="submit" style={{ fontSize: '1rem' }} onClick={() => handleDelete(examen.id)}>
                supprimer
              </MDButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
    </DashboardLayout> );}
export default Examen;