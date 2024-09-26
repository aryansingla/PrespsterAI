import React from 'react'
import { Field, connect, getIn } from 'formik'
import { TextField } from 'formik-mui'
import { Box, Typography } from '@mui/material'
import FormikErrorMessage from '../Heading/FormikErrorMessage'

const FormikTextFieldInternal = (props: any) => {
    const error = getIn(props?.formik?.errors, props?.name)
    const touched = getIn(props?.formik?.touched, props?.name)

    return (
        <Box>
            <Typography sx={{ color: '#fff' }}>{props.label}</Typography>
            <Field
                fullWidth
                name={props.name}
                size="small"
                component={TextField}
                variant="outlined"
                type={props.type || 'text'}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
                autoComplete="off"
                value={props.value}
                disabled={props.disabled}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                inputProps={props.inputProps}
                InputProps={{
                    startAdornment: props.startAdornment,
                    endAdornment: props.endAdornment,
                }}
                sx={{
                    borderRadius: '8px',
                    '& .MuiInputBase-input': {
                        background: '#161717',
                        color: '#fff', // Regular text color
                    },
                    '& .Mui-disabled .MuiInputBase-input': {
                        color: '#fff', // Ensure text color remains white when disabled
                        WebkitTextFillColor: '#fff', // Fix for Chrome/Safari when disabled
                    },
                    '& .MuiFormHelperText-root': {
                        display: 'none'
                    },
                    '& .MuiInputLabel-root': {
                        color: '#fff', // Label color
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#242424', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#242424', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#242424', // Focused border color
                        },
                        '&.Mui-disabled fieldset': {
                            borderColor: '#fff', // Border color when disabled
                        },
                    },
                }}
            />
            <FormikErrorMessage
                title={touched && error ? error : null}
            />
        </Box>
    )
}

export default connect(FormikTextFieldInternal)
