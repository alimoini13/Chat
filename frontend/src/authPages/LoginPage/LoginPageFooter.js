import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate('/register');
  };
  const getFromValidMessage = () => {
    return 'please login';
  };
  const getFromNotValidMessage = () => {
    return 'enter correct email and pass';
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFromNotValidMessage() : getFromValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log In"
            additionalStyles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account"
        redirectText="Create an account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
