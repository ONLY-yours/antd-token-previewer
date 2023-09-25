import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  ProTable,
} from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import _defaultProps from './_defaultProps';

const AppDemo = () => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: 1440,
        height: 'calc(100% - 20px)',
        overflow: 'hidden',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: token.colorBgLayout,
            },
            Menu: {
              colorItemBg: token.colorBgLayout,
              colorItemTextSelected: token.colorText,
              colorItemBgSelected: token.colorPrimaryBgHover,
            },
          },
        }}
      >
        <ProConfigProvider
          token={{
            layout: {
              sider: {
                // 选中背景颜色
                colorBgMenuItemSelected: 'rgb(22,119,255,0.15)',
                // 选中字体颜色
                colorTextMenuSelected: '#1677FF',
                // 字体hover颜色
                colorTextMenuActive: '#1677FF',
              },
            },
          }}
        >
          <ProLayout {..._defaultProps}>
            <PageContainer>
              <ProTable />
            </PageContainer>
          </ProLayout>
        </ProConfigProvider>
      </ConfigProvider>
    </div>
  );
};

export default AppDemo;
