import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  Modal,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Formik, Form } from "formik";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import { useDispatch } from "react-redux";

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

function UpdateStock({isOpen,handleClose,materialId }) {
  const [materialData, setMaterialData] = useState(null);
  const dispatch = useDispatch();
  const updateItemInitialValues = {
    value: "",
    action: "",
    id: materialId,
  };

  const UpdateonSubmit = (values) => {
    axios
      .put("/material", values)
      .then((response) => {
        if (response.status === 200) {
          if (values.action == "add") {
            setMaterialData((item) => {
              return {
                ...item,
                material: {
                  ...item.material,
                  inStock: item.material.inStock + values.value,
                },
              };
            });
          } else if (values.action == "used") {
            setMaterialData((item) => {
              return {
                ...item,
                material: {
                  ...item.material,
                  inStock: item.material.inStock - values.value,
                },
              };
            });
          }
          dispatch(showSuccessSnackbar("Material Updated Successfully"));
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

  const validateUpdateValues = (values) => {
    let errors = {};

    if (!values.value) {
      errors.value = "Please enter the quantity.";
    } else if (isNaN(values.value)) {
      errors.value = "Quantity should be a number";
    } else if (values.value < 1) {
      errors.value = "Quantity can not be negative";
    }
    return errors;
  };
  useEffect(() => {
    axios
      .get(`/material/${materialId}`)
      .then((response) => {
        if (response.status == 200) {
          setMaterialData(response.data);
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
      <Formik
        initialValues={updateItemInitialValues}
        validate={validateUpdateValues}
        onSubmit={UpdateonSubmit}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Box sx={style}>
              {materialData && (
                <Box>
                  <Card>
                    <CardHeader
                      sx={{ color: "#2B4865" }}
                      title="Material Details"
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                      
                      >
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
                          {materialData.material.inStock}{" "}
                          {materialData.material.unit}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <LabelBox> Cost:</LabelBox>
                          {materialData.material.cost}
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
                      <Grid
                        container
                        
                        direction="row"
                       
                      >
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="action"
                          values={props.values.action}
                          onChange={props.handleChange}
                        >
                          <FormControlLabelBox
                            value="add"
                            control={<Radio className="check" />}
                            label="Add in Stocks"
                          >
                            <TextField label="Add" />
                          </FormControlLabelBox>
                          <FormControlLabelBox
                            value="used"
                            control={<Radio />}
                            label="Remove from Stocks"
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid container item direction="row">
                        <Grid item lg={12} md={12} sm={12} xs={12} pt={2}>
                          {props.values.action && (
                            <TextField
                              name="value"
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <ShoppingCartIcon />
                                  </InputAdornment>
                                ),
                              }}
                              error={
                                props.touched.value &&
                                Boolean(props.errors.value)
                              }
                              helperText={
                                props.touched.value && props.errors.value
                              }
                              {...props.getFieldProps("value")}
                            />
                          )}
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        
                        direction="row"
                        
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!Boolean(props.values.action)}
                        >
                          Update
                        </Button>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default UpdateStock;

const LabelBox = styled(Box)`
  color: #1976d2;
  size: "10";
  display: inline-block;
`;
const FormControlLabelBox = styled(FormControlLabel)`
  color: #1976d2;
  size: "10";
  display: inline-block;
`;
