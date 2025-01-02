import React, { useState, useEffect } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { useDispatch } from 'react-redux';

import { validateLoginForm } from './../../shared/utils/validators';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/user/userSlice';
import { openAlertMessage } from '../../features/alert/alertSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const handleLogin = async () => {
    dispatch(loginUser({ mail, password })).then((result) => {
      if (result.payload) {
        // dispatch(reduxLogin(result.payload));
        navigate('/dashboard');
      }
      if (result.error) {
        console.log(result.error.message, 'result error');
        console.log(result, 'result');
        dispatch(openAlertMessage(result.error.message));
      }
    });
  };

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);
  return (
    <div>
      <AuthBox>
        <LoginPageHeader />
        <LoginPageInputs
          mail={mail}
          setMail={setMail}
          password={password}
          setPassword={setPassword}
        />
        <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
      </AuthBox>
    </div>
  );
};

export default LoginPage;
