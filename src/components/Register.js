import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { AuthContext } from "../contexts/auth";
import { Redirect } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Rehoming DarkoDevLab Project
            </Link>{" "}
            2022.
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignIn() {
    const { authTokens, setTokens } = useContext(AuthContext);
    const [formFields, setFormFields] = useState({
        username: "",
        email: "",
        password: "",
    });

    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        setFormFields({ ...formFields, [event.target.name]: event.target.value });

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formFields);
        axios
            .post("http://localhost:1337/auth/local/register", formFields)
            .then((result) => {
                console.log('User profile', result.data.user);
                console.log('User token', result.data.jwt);


                let { jwt } = result.data;
                console.log(jwt);
                setTokens(jwt);
            }
            )

            .catch((e) => {
                console.log(e);
            });
    };

    /* if (authTokens) {
        return 
    } */

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User"
                        name="username"
                        value={formFields.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={formFields.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formFields.password}
                        onChange={handleChange}
                        inputProps={{
                            autoComplete: "new-password",
                            form: {
                                autoComplete: "off",
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{ backgroundColor: "rgb(190, 91, 91)" }}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}