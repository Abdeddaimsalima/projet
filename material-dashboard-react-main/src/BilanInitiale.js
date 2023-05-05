
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


const BilanInitiale = () => {
  const [examens, setExamens] = useState([]);
  const navigate = useNavigate();
  const { idpatient } = useParams();
  useEffect(() => {
    const getExamens = () => {
      Axios.get(`http://localhost:8000/Listedesexamens/${idpatient}`).then((res) => {
        console.log('listexamens', res);
        setExamens(res.data);
      });
    };
    getExamens();
  }, [idpatient]);


  const handleExamensClick = (id) => {
    navigate(`/Examens/${idpatient}/${id}`);
  };
  return (
    <DashboardLayout style={{ height: "100vh", overflowY: "scroll" }}>
      <DashboardNavbar />
      <TableContainer style={{ marginTop: "20px" }}>
        <Table>
          <TableBody>
            {examens.map((examen) => (
              <TableRow key={examen.id}>
                <TableCell>{examen.libelle}</TableCell>
                <TableCell> <MDButton gradient="variant" color="primary" type="submit" onClick={() => handleExamensClick(examen.id)} >
                  passer examen
                </MDButton></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}

export default BilanInitiale;