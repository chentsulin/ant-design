// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../empty/style';
// import '../../select/style';

// // deps-lint-skip: form

// deps-lint-skip-all
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';

interface CascaderToken extends DerivativeToken {
  prefixCls: string;
  cascaderCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<CascaderToken> = (token, hashId) => {
  const { prefixCls, cascaderCls } = token;
  const cascaderMenuItemCls = `${cascaderCls}-menu-item`;
  const iconCls = `
    ${cascaderMenuItemCls}-expand ${cascaderMenuItemCls}-expand-icon,
    ${cascaderMenuItemCls}-loading-icon
  `;

  const itemPaddingVertical = Math.round(
    (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  );

  return [
    // =====================================================
    // ==                     Control                     ==
    // =====================================================
    {
      [cascaderCls]: {
        width: 184, // FIXME: hardcode in v4
      },
    },

    // =====================================================
    // ==                      Popup                      ==
    // =====================================================
    {
      [`${cascaderCls}-dropdown`]: [
        // ==================== Checkbox ====================
        getCheckboxStyle(`${prefixCls}-checkbox`, token, hashId!),
        {
          [cascaderCls]: {
            // ================== Checkbox ==================
            '&-checkbox': {
              top: 0,
              marginInlineEnd: token.paddingXS,
            },

            // ==================== Menu ====================
            // >>> Menus
            '&-menus': {
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'flex-start',

              [`&${cascaderCls}-menu-empty`]: {
                [`${cascaderCls}-menu`]: {
                  width: '100%',
                  height: 'auto',

                  [cascaderMenuItemCls]: {
                    color: token.colorTextDisabled,
                    cursor: 'default',
                    pointerEvents: 'none',
                  },
                },
              },
            },

            // >>> Menu
            '&-menu': {
              minWidth: 111, // FIXME: hardcode in v4
              height: 180, // FIXME: hardcode in v4
              margin: `-${token.paddingXS}px 0`,
              padding: `${token.paddingXS}px 0`,
              overflow: 'auto',
              verticalAlign: 'top',
              listStyle: 'none',
              borderInlineEnd: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,
              '-ms-overflow-style': '-ms-autohiding-scrollbar', // https://github.com/ant-design/ant-design/issues/11857

              '&-item': {
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                padding: `${itemPaddingVertical}px ${token.paddingSM}px`,
                overflow: 'hidden',
                lineHeight: token.lineHeight,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
                transition: `all ${token.motionDurationSlow}`,

                '&:hover': {
                  background: token.controlItemBgHover,
                },
                ' &-disabled': {
                  color: token.colorTextDisabled,
                  cursor: 'not-allowed',

                  '&:hover': {
                    background: 'transparent',
                  },

                  [iconCls]: {
                    color: token.colorTextDisabled,
                  },
                },

                [`&-active:not(${cascaderMenuItemCls}-disabled)`]: {
                  [`&, &:hover`]: {
                    fontWeight: token.fontWeightStrong,
                    backgroundColor: token.controlItemBgActive,
                  },
                },

                '&-content': {
                  flex: 'auto',
                },

                [iconCls]: {
                  marginInlineStart: token.paddingXXS,
                  color: token.colorTextSecondary,
                  fontSize: 10, // FIXME: hardcode in v4
                },

                '&-keyword': {
                  color: token.colorHighlight,
                },
              },
            },
          },
        },
      ],
    },
    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${cascaderCls}-dropdown-rtl`]: {
        direction: 'rtl',
      },
    },
  ];
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const cascaderToken: CascaderToken = {
    ...token,
    prefixCls,
    cascaderCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(cascaderToken, hashId),
    ]),
    hashId,
  ];
}
