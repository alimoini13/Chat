import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';

// import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from './../../shared/utils/validators';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/user/userSlice.js';
import { openAlertMessage } from '../../features/alert/alertSlice';

const RegisterPage = ({ register }) => {
  const navigate = useNavigate();
  // const { error } = useSelector((state) => state.user);
  // console.log(error, 'register error');
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const handleRegister = async () => {
    dispatch(registerUser({ username, mail, password })).then((result) => {
      if (result.payload) {
        navigate('/dashboard');
      }
      if (result.error) {
        console.log(result.error.message, 'result error');
        dispatch(openAlertMessage(result.error.message));
      }
    });
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: 'white ' }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};


export default RegisterPage;
