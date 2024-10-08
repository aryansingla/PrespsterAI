import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  Box,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextFieldValidationPassword from "@/components/common/FormComponents/FormikTextFieldValidationPassword";
import FormikTextFieldPassword from "@/components/common/FormComponents/FormikTextFieldPassword";
import passCheck from "@/helper/passCheck";
import PasswordHintText from "./PasswordHintText";
import axios from "axios";

export default function AuthSetPassword() {
    const isScreenSmall = useMediaQuery('(max-width:1080px)');

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [confirmNewPasswordError, setConfirmNewPasswordError] =useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [currentError, setCurrentError] = useState([]);
  useEffect(() => {
    const res = passCheck(newPassword);
    setCurrentError(res.errorMsgs);
  }, [newPassword]);

  const initialValues = {
    newPassword,
    confirmNewPassword,
  };

  const handleSubmit = (val, setLoading) => {
    setLoading(false);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmNewPasswordChange = (
    event
  ) => {
    setConfirmNewPassword(event.target.value);
    if (confirmNewPassword === "") {
      setConfirmNewPasswordError(false);
    }
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleSave = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/new-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: localStorage.getItem("email"),
        password: newPassword,
        otp: localStorage.getItem("otp"),
      },
    };
    axios(requestOptions)
      .then((data) => {
        setLoading(false);
        // MessageHandler(data.data.message, "single", "success");
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        setShowPopUp(true);
        // window.location.replace("/auth/login");
      })
      .catch((data) => {
        setLoading(false);
      });
  };
  return (
    <>
     <Box sx={{ textAlign: 'center' }}> {/* Changed to 'center' */}
                <Typography variant="h5" sx={{ fontWeight: '600' }}>PREPSTER AI</Typography>
                <Typography variant={isScreenSmall ? "subtitle2" : "subtitle1"} sx={{ fontWeight: '200', textAlign: 'left', fontSize: isScreenSmall ? '15px' : 'inherit' }}>Please Enter Your New Password</Typography>
            </Box>
    <Box>
      <CardContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={() => handleSave()}
          validationSchema={Yup.object({
            newPassword: Yup.string().test("pass-check", "", (value) => {
              const res = passCheck(value);
              return !res.error;
            }),
            confirmNewPassword: Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              "Password must match"
            ),
          })}
        >
          {({ handleSubmit, errors, values }) => {
            const isFormValid =
              Object.keys(errors).length === 0 &&
              values.newPassword === values.confirmNewPassword &&
              values.newPassword.length > 7 &&
              values.confirmNewPassword.length > 7;
            return (
              <Form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid size={{xs:12}} sx={{ marginTop: "20px" }}>
                    {/* <Typography variant="h6">New Password</Typography> */}

                    <FormikTextFieldValidationPassword
                      fullWidth
                      name="newPassword"
                      value={newPassword}
                      mandatory={true}
                      label="Enter Password"
                      autoComplete="off"
                      handleChange={handleNewPasswordChange}
                    />
                  </Grid>
                  <Grid size={{xs:12}} sx={{ marginTop: "20px" }}>
                    <PasswordHintText currentError={currentError} />
                  </Grid>
                  <Grid size={{xs:12}} sx={{ marginTop: "20px" }}>
                    <FormikTextFieldPassword
                      fullWidth
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      mandatory={true}
                      label="Confirm Password"
                      autoComplete="off"
                      handleChange={handleConfirmNewPasswordChange}
                    />
                  </Grid>

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onSubmit={handleSave}
                    type="submit"
                    disabled={!isFormValid}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "#fff" }} size={20} />
                    ) : (
                      "Set Password"
                    )}
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
      <Dialog open={showPopUp} maxWidth="xs" fullWidth>
        <Typography>Password Changed</Typography>
        <DialogContent
          sx={{
            textAlign: "center",
            pt: "20px !important",
          }}
        >
          <Typography variant="subtitle1">
            <Link href="/auth/login" passHref>
              <p style={{ textDecoration: "none", color: "#1976D2" }}>
                Continue to Login
                <span style={{ marginLeft: "4px" }}> &gt;&gt;&gt;</span>
              </p>
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
    </>
  );
}