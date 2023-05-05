import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Ajouterrole from "Ajouterrole";
import LogoutIcon from '@mui/icons-material/Logout';
import Icon from "@mui/material/Icon";
import UpdateUser from "UpdateUser";
import Ajouteruser from "Ajouteruser";
import ListePatient from "ListePatient";
import Add from "Add";
import Details from "Details";
import UpdatePatient from "UpdatePatient";
import Ajouterpatient from "Ajouterpatient";
import AfficherRdv from "rdv";
import Ajouterrdv from "Ajouterrdv";
import Ajouterrdvpatient from "Ajouterrdvpatient";
import Login from "layouts/authentication/sign-in";
import Events from "event";
import UpdateEvent from "updateevent";
import Consultation from "consultation";
import Ajouterconsultation from "Ajouterconsultation";
import UpdateConsultation from "Updateconsultation";
import Examen from "examen";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AjouterQuestion from "AjouterQuestion";
import Déconnexion from "Déconnexion";
import BilanInitiale from "BilanInitiale";
import BilanSuivie from "BilanSuivie";
import Examens from "Examens";
import ExamenPatient from "examenpatient";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Gestion Compte",
    key: "ajouteruser",
    icon: <Icon fontSize="small">people-group</Icon>,
    route: "/Ajouteruser",
    component: <Ajouteruser />,
  },
  {
    type: "collapse",
    name: "Gestion rdv",
    key: "ListeRdv",
    icon: <CalendarTodayIcon fontSize="small"></CalendarTodayIcon>,
    route: "/AfficherRdv",
    component: < AfficherRdv />,
  },
  {
    type: "collapse",
    name: "Gestion patient",
    key: "ListePatient",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/ListePatient",
    component: <ListePatient />,
  },
  {
    key: "updateuser",
    route: "/Ajouteruser/update/:id",
    component: <UpdateUser />,
  },
  {
    key: "AjouterQuestion",
    route: "/AjouterQuestion",
    component: <AjouterQuestion />,
  },
  {
    key: "updatepatient",
    route: "/ListePatient/update/:id",
    component: <UpdatePatient />,
  },
  {
    key: "Add",
    route: "/add",
    component: <Add />,
  },

  {
    key: "Ajouterpatient",
    route: "/Ajouterpatient",
    component: <Ajouterpatient />,
  },
  {
    key: "details",
    route: "/details/:id",
    component: <Details />,
  },
  {
    key: "consultation",
    route: "/consultation/:id",
    component: <Consultation />,
  },
  {
    key: "Ajouterconsultation",
    route: "/Ajouterconsultation/:id",
    component: <Ajouterconsultation />,
  },
  {
    key: "Ajouterrole",
    route: "/Ajouterrole",
    component: <Ajouterrole />,
  },
  {
    key: "Ajouterrdv",
    route: "/Ajouterrdv/:id",
    component: <Ajouterrdv />,
  },
  {
    key: "updateevent",
    route: "/event/update/:id",
    component: <UpdateEvent />,
  },
  {
    key: "updateconsultation",
    route: "/consultation/update/:id",
    component: <UpdateConsultation />,
  },
  {
    key: "Ajouterrdvpatient",
    route: "/Ajouterrdvpatient/:id",
    component: <Ajouterrdvpatient />,
  },
  {
    key: "event",
    route: "/event/:id",
    component: <Events />,
  },
  {
    key: "AjouterRole",
    route: "/addrole",
    component: <Ajouterrole />,
  },
  {
    key: "login",
    route: "/authentication/sign-in",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Gestion des examens",
    key: "examens",
    icon: <LibraryBooksIcon fontSize="small"></LibraryBooksIcon>,
    route: "/ListeExamens",
    component: <Examen />,
  },
  {
    type: "hidden",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "hidden",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    key: "BilanInitiale",
    route: "/Bilaninitiale/:idpatient",
    component: <BilanInitiale />,
  },
  {
    key: "BilanSuivie",
    route: "/BilanSuivie/:idpatient",
    component: <BilanSuivie />,
  },
  {
    key: "Examens",
    route: "/Examens/:idpatient/:id",
    component: <Examens />,
  },
  {
    key: "ExamenPatient",
    route: "/ExamenPatient/:id",
    component: <ExamenPatient />,
  },

  {
    type: "collapse",
    name: "Déconnexion",
    key: "Déconnexion",
    icon: <LogoutIcon fontSize="small"></LogoutIcon>,
    route: "/authentication/sign-out",
    component: <Déconnexion />,
  }

];
export default routes;
