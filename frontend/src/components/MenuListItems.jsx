import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from "react-router-dom";

const adminIcons = [
  {
    icon: <HomeIcon />,
    title: "Ana Sayfa",
    url: "/nobelhizliokuma/admin-dashboard/",
  },
  {
    title: "Öğrenciler",
    icon: <TimelineIcon />,
    url: "/nobelhizliokuma/admin-dashboard/ogrenciler",
  },
  {
    title: "Ödevler",
    icon: <ArticleIcon />,
    url: "/nobelhizliokuma/admin-dashboard/odevler",
  },
  {
    title: "Egzersizler",
    icon: <FitnessCenterIcon />,
    url: "/nobelhizliokuma/admin-dashboard/egzersizler",
  },
  {
    title: "Kurslar",
    icon: <SchoolIcon />,
    url: "/nobelhizliokuma/admin-dashboard/kurslar",
  },
  {
    title: "Profil",
    icon: <AccountBoxIcon />,
    url: "/nobelhizliokuma/admin-dashboard/profil",
  },
];

const userIcons = [
  {
    icon: <HomeIcon />,
    title: "Ana Sayfa",
    url: "/nobelhizliokuma/",
  },
  {
    title: "İlerlemeler",
    icon: <TimelineIcon />,
    url: "/nobelhizliokuma/ilerlemeler",
  },
  {
    title: "Ödevler",
    icon: <ArticleIcon />,
    url: "/nobelhizliokuma/odevler",
  },
  {
    title: "Egzersizler",
    icon: <FitnessCenterIcon />,
    url: "/nobelhizliokuma/egzersizler",
  },
  {
    title: "Kurslar",
    icon: <SchoolIcon />,
    url: "/nobelhizliokuma/kurslar",
  },
  {
    title: "Profil",
    icon: <AccountBoxIcon />,
    url: "/nobelhizliokuma/profil",
  },
];

const MenuListItems = ({ role }) => {
  const navigate = useNavigate();
  const icons = role === "admin" ? adminIcons : userIcons;

  return (
    <List sx={{ height: '100%', bgcolor: '#3f0e40', color: 'white' }}>
      {icons.map((item, index) => (
        <ListItem
          sx={{
            color: "white",
            "&:hover": { color: "red" },
            "&:hover .MuiSvgIcon-root": { color: "red" },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
          key={index}
          disablePadding
          onClick={() => navigate(item.url)}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
