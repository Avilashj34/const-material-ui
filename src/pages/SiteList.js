import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  TextField,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { ModeEdit as ModeEditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import { Link } from 'react-router-dom'
const statusCodeArray = [401, 403, 404, 409, 422]


function SiteList() {

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('site/')
      .then((response) => {
        console.log(response)
        let col = [];
        col.push({
          field: 'Sr. No.', headerName: 'Sr. No.', flex: 1, disableColumnFilter: false, disableColumnMenu: true

        });
        Object.keys(response?.data[0]).forEach((key) => {
          if(key!="id"){

            col.push({
              field: key, headerName: key, flex: 1, disableColumnFilter: false, disableColumnMenu: true
            });
          }

        });
        
      
        setColumns(() => col)
        setRows(response?.data?.map((item, index) => {
          return {
            "Sr. No.": index + 1, ...item

          }
        }))
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

    <Box pt={3} pl={3} pr={3} pb={3}>
      <Card>
        <CardHeader title="List of Sites" />
        <CardContent sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight={true}
            GridAlignment="right"
          />
        </CardContent>
      </Card>
    </Box>
  );
}
export default SiteList;

const AddIconStyling = styled(AddIcon)`
    background-color: ${(props) => props.theme.myColors.orange};
    border-radius: 10%;
    color: ${(props) => props.theme.myColors.grey};
    width: 3rem;
    height: 2rem;
  `;