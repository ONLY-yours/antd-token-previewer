import { ProForm } from '@ant-design/pro-components';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Base = () => {
  return <ProForm />;
};

const componentDemo: ComponentDemo = {
  demo: <Base />,
  tokens: ['colorIconHover', 'colorIcon', 'colorText'],
  key: 'ProForm',
};

export default componentDemo;
