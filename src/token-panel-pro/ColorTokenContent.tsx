import type { FC } from 'react';
import React, { useState } from 'react';
import makeStyle from '../utils/makeStyle';
import classNames from 'classnames';
import ThemeSelect from '../ThemeSelect';
import { Pick } from '../icons';
import { Button, Collapse, Dropdown, Empty, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  QuestionCircleOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import getDesignToken from '../utils/getDesignToken';
import { getRelatedComponents } from '../utils/statistic';
import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import tokenInfo from '../token-info/TokenInfo';
import { seedRelatedAlias, seedRelatedMap } from '../token-info/TokenRelation';
import TokenDetail from './TokenDetail';
import type { MutableTheme } from 'antd-token-previewer';
import ColorPanel from '../ColorPanel';
import { useDebouncyFn } from 'use-debouncy';
import type { ThemeConfig } from 'antd/es/config-provider/context';

const { Panel } = Collapse;

const useStyle = makeStyle('ColorTokenContent', (token) => ({
  '.token-panel-pro-color': {
    height: '100%',
    display: 'flex',
    '.token-panel-pro-color-seeds': {
      width: 0,
      flex: '0 0 540px',
      height: '100%',
      borderInlineEnd: `1px solid ${token.colorSplit}`,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',

      '.token-panel-pro-color-themes': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flex: '0 0 60px',

        '> span': {
          fontSize: token.fontSizeLG,
          fontWeight: token.fontWeightStrong,
        },
      },
    },
    '.token-panel-pro-color-alias': {
      width: 0,
      flex: '0 0 320px',
      display: 'flex',
      flexDirection: 'column',

      '&-title': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flex: '0 0 60px',

        '&-text': {
          fontSize: token.fontSizeLG,
          fontWeight: token.fontWeightStrong,
        },
      },
    },
    [`.token-panel-pro-token-collapse${token.rootCls}-collapse`]: {
      flex: 1,
      overflow: 'auto',
      [`> ${token.rootCls}-collapse-item-active`]: {
        backgroundColor: '#fff',
        boxShadow:
          '0 6px 16px -8px rgba(0,0,0,0.08), 0 9px 28px 0 rgba(0,0,0,0.05), 0 12px 48px -8px rgba(0,0,0,0.03), inset 0 0 0 2px #1677FF',
        transition: 'box-shadow 0.2s ease-in-out',
        borderRadius: 4,
      },
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
        {
          paddingBlock: '0 12px',
        },

      '.token-panel-pro-token-collapse-description': {
        color: token.colorTextSecondary,
        marginBottom: 16,
      },

      '.token-panel-pro-token-collapse-seed-block': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '&-name-cn': {
          fontWeight: token.fontWeightStrong,
          marginInlineEnd: 4,
        },

        '&-name': {
          color: token.colorTextSecondary,
        },

        '&-sample': {
          '&:not(:last-child)': {
            marginInlineEnd: 16,
          },

          '&-theme': {
            color: token.colorTextSecondary,
            marginBottom: 2,
            fontSize: 12,
          },

          '&-card': {
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            height: 44,
          },
        },
      },

      [`.token-panel-pro-token-collapse-map-collapse${token.rootCls}-collapse`]:
        {
          borderRadius: 4,
          backgroundColor: '#fff',

          [`> ${token.rootCls}-collapse-item`]: {
            [`> ${token.rootCls}-collapse-header`]: {
              paddingBlock: 0,

              [`> ${token.rootCls}-collapse-expand-icon`]: {
                alignSelf: 'center',
              },

              [`> ${token.rootCls}-collapse-header-text`]: {
                flex: 1,

                '.token-panel-pro-token-collapse-map-collapse-token': {
                  color: token.colorTextSecondary,
                  marginInlineStart: 4,
                  marginInlineEnd: 8,
                },

                '.token-panel-pro-token-collapse-map-collapse-preview': {
                  display: 'flex',
                  flex: 'none',
                  '> *': {
                    marginInlineEnd: 8,
                  },
                },
              },
            },

            [`> ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
              {
                padding: '0',
              },
          },
        },
    },

    [`.token-panel-pro-alias-collapse${token.rootCls}-collapse`]: {
      [`> ${token.rootCls}-collapse-item > ${token.rootCls}-collapse-content > ${token.rootCls}-collapse-content-box`]:
        {
          paddingBlock: '0',
        },
    },

    '.token-panel-pro-token-collapse-map-collapse-count': {
      color: token.colorTextSecondary,
      display: 'inline-block',
      fontSize: 12,
      lineHeight: '16px',
      padding: '0 6px',
      backgroundColor: token.colorFillAlter,
      borderRadius: 999,
    },
  },
}));

export type ColorSeedTokenProps = {
  theme: MutableTheme;
  tokenName: keyof SeedToken;
};

const getSeedValue = (config: ThemeConfig, token: keyof SeedToken) => {
  return (config.token?.[token] ?? getDesignToken(config)[token]) as string;
};

const ColorSeedTokenPreview: FC<ColorSeedTokenProps> = ({
  theme,
  tokenName,
}) => {
  const [tokenValue, setTokenValue] = useState(
    getSeedValue(theme.config, tokenName),
  );

  const debouncedOnChange = useDebouncyFn((newValue: number | string) => {
    theme.onThemeChange?.({
      ...theme.config,
      token: {
        ...theme.config.token,
        [tokenName]: newValue,
      },
    });
  }, 500);

  const handleChange = (value: string) => {
    setTokenValue(value);
    debouncedOnChange(value);
  };

  return (
    <div className="token-panel-pro-token-collapse-seed-block-sample">
      <div className="token-panel-pro-token-collapse-seed-block-sample-theme">
        {theme.name}
      </div>
      <div className="token-panel-pro-token-collapse-seed-block-sample-card">
        <Dropdown
          trigger={['click']}
          overlay={<ColorPanel color={tokenValue} onChange={handleChange} />}
        >
          <div
            style={{
              backgroundColor: tokenValue,
              width: 48,
              height: 32,
              borderRadius: 4,
              marginRight: 14,
              cursor: 'pointer',
            }}
          />
        </Dropdown>
        <div>{tokenValue}</div>
      </div>
    </div>
  );
};

export type ColorTokenContentProps = {
  themes: MutableTheme[];
};

const ColorTokenContent: FC<ColorTokenContentProps> = ({ themes }) => {
  const [wrapSSR, hashId] = useStyle();
  const [activeSeed, setActiveSeed] = useState<keyof SeedToken>('colorPrimary');

  return wrapSSR(
    <div className={classNames(hashId, 'token-panel-pro-color')}>
      <div className="token-panel-pro-color-seeds">
        <div className="token-panel-pro-color-themes">
          <span style={{ marginRight: 12 }}>定制主题</span>
          <ThemeSelect
            onEnabledThemeChange={() => {}}
            onShownThemeChange={() => {}}
            enabledThemes={['default', 'dark']}
            shownThemes={['default', 'dark']}
            themes={themes}
          />
        </div>
        <Collapse
          className="token-panel-pro-token-collapse"
          expandIconPosition="end"
          ghost
          accordion
          activeKey={activeSeed}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 450 : 360}
              style={{ fontSize: 12 }}
            />
          )}
          onChange={(key) => setActiveSeed(key as keyof SeedToken)}
        >
          {Object.entries(seedRelatedMap).map((tokenRelationship) => {
            const [seedToken, mapTokens] = tokenRelationship as [
              keyof SeedToken,
              (keyof MapToken)[],
            ];

            return (
              <Panel
                header={
                  <span style={{ fontWeight: 500 }}>
                    {tokenInfo[seedToken]?.name}
                  </span>
                }
                key={seedToken}
              >
                <div>
                  <div className="token-panel-pro-token-collapse-description">
                    {tokenInfo[seedToken]?.description}
                  </div>
                  <div className="token-panel-pro-token-collapse-seed-block">
                    <div style={{ marginRight: 'auto' }}>
                      <div>
                        <span style={{ fontSize: 12 }}>Seed Token</span>
                        <Tooltip title="TBD">
                          <QuestionCircleOutlined
                            style={{ fontSize: 14, marginLeft: 8 }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <span className="token-panel-pro-token-collapse-seed-block-name-cn">
                          {tokenInfo[seedToken]?.name}
                        </span>
                        <span className="token-panel-pro-token-collapse-seed-block-name">
                          {seedToken}
                        </span>
                      </div>
                    </div>
                    {themes.map((themeItem) => (
                      <ColorSeedTokenPreview
                        key={themeItem.key}
                        theme={themeItem}
                        tokenName={seedToken}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 16, marginBottom: 24 }}>
                    <div style={{ fontSize: 12, marginBottom: 10 }}>
                      Map Token
                    </div>
                    <Collapse className="token-panel-pro-token-collapse-map-collapse">
                      {mapTokens.map((mapToken) => (
                        <Panel
                          header={
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 500 }}>
                                  {tokenInfo[mapToken]?.name}
                                </span>
                                <span className="token-panel-pro-token-collapse-map-collapse-token">
                                  {mapToken}
                                </span>
                                <span className="token-panel-pro-token-collapse-map-collapse-count">
                                  {getRelatedComponents(mapToken).length}
                                </span>
                              </div>
                              <div className="token-panel-pro-token-collapse-map-collapse-preview">
                                {themes.map((themeItem) => (
                                  <div
                                    key={themeItem.key}
                                    style={{
                                      height: 56,
                                      width: 56,
                                      position: 'relative',
                                      borderInline: '1px solid #e8e8e8',
                                      background:
                                        'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==) 0% 0% / 40px',
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: (
                                          getDesignToken(
                                            themeItem.config,
                                          ) as any
                                        )[mapToken],
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div style={{ flex: 'none', marginLeft: 4 }}>
                                <Pick />
                              </div>
                            </div>
                          }
                          key={mapToken}
                        >
                          <TokenDetail
                            style={{ margin: 8 }}
                            themes={themes}
                            path={['override', 'derivative']}
                            tokenName={mapToken}
                          />
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                  <Button
                    type="primary"
                    style={{ borderRadius: 4, marginBottom: 12 }}
                  >
                    下一步
                  </Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="token-panel-pro-color-alias">
        <div className="token-panel-pro-color-alias-title">
          <span className="token-panel-pro-color-alias-title-text">
            Alias Token
          </span>
          <Tooltip title="TBD">
            <QuestionCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
          </Tooltip>
          <Button
            type="text"
            icon={<ShrinkOutlined />}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Collapse
            className="token-panel-pro-alias-collapse"
            ghost
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                rotate={isActive ? 90 : 0}
                style={{ fontSize: 12 }}
              />
            )}
          >
            {seedRelatedAlias[activeSeed]?.map((aliasToken) => (
              <Panel
                header={
                  <div>
                    <span style={{ marginRight: 8 }}>{aliasToken}</span>
                    <span className="token-panel-pro-token-collapse-map-collapse-count">
                      {getRelatedComponents(aliasToken).length}
                    </span>
                  </div>
                }
                key={aliasToken}
              >
                <TokenDetail
                  style={{ paddingBottom: 10 }}
                  themes={themes}
                  path={['override', 'alias']}
                  tokenName={aliasToken}
                />
              </Panel>
            ))}
          </Collapse>
          {!seedRelatedAlias[activeSeed]?.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无相关 Alias Token"
            />
          )}
        </div>
      </div>
    </div>,
  );
};

export default ColorTokenContent;