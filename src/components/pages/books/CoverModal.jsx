/* eslint-disable react/prop-types */
import { Modal, Typography, Box, IconButton } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useCallback, useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// eslint-disable-next-line react/prop-types
export const CoverModal = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCoverModel = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "10px",
            p: 5,
            width: 500,
            height: 550,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50% , -50%)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data?.row.title}
            </Typography>
            <IconButton
              onClick={handleCoverModel}
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
            >
              <ClearRoundedIcon />
            </IconButton>
          </Box>

          <Box sx={{ width: "100%", height: 450, mt: 3 }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              src={`http://127.0.0.1:8000${data?.row.cover_image}`}
              alt="Book Cover"
            />
          </Box>
        </Box>
      </Modal>

      <IconButton
        onClick={handleCoverModel}
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
      >
        <VisibilityRoundedIcon />
      </IconButton>
    </div>
  );
};
