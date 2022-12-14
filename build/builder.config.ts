/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */

import path from 'path';
import { Configuration, CliOptions } from 'electron-builder';
import buildConfig from './config';

const ICON_ICO = path.resolve(__dirname, '../assets/app-icon/icon/icon.ico');
const ICON_ICNS = path.resolve(__dirname, '../assets/app-icon/icon/icon.icns');

const {
  npm_package_name: productName,
  npm_package_buildVersion: buildVersion,
  npm_package_appId: appId,
  npm_package_version: version,
} = process.env;

const config: Configuration = {
  productName,
  buildVersion,
  appId,
  files: ['dist', 'assets', 'package.json'],
  asar: false,
  directories: {
    buildResources: 'assets',
    output: path.join(
      buildConfig.release,
      `${productName}-release-${version}.${buildVersion}`
    ),
  },
  publish: [
    {
      provider: 'github',
      private: true,
      owner: 'chinhpro2k',
      repo: 'research-electron-project',
      token: '<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>',
    },
  ],
  win: {
    icon: ICON_ICO,
    target: ['nsis', 'msi', 'portable'],
  },
  mac: {
    icon: ICON_ICNS,
  },
  dmg: {
    icon: ICON_ICNS,
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
  },
  linux: {
    icon: ICON_ICNS,
    target: ['deb', 'rpm', 'AppImage'],
    category: 'Education',
    maintainer: 'AISoft',
    executableName: 'Thi Online',
    synopsis: 'Ứng dụng thi trực tuyến',
  },
};

const packageConfig: CliOptions = {
  config,
};

export default packageConfig;
