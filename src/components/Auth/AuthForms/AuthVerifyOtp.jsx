import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { HourglassEmpty } from "@mui/icons-material";
import OtpInput from "react-otp-input";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import FormikTextField from '../../common/FormComponents/FormikTextField'
import * as Yup from "yup";


const buttonStyles = {
  background: "none",
  color: "#5D87FF",
  fontWeight: "600",
  padding: "0px",
  "&:hover": {
    color: "#5D87FF",
    background: "none",
  },
};
const AuthVerifyOtp = () => {
  const isScreenSmall = useMediaQuery("(max-width:600px)");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const [hasError, setHasError] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setHasError(false);
    setOtp(e);
  };
  const startTimer = () => {
    setIsResendDisabled(true);
    setTimer(30);
  };
  useEffect(() => {
    // Start the initial timer when the component mounts
    startTimer();
  }, []);
  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setIsResendDisabled(false);
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleResendClick = () => {
    if (resendCount < 3) {
      handleResendOtp();
      setResendCount(resendCount + 1);
      startTimer(); // Set the timer for the 30-second wait time
    }
  };
  const formatTimer = (value) => {
    return String(value).padStart(2, "0"); // Ensures two digits with leading zeros
  };
  // console.log("otp", otp);
  const handleSave = () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/verify-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: localStorage.getItem("email"),
        otp: otp,
      },
    };
    axios(requestOptions)
      .then((data) => {
        setLoading(false);
        localStorage.setItem("otp", otp);
        window.location.replace("/auth/set-password");
      })
      .catch((data) => {
        setLoading(false);
      });
  };
  const handleResendOtp = () => {
    const requestOptions = {
      method: "POST",
      url : `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/forget-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: localStorage.getItem("email"),
      },
    };
    axios(requestOptions)
      .then((data) => {
        // localStorage.setItem('email',email);
        // window.location.replace('/auth/verify-otp')
      })
      .catch((data) => {
        setLoading(false);
      });
  };
  const initialValues = {
    otp,
  };
  return (
    <>
    <Box sx={{ textAlign: 'center' }}> {/* Changed to 'center' */}
                <Typography variant="h5" sx={{ fontWeight: '600' }}>PREPSTER AI</Typography>
     </Box>
    <Box display="flex" flexDirection="column">
      <Stack mb={3} alignItems="center">
        <Typography>
          Type your 6 digits security code
          </Typography>
      </Stack>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          otp: Yup.string().required("OTP Required"),
        })}
        onSubmit={() => handleSave()}
      >
        {({ handleSubmit, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div
                style={{
                  width: isScreenSmall ? "100%" : "80%",
                  margin: "0 auto",
                }}
              >
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={6}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} />}
                  inputType="tel"
                  inputStyle={{
                    width: "2.8rem",
                    height: "2.8rem",
                    border: "2px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "1.5rem",
                  }}
                  containerStyle={{
                    margin: "10px 0px 20px 0px",
                    justifyContent: "space-evenly",
                  }}
                />
              </div>

              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onSubmit={handleSave}
                type="submit"
                disabled={otp.length !== 6}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "#fff" }} size={20} />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
      {/* <Stack direction="row" spacing={1} mt={3} textAlign="left">
        <Typography
          color="textSecondary"
          variant="h6"
          fontWeight="600"
          sx={{ paddingTop: "2px" }}
        >
          OTP not received yet,
        </Typography>

        <Button
          sx={buttonStyles}
          disabled={isResendDisabled || resendCount === 3}
          onClick={handleResendClick}
          variant="text"
        >
          Resend OTP
        </Button>
      </Stack> */}
      <Stack direction="row" spacing={1} mt={3} textAlign="left">
        <Typography
          color="textSecondary"
          variant="h6"
          fontWeight="600"
          sx={{ paddingTop: "2px" }}
        >
          OTP not received yet,
        </Typography>

        <Button
          sx={buttonStyles}
          disabled={isResendDisabled || resendCount === 3}
          onClick={handleResendClick}
          variant="text"
        >
          Resend OTP
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} mt={2}>
        {/* Reserve space for the "Try again" message */}
        <Box height="80px" overflow="hidden">
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            <Typography variant="body1">
              {isResendDisabled ? (
                resendCount !== 4 && (
                  <>
                    Try again in{" "}
                    <span style={{ fontWeight: "600" }}>
                      {isResendDisabled ? ` (00:${formatTimer(timer)})` : ""}
                    </span>{" "}
                    seconds.
                  </>
                )
              ) : (
                <>
                  {resendCount !== 3 ? (
                    <Typography sx={{ color: "#fff" }}>No Hourglass</Typography>
                  ) : (
                    <Typography sx={{ color: "red" }}>
                      The maximum attempts to resend OTP has been reached.
                    </Typography>
                  )}
                </>
              )}
            </Typography>
          </Typography>
        </Box>
        <HourglassEmpty
          sx={{
            display: isResendDisabled ? "flex" : "none",
            alignItems: "center",
            color: "#5D87FF",
            fontSize: 20,
            marginRight: "5px",
            animation: `${
              isResendDisabled ? "rotateClockwise" : "none"
            } 1s linear infinite`,
            "@keyframes rotateClockwise": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        />
      </Stack>
    </Box>
    </>
  );
};

export default AuthVerifyOtp;