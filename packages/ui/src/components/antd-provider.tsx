"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <StyleProvider layer>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1c49ff",
              borderRadius: 10,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  );
};
