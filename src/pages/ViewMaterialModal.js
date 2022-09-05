import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Modal,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { object } from "yup";
import axios from "../api/axios";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const statusCodeArray = [401, 403, 404, 409, 422];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "-40%",
  transform: "translate(-50%, -50%)",
  width: { lg: 1000, md: 800, sm: 600 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
};

const showHistory = (materialData)=>{
  return materialData.materialHistory.slice(-3).map((key) => {
    return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary={"Material "+key.action +":"+ key.value + materialData.material.unit} secondary={key.dateTimeAdded} />
      </ListItem>
      <Divider/>
    </List>
    )
  })
    
}

function ViewMaterialModal({ isOpen, handleClose, materialId }) {
  const [materialData, setMaterialData] = useState();
  const dispatch = useDispatch();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`/material/${materialId}`)
      .then((response) => {
        if (response.status == 200) {
          setMaterialData(response.data);
          console.log("Material", materialData)
          let col = [];
          // col.push({
          //   field: "id",
          //   headerName: "SerialNumber",
          //   flex: 1,
          //   disableColumnFilter: false,
          //   disableColumnMenu: true,
          // });
          Object.keys(response.data.materialHistory[0]).forEach((key) => {
            col.push({
              field: key,
              headerName: key,
              flex: 1,
              disableColumnFilter: false,
              disableColumnMenu: true,
            });
          });

          setColumns(() => col);
          setRows(
            response.data.materialHistory.map((item, index) => {
              return {
                id: index + 1,
                ...item,
              };
            })
          );
        }
      })
      .catch((error) => {
        try {
          const isArray = Array.isArray(error.response.data.detail);
          let errorMessage;
          if (isArray) {
            errorMessage = error.response.data.detail[0].msg;
          } else {
            errorMessage = error.response.data.detail;
          }
          if (statusCodeArray.includes(error.response.status)) {
            dispatch(showErrorSnackbar(errorMessage));
          } else {
            dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
          }
        } catch (error) {
          dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
        }
      });
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {materialData && (
          <Box>
            <Card>
              <CardHeader sx={{ color: "#2B4865" }} title="Material Details" />
              <CardContent>
                <Grid container  direction="row">
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Material Name:</LabelBox>
                    {materialData.material.materialName}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Specifications:</LabelBox>
                    {materialData.material.description}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                 
                >
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Stock:</LabelBox>
                    {materialData.material.inStock} {materialData.material.unit}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Cost:</LabelBox>
                    {materialData.material.costs || 0 }
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                 
                >
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Added on:</LabelBox>

                    {materialData.material.dateTimeAdded}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <LabelBox> Added By:</LabelBox>
                    {materialData.material.addedBy}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardHeader sx={{ color: "#2B4865" }} title="Last 3 Changes History" />
              <CardContent>
                {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  autoHeight={true}
                  GridAlignment="right"
                /> */}
                {showHistory(materialData)}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default ViewMaterialModal;

const LabelBox = styled(Box)`
  color: #1976d2;
  size: "10";
  display: inline-block;
`;
