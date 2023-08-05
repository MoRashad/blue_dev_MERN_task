import {
  Alert,
  // Alert,
  Box,
  Button,
  CircularProgress,
  // CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogin } from "../state/state";

const initialValues = {
  email: "",
  password: "",
};

interface AuthBody {
  email: string;
  password: string;
}

const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a vild email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "password should be atleast 6 characters"),
});
const AuthPage = () => {
  const [pageType, setPageType] = useState("Signin");
  const [isloading, setIsloading] = useState(false);
  const [showAlertMessage, setShowAlertMessage]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (
    values: AuthBody,
    onSubmitProp: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsloading(true);
    try {
      console.log(values);
      if (pageType === "Signup") {
        const res = await sendRequestForAuth(
          "http://localhost:3333/api/user",
          values
        );
        if (res.status === 201) {
          setShowAlertMessage(
            "Account created successfully, you can signin now"
          );
          setPageType("Signin");
        } else {
          setShowAlertMessage("email is already in use");
        }
      } else {
        const res = await sendRequestForAuth(
          "http://localhost:3333/api/session",
          values
        );
        const jsonRes = await res.json();
        console.log(jsonRes.accessToken);
        if (res.status === 200) {
          dispatch(
            setLogin({
              user: values.email,
              accessToken: jsonRes.accessToken,
              refreshToken: jsonRes.refreshToken,
            })
          );
          navigate("/tasks");
        } else {
          // showAlertMessage(jsonRes.toString);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setShowAlertMessage(undefined);
    }, 5000);
    setIsloading(false);
  };

  const sendRequestForAuth = async (url: string, values: AuthBody) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(response);
    return response;
  };

  return (
    <Box width={"100%"} p={"1rem 6%"} textAlign={"center"}>
      {isloading ? (
        <CircularProgress />
      ) : (
        <Box width={"93%"} p="2rem" m="2rem auto" borderRadius="1.5rem">
          <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" }}>
            {pageType}
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={authValidationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              resetForm,
            }) => (
              <form action="" onSubmit={handleSubmit}>
                <Box
                  display={"grid"}
                  gap={"30px"}
                  gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
                >
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      backgroundColor: "blue",
                      color: "white",
                      "&:hover": { backgroundColor: "deepskyblue" },
                    }}
                  >
                    {pageType}
                  </Button>
                </Box>
                {pageType === "Signin" && (
                  <Typography>
                    Don't have an account?...
                    <Button
                      variant="text"
                      onClick={() => {
                        setPageType("Signup");
                        resetForm();
                      }}
                    >
                      Signup
                    </Button>
                  </Typography>
                )}
                {pageType === "Signup" && (
                  <Typography>
                    Already have an account?...
                    <Button
                      variant="text"
                      onClick={() => {
                        setPageType("Signin");
                        resetForm();
                      }}
                    >
                      Signin
                    </Button>
                  </Typography>
                )}
              </form>
            )}
          </Formik>
        </Box>
      )}
      {showAlertMessage && <Alert severity="info">{showAlertMessage}</Alert>}
    </Box>
  );
};

export default AuthPage;
