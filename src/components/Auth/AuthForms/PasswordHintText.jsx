import { MsgPasswordUpperLetterError, msgPasswordLengthError, MsgPasswordLowerLetterError , msgPasswordNumberLetterError , MsgPasswordSpecialLetterError } from '@/helper/passCheck'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function PasswordHintText({ currentError: msg }) {
    return (
        <>
         <Typography
        variant="caption"
        component="div"
        sx={{
          color: msg.includes(msgPasswordLengthError)
            ? 'error.main'
            : 'text.main',
          textAlign: 'left',
        }}
      >
        * Password should minimum be 8 characters long.
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: msg.includes(MsgPasswordUpperLetterError)
            ? 'error.main'
            : 'text.main',
          textAlign: 'left',
        }}
      >
        * Password must have at-least one upper case letter.
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: msg.includes(MsgPasswordLowerLetterError)
            ? 'error.main'
            : 'text.main',
          textAlign: 'left',
        }}
      >
        * Password must have at-least one lower case letter.
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: msg.includes(msgPasswordNumberLetterError)
            ? 'error.main'
            : 'text.main',
          textAlign: 'left',
        }}
      >
        * Password must be alphanumeric.
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: msg.includes(MsgPasswordSpecialLetterError)
            ? 'error.main'
            : 'text.main',
          textAlign: 'left',
        }}
      >
        * Password must contain any special characters (@$#%^&*!%)(
        {`{}`}[]_).
      </Typography>
        </>
    )
}

PasswordHintText.propTypes = {
    currentError: PropTypes.arrayOf(PropTypes.any).isRequired,
  }
