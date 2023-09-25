import { darkAlgorithm, defaultTheme } from '@ant-design/compatible';
import { ConfigProvider } from 'antd';
import type { Theme } from 'antd-token-previewer';
import { ProThemeEditor } from 'antd-token-previewer';
import 'antd/es/style/reset.css';
import React from 'react';

const ProDemo = () => {
  const [theme, setTheme] = React.useState<Theme>({
    name: 'antd 4.x',
    key: 'secret theme',
    config: defaultTheme,
  });

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: true }}>
        <ProThemeEditor
          theme={theme}
          onThemeChange={handleThemeChange}
          style={{ height: '100vh' }}
          darkAlgorithm={darkAlgorithm}
        />
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default ProDemo;
