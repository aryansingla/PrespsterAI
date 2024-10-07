import { Typography } from '@mui/material'
import React from 'react'

function FormikErrorMessage({title}) {
    return (
        <Typography
            sx={{
                fontSize : '12px',
                color : '#FA896B',
                ml : '10px',
                height : '20px',
                mb: '5px'
            }}
        >
            {title}
        </Typography>
    )
}

export default FormikErrorMessage