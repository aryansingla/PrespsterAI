import React , {useState} from 'react'
import { Field, connect, getIn } from 'formik'
import { TextField } from 'formik-mui'
import { Box , InputAdornment,IconButton, Tooltip } from '@mui/material'
import FormikErrorMessage from '../Heading/FormikErrorMessage'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const FormikTextFieldValidationPassword = (props:any) => {
    const error = getIn(props?.formik?.errors, props?.name)
    const touched = getIn(props?.formik?.touched, props?.name)
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      const handleKeyDown = (event) => {
        if (event.key === ' ') {
            event.preventDefault(); // Prevent typing whitespace
        }
    };
    return (
        <Box>
            <Field
                fullWidth
                name={props.name}
                size="small"
                component={TextField}
                label={<span>{props.label} {props.mandatory && <span style={{color : 'red'}}>*</span>}</span>}
                autoComplete={props.autoComplete || 'off'}
                value={props.value}
                onChange={props.handleChange}
                onKeyDown={handleKeyDown}
                placeholder={props.placeholder}
                // title={props.label}
                type={showPassword ? "text" : "password"}
                inputProps={props.inputProps}
                // error={!!error}
                // helperText={null}
                sx={{
                    '& .MuiFormHelperText-root' : {
                        display : 'none'
                    }
                }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <Tooltip title="Hide Password" placement='top'>
                            <VisibilityOffIcon />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Show Password" placement='top'>
                            <VisibilityIcon />
                            </Tooltip>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            />
         
        </Box>
    )
}

export default connect(FormikTextFieldValidationPassword)