import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton"; // Correct import for IconButton
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

const Navbar = ({ handleDrawerOpen, open }) => {
  return (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          LMS Koya university
        </Typography>
      </Toolbar>
    </div>
  );
};

Navbar.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default Navbar;
