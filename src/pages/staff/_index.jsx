import { fetchData } from "../../api/general";
import { useLoaderData } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Card, Box, Button, Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useNavigate, createSearchParams } from "react-router-dom";

export const staffLoader = async () => {
  let users = {};

  try {
    users = fetchData("http://127.0.0.1:8000/api/users-auth/");
  } catch (err) {
    console.log(err);
  }

  return users;
};

const Staff = () => {
  const users = useLoaderData();
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  const handleTrack = (userId, type, userName) => {
    navigate({
      pathname: "/books",
      search: createSearchParams({
        [type]: userId,
        username: userName,
      }).toString(),
    });
  };

  return (
    <Box sx={{ p: 10 }}>
      <Box
        sx={{
          display: "flex",
          width: "95%",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {users.map((user) => (
          <Card
            sx={{
              bgcolor: `#fff`,
              minWidth: "450px",
              borderRadius: "37px",
              height: "200px",
              borderStyle: `${user.id == currentUserId ? "dashed" : ""}`,
              borderColor: `${user.id == currentUserId ? "#558B2F" : ""}`,
              p: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              position: "relative",
            }}
            key={user.id}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <PersonRoundedIcon
                color={`${user.id == currentUserId ? "primary" : "#252525"}`}
                sx={{ fontSize: "80px" }}
              />

              <Chip
                sx={{ fontSize: "25px" }}
                label={`${user.first_name} ${user.last_name}`}
              />
              <Chip label={`${user.email}`} icon={<EmailRoundedIcon />} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Chip
                label={`Activities by ${
                  user.id == currentUserId ? "you" : user.username
                }`}
                icon={<DoneIcon />}
              />
              <Button
                onClick={() => handleTrack(user.id, "added_by", user.username)}
                sx={{ minWidth: "160px" }}
                variant="outlined"
              >
                Books added
              </Button>
              <Button
                onClick={() =>
                  handleTrack(user.id, "updated_by", user.username)
                }
                sx={{ minWidth: "160px" }}
                variant="outlined"
              >
                Books Updated
              </Button>
              <Button sx={{ minWidth: "160px" }} variant="outlined">
                Books booked
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Staff;
