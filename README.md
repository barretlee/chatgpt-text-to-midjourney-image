# text2image

> [replicate.com](https://replicate.com) 提供了 Model as a Service 的服务，大大降低了普通人玩 Machine Leaning 的门槛，写了一个小工具，将文案送给 ChatGPT 生成可用于图片模型的 Prompt 后，交给 replicate 服务生成图片。—— Barret李靖

<img src="https://user-images.githubusercontent.com/2698003/229572146-1480868c-7823-4ae0-add9-492d89316b76.png" width="800" />

你可以将本项目直接部署到 Vercel，[点击部署](https://vercel.com/new/clone?s=https://github.com/barretlee/chatgpt-text-to-midjourney-image)

## 启动和调试

安装依赖后，直接执行：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

然后浏览器打开 [http://localhost:3000](http://localhost:3000)

## 参数设置

由于免费版的 Vercel 执行函数有市场限制，超过 10s 就直接掐断请求了，可以考虑将 [scripts/airecode-tex2image.js](./scripts/airecode-tex2image.js) 直接部署到 [aircode.io](https://aircode.cool/nfyiwynauv) 上，然后在网页添加 proxyUrl：

```bash
http://localhost:3000?proxyUrl=${YOUR_AIRCODE_PROJECT_URI}
```

我已经在 aircode 上部署了一个副本：<https://aircode.cool/nfyiwynauv>，点击 copy 即可完成部署：

<img width="1000" src="https://user-images.githubusercontent.com/2698003/229573856-27ce77ca-43e7-4f84-a8fb-a9652ef7120a.png">


## License

[MIT](./LICENSE)
