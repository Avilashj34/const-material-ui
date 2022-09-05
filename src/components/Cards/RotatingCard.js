import { Box } from "@mui/material";
import PropTypes from "prop-types";


function RotatingCard({ children,rotate }) {
  return (
    <Box sx={{ perspective: "50rem" }} >
      <Box sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        position: "relative",
        transform: rotate ? "rotateY(180deg)" : "rotateY(0)",
        transformStyle: "preserve-3d",
        transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
      }} >
        {children}
      </Box>
    </Box>
  );
}

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RotatingCard;