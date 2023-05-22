import * as React from 'react';
import { Button } from 'antd';
import { authActions } from '../authSlice';
import { useAppDispatch } from '../../../app/hooks';
export interface LoginProps {
}

export function Login (props: LoginProps) {
  const dispatch = useAppDispatch()
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: ''
      })
    )
  }
  return (
    <div>
      <Button type="primary" onClick={handleLoginClick}>Login</Button>  
    </div>
  );
}
