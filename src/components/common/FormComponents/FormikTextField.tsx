import React from 'react'
import { Field, connect, getIn } from 'formik'
import { TextField } from 'formik-mui'
import { Box } from '@mui/material'
import FormikErrorMessage from '../Heading/FormikErrorMessage'

const FormikTextField = (props:any) => {
    const error = getIn(props?.formik?.errors, props?.name)
    const touched = getIn(props?.formik?.touched, props?.name)
    
    return (
        <Box>
            <Field
                fullWidth
                name={props.name}
                size="small"
                component={TextField}
                variant="outlined"
                type={props.type || 'text'}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
                // onKeyUp={props.type === 'number' ? handleKeyUp : null}
                label={props.label && <span>{props.label} {props.mandatory && <span style={{color : 'red'}}>*</span>}</span>}
                autoComplete="off"
                value={props.value}
                disabled={props.disabled}
                onChange={props.handleChange}
                
                placeholder={props.placeholder}
                inputProps={props.inputProps}
                InputProps = {{
                    startAdornment : props.startAdornment,
                    endAdornment : props.endAdornment
                }}
                sx={{
                    background : "transparent",
                    borderRadius : '8px',
                    '& .MuiInputBase-input' : {
                        background : 'transparent',
                    },
                    '& .MuiFormHelperText-root' : {
                        display : 'none'
                    }
                    
                }}
            />
            <FormikErrorMessage
                title={ touched && error ? error : null}
            />
        </Box>
    )
}

export default connect(FormikTextField)
