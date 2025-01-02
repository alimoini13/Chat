import React from 'react';
import InputWithLabel from './../../shared/components/InputWithLabel';

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-Mail"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter pass"
      />
    </>
  );
};

export default LoginPageInputs;
