import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewMaterialModal from "./ViewMaterialModal";
import UpdateStock from "./UpdateStock";
import AddItem from "./AddItem";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const statusCodeArray = [401, 403, 404, 409, 422];

const listofMaterialsValidation = (values) => {
  let errors = {};
  if (!values.siteName || values.siteName == 0) {
    errors.siteName = "Please Select Site";
  }
  return errors;
};

function MaterialList() {
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleupdateOpen = () => setUpdateOpen(true);
  const handleupdateClose = () => setUpdateOpen(false);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddeOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [viewOpen, setViewOpen] = useState(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);
  const [updateMaterialId, setUpdateMaterialId] = useState("");

  const [siteList, setSiteList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [siteIDtosend, setsiteIDtosend] = useState(0);

  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const siteName = "";

  const getListofMaterialsOnSubmit = (values) => {
    axios
      .get(`/material/${values.siteName}/site`)
      .then((response) => {
        if (response.status == 200) {
          setsiteIDtosend(values.siteName);
          let col = [];
          // col.push({
          //   field: "Sr. No.",
          //   headerName: "Sr. No.",
          //   flex: 1,
          //   disableColumnFilter: false,
          //   disableColumnMenu: true,
          // });
          Object.keys(response?.data[0]).forEach((key) => {
            if (key != "id") {
              col.push({
                field: key,
                headerName: "Material Name",
                flex: 1,
                disableColumnFilter: false,
                disableColumnMenu: true,
              });
            }
          });
          col.push({
            field: "Action",
            headerName: "Action",
            renderCell: (cellValues) => {
              return (
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {cellValues.value}
                </Box>
              );
            },
            flex: 1,
            disableColumnFilter: false,
            disableColumnMenu: true,
          });

          setColumns(() => col);
          setRows(
            response?.data?.map((item, index) => {
              return {
                "Sr. No.": index + 1,
                ...item,
                Action: (
                  <>
                    <Button
                      onClick={() => {
                        setUpdateMaterialId(() => item.id);
                        handleupdateOpen();
                      }}
                    >
                      <ModeEditSharpIcon color="primary" />
                    </Button>
                    <Button
                      onClick={() => {
                        setUpdateMaterialId(() => item.id);
                        handleViewOpen();
                      }}
                    >
                      <VisibilityIcon color="info" />
                    </Button>
                  </>
                ),
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
  };

  useEffect(() => {
    axios
      .get("/site")
      .then((response) => {
        setSiteList(response.data);
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
    <>
      <Formik
        initialValues={{ siteName }}
        onSubmit={getListofMaterialsOnSubmit}
        validate={listofMaterialsValidation}
      >
        {(props) => (
          <>
            <Form onSubmit={props.handleSubmit}>
              <Box pt={3} pl={3} pr={3} pb={3}>
                <Card>
                  <CardHeader title="Sites" />
                  <CardContent>
                    <Grid container direction="row">
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel
                            variant="standard"
                            id="siteName"
                            error={
                              props.touched.siteName &&
                              Boolean(props.errors.siteName)
                            }
                          >
                            Select Site
                          </InputLabel>
                          <Select
                            htmlFor="siteName"
                            value=""
                            name="siteName"
                            labelId="siteName"
                            variant="standard"
                            MenuProps={MenuProps}
                            {...props.getFieldProps("siteName")}
                          >
                            {siteList &&
                              siteList.map((item) => (
                                <MenuItem key={item?.id} value={item?.id}>
                                  {item?.siteName}
                                </MenuItem>
                              ))}
                          </Select>
                          <FormHelperText
                            variant="standard"
                            error={
                              props.touched.siteName &&
                              Boolean(props.errors.siteName)
                            }
                          >
                            {props.touched.siteName && props.errors.siteName}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12} pl={10}>
                        <Tooltip title="Click to see the Materials for selected site">
                          <Button
                            sx={{
                              flexDirection: {
                                xs: "fullwidth",
                                sm: "fullwidth",
                              },
                            }}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            show
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box pt={3} pl={3} pr={3} pb={3}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Tooltip title="Add New Material">
                    <IconButton
                      onClick={() => {
                        handleAddeOpen();
                      }}
                    >
                      <AddBoxRoundedIcon
                        color="primary"
                        sx={{ fontSize: "3.5rem !important" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Card>
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
            </Form>
          </>
        )}
      </Formik>
      {/* <Modal
        open={updateOpen}
        onClose={handleupdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateStock updateMaterialId={updateMaterialId} />
      </Modal>
      <Modal
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddItem siteIdtoadd={siteIDtosend} />
      </Modal> */}
      {updateMaterialId && (
        <ViewMaterialModal
          isOpen={viewOpen}
          handleClose={handleViewClose}
          materialId={updateMaterialId}
        />
      )}

      {siteIDtosend && (
        <AddItem
          isOpen={addOpen}
          handleClose={handleAddClose}
          siteIdtoadd={siteIDtosend}
        />
      )}

      {updateMaterialId && (
        <UpdateStock
          isOpen={updateOpen}
          handleClose={handleupdateClose}
          materialId={updateMaterialId}
        />
      )}

      {/* <Modal
        open={viewOpen}
        onClose={handleViewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewMaterialModal updateMaterialId={updateMaterialId} />
      </Modal> */}
    </>
  );
}

export default MaterialList;
