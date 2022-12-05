# React Vite多平台基础脚手架

## 1. 移动端
即可看到移动端的效果
1. 打开`.postcssrc.js`的所有注释
2. 打开`src/main.tsx`的`import 'lib-flexible'`


## Feature
- TDD
  - Unit: Jest, mocha, chai
  - Mock: spy
  - E2E: playwright
- CHANGELOG: `npm run log`
- husky
- standard workflow
  - commit: `npm run czg`
  - cicd: `gitlab-ci.yml`, `.github/workflow`


## TODO
- Auth
- Route
- 基于axios, fetch的基础通信库
- WebSocket hooks
  - 基础连接 - connection
  - 断线重连 - reconnection
  - 弱连接 - cookie store
  - 错误记录 - indexDB Store
  - 错误上报 - error monitor
  - 性能监控 - performance
- Hooks
- 组件库抽象化
- Mock系统