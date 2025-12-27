# 在线工具箱

一个纯前端运行的在线工具箱，采用 Wikipedia Monobook 风格设计。

## 功能

- **Base64 编解码**：支持中文等 UTF-8 字符的编解码
- **URL 编解码**：支持 URL 编码和解码
- **JSON 格式化**：支持 JSON 美化和压缩

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## Docker 使用

```bash
docker run --rm -p 8080:80 ismdeep/toolbox:latest
```

访问 http://localhost:8080