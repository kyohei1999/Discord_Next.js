import { Flag } from '@mui/icons-material';
import { useState } from 'react';

//フラグの切り替え処理
export const useToggle = (): [boolean, () => void, () => void] => {
  const [state, setState] = useState<boolean>(false);

  //フラグ切り替え
  const toggle = () => setState((prev) => !prev);

  //フラグ固定
  const constToggle = () => setState(true);

  return [state, toggle, constToggle];
};
