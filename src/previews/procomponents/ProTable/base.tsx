import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import type { ComponentDemo } from '../../../interface';

const Base = () => {
  return <ProTable />;
};

const componentDemo: ComponentDemo = {
  demo: <Base />,
  tokens: ['colorIconHover', 'colorIcon', 'colorText'],
  key: 'ProTable',
};

export default componentDemo;
