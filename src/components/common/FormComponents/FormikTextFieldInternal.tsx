import React from 'react'
import { Field, connect, getIn } from 'formik'
import { TextField } from 'formik-mui'
import { Box, Typography } from '@mui/material'
import FormikErrorMessage from '../Heading/FormikErrorMessage'

const FormikTextFieldInternal = (props:any) => {
    const error = getIn(props?.formik?.errors, props?.name)
    const touched = getIn(props?.formik?.touched, props?.name)
    
    return (
        <Box>
            <Typography sx={{color:'#fff'}}>{props.label}</Typography>
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
                // label={props.label && <span>{props.label} {props.mandatory && <span style={{color : 'red'}}>*</span>}</span>}
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
                    background : "#000",
                    borderRadius : '8px',
                    '& .MuiInputBase-input' : {
                        background : 'transparent',
                        color: '#fff', 
                    },
                    '& .MuiFormHelperText-root' : {
                        display : 'none'
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff', // label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#242424', // default border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#242424', // hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#242424', // focused border color
                        },
                      },
                    color:'#fff'
                    
                }}
            />
            <FormikErrorMessage
                title={ touched && error ? error : null}
            />
        </Box>
    )
}

export default connect(FormikTextFieldInternal)
