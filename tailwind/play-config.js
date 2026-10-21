/* Design System Glass — archivo generado por scripts/build.mjs desde tailwind/dsg-preset.js. No editar a mano. */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  "darkMode": [
    "variant",
    [
      "[data-theme=\"dark\"] &",
      ".dark &"
    ]
  ],
  "theme": {
    "extend": {
      "colors": {
        "canvas": "var(--dsg-canvas)",
        "ink": {
          "DEFAULT": "var(--dsg-ink)",
          "muted": "var(--dsg-ink-muted)",
          "subtle": "var(--dsg-ink-subtle)"
        },
        "glass": {
          "DEFAULT": "var(--dsg-glass)",
          "strong": "var(--dsg-glass-strong)",
          "rim": "var(--dsg-glass-rim)",
          "highlight": "var(--dsg-glass-highlight)"
        },
        "line": "var(--dsg-line)",
        "accent": {
          "DEFAULT": "var(--dsg-accent)",
          "warm": "var(--dsg-accent-warm)",
          "on": "var(--dsg-on-accent)"
        },
        "success": "var(--dsg-success)",
        "warning": "var(--dsg-warning)",
        "danger": "var(--dsg-danger)",
        "admin": "var(--dsg-admin)"
      },
      "fontFamily": {
        "display": [
          "\"Bricolage Grotesque\"",
          "system-ui",
          "sans-serif"
        ],
        "sans": [
          "\"IBM Plex Sans\"",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "\"IBM Plex Mono\"",
          "ui-monospace",
          "monospace"
        ]
      },
      "fontSize": {
        "display-xl": [
          "96px",
          {
            "lineHeight": "0.95",
            "letterSpacing": "-0.035em",
            "fontWeight": "700"
          }
        ],
        "display-lg": [
          "52px",
          {
            "lineHeight": "1",
            "letterSpacing": "-0.03em",
            "fontWeight": "700"
          }
        ],
        "kpi": [
          "52px",
          {
            "lineHeight": "1",
            "letterSpacing": "-0.03em",
            "fontWeight": "700"
          }
        ],
        "heading-lg": [
          "28px",
          {
            "lineHeight": "1.15",
            "letterSpacing": "-0.015em",
            "fontWeight": "700"
          }
        ],
        "heading-md": [
          "24px",
          {
            "lineHeight": "1.2",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "heading-sm": [
          "20px",
          {
            "lineHeight": "1.25",
            "fontWeight": "700"
          }
        ],
        "body-lg": [
          "17px",
          {
            "lineHeight": "1.55"
          }
        ],
        "body": [
          "15px",
          {
            "lineHeight": "1.5"
          }
        ],
        "body-sm": [
          "14px",
          {
            "lineHeight": "1.5"
          }
        ],
        "caption": [
          "13px",
          {
            "lineHeight": "1.45"
          }
        ],
        "eyebrow": [
          "12px",
          {
            "lineHeight": "1.3",
            "letterSpacing": "0.14em",
            "fontWeight": "500"
          }
        ],
        "overline": [
          "11px",
          {
            "lineHeight": "1.3",
            "letterSpacing": "0.12em",
            "fontWeight": "500"
          }
        ]
      },
      "borderRadius": {
        "control": "14px",
        "row": "18px",
        "glass": "22px",
        "panel": "26px",
        "hero": "32px"
      },
      "boxShadow": {
        "glass": "var(--dsg-shadow-glass)"
      },
      "backdropBlur": {
        "glass": "22px",
        "glass-light": "26px"
      },
      "backdropSaturate": {
        "160": "1.6",
        "190": "1.9"
      },
      "keyframes": {
        "ticker": {
          "from": {
            "transform": "translateX(0)"
          },
          "to": {
            "transform": "translateX(-50%)"
          }
        }
      },
      "animation": {
        "ticker": "ticker 70s linear infinite"
      }
    }
  },
  "corePlugins": {
    "preflight": false
  }
};
