import type { ServerFunctionClient } from 'payload';
import configPromise from '@payload-config';
import '@payloadcms/next/css';
import React from 'react';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap.js';

type Args = {
  children: React.ReactNode;
};

const serverFunctions: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    htmlProps={{ suppressHydrationWarning: true }}
    importMap={importMap}
    serverFunction={serverFunctions}
  >
    {children}
  </RootLayout>
);

export default Layout;
