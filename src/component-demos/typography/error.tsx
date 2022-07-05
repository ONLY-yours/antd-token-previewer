import React from 'react';
import { Typography } from '@madccc/antd';
import type { ComponentDemo } from '../../interface';

const { Title, Text } = Typography;

const Demo = () => (
  <div>
    <Title type={'danger'} level={4}>
      Error Title
    </Title>
    <Text type={'danger'}>error Text</Text>
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover', 'colorErrorActive'],
};

export default componentDemo;
