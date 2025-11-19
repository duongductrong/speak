"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import { PropsWithChildren, useInsertionEffect } from "react";

export const AntdProvider = ({
  children,
  allowTokensToCSSVariables = true,
}: PropsWithChildren<{ allowTokensToCSSVariables?: boolean }>) => {
  const { token: tokens } = theme.useToken();

  useInsertionEffect(() => {
    if (allowTokensToCSSVariables) {
      const style = document.createElement("style");
      const colorTokens = Object.entries(tokens).filter(([key]) =>
        key.toLowerCase().includes("color")
      );
      
      style.innerHTML = `
      :root {
        ${colorTokens
          .map(([key, value]) => `--${key}: ${value.toString()};`)
          .join("\n")}
      }
    `;
      document.head.appendChild(style);
    }
  }, [tokens, allowTokensToCSSVariables]);

  return (
    <StyleProvider layer>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              // colorPrimary: "#1c49ff",
              borderRadius: 8,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  );
};
