import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  ProTable,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown, theme } from 'antd';
import React, { useState } from 'react';
import _defaultProps from './_defaultProps';

const ProComponentsDemo = () => {
  const { token } = theme.useToken();
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <div
      style={{
        width: 1440,
        height: 'calc(100vh - 20px)',
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
          <ProLayout
            {..._defaultProps}
            location={{
              pathname,
            }}
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            fixSiderbar
            splitMenus
            layout="mix"
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: '七妮妮',
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2021 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || '/welcome');
                }}
              >
                {dom}
              </div>
            )}
          >
            <PageContainer>
              <ProTable />
            </PageContainer>
          </ProLayout>
        </ProConfigProvider>
      </ConfigProvider>
    </div>
  );
};

export default ProComponentsDemo;
