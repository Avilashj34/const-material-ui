import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "../api/axios";
import { useDispatch } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "-40%",
  transform: "translate(-50%, -50%)",
  width: { lg: 1000, md: 800, sm: 600 },
  bgcolor: "background.paper",
  borderRadius: 3,
};
const statusCodeArray = [401, 403, 404, 409, 422];

function AddItem({ isOpen, handleClose, siteIdtoadd }) {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [unitList, setUnitList] = useState([]);
  const addItemInitialValues = {
    name: "",
    unitId: "",
    description: "",
    inStock: "",
    cost: "",
    siteId: siteIdtoadd,
  };

  const validationForAddItem = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Material Name is required";
    }
    if (!values.unitId || values.unitId === 0 || values.unitId === "") {
      errors.unitId = "Select Units for stock";
    }

    if (!values.inStock || values.inStock < 1 || values.inStock === "") {
      errors.inStock = "Please enter the stock quantity";
    }
    if (!values.cost || values.cost == 0) {
      errors.cost = "Please enter the cost";
    }

    return errors;
  };

  const addItemOnSubmit = (values) => {
    axios
      .post("/material", values)
      .then((response) => {
        if (response.status === 200) {
          dispatch(showSuccessSnackbar("Material Added Successfully"));
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
      .get("/unit")
      .then((response) => {
        setUnitList(response.data);
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
      <Formik
        initialValues={addItemInitialValues}
        validate={validationForAddItem}
        onSubmit={addItemOnSubmit}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Box sx={style}>
              <Card sx={{ alignContent: "center" }}>
                <CardHeader
                  sx={{ color: "#2B4865" }}
                  title="Add New Material"
                />
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    columnSpacing={5}
                    rowSpacing={2}
                  >
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          placeholder="Enter Name of Material"
                          required
                          name="name"
                          type="text"
                          fullWidth
                          label="Name"
                          variant="standard"
                          {...props.getFieldProps("name")}
                          error={
                            props.touched.name && Boolean(props.errors.name)
                          }
                          helperText={props.touched.name && props.errors.name}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel variant="standard" id="unitId">
                          Unit of Measurement
                        </InputLabel>

                        <Select
                          htmlFor="unitId"
                          value=""
                          name="unitId"
                          labelId="units"
                          variant="standard"
                          MenuProps={MenuProps}
                          {...props.getFieldProps("unitId")}
                          error={
                            props.touched.unitId && Boolean(props.errors.unitId)
                          }
                        >
                          {unitList &&
                            unitList.map((item, index) => (
                              <MenuItem key={index} value={item?.id}>
                                {item?.name}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                          variant="standard"
                          error={
                            props.touched.unitId && Boolean(props.errors.unitId)
                          }
                        >
                          {props.touched.unitId && props.errors.unitId}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    columnSpacing={5}
                    rowSpacing={2}
                    pt={5}
                  >
                    <Grid item lg={12} md={12} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          variant="standard"
                          name="description"
                          fullWidth
                          multiline
                          label="Specifications (Optional)"
                          placeholder="Mention brand,color,size,etc."
                          {...props.getFieldProps("description")}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    columnSpacing={5}
                    rowSpacing={2}
                    pt={5}
                  >
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          placeholder="Enter here"
                          type="number"
                          fullWidth
                          required
                          name="inStock"
                          label="Add to stock"
                          variant="standard"
                          {...props.getFieldProps("inStock")}
                          error={
                            props.touched.inStock &&
                            Boolean(props.errors.inStock)
                          }
                          helperText={
                            props.touched.inStock && props.errors.inStock
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormControl fullWidth required>
                        <TextField
                          variant="standard"
                          fullWidth
                          required
                          type="number"
                          name="cost"
                          label="Stock cost"
                          placeholder="Enter here"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CurrencyRupeeIcon />
                              </InputAdornment>
                            ),
                          }}
                          {...props.getFieldProps("cost")}
                          error={
                            props.touched.cost && Boolean(props.errors.cost)
                          }
                          helperText={props.touched.cost && props.errors.cost}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "flex-end",
                    flexDirection: {
                      xs: "column,flex-end",
                      sm: "row,flex-end",
                    },
                  }}
                >
                  <Tooltip title="Add another Material ">
                    <Button
                      sx={{
                        flexDirection: { xs: "fullwidth", sm: "fullwidth" },
                      }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Add
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddItem;
