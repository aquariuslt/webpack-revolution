## Simple Backend SpringBoot Application

一个基于`springboot-web-starter`的基本后台应用

## Usage

### Installation Dependencies

> P.S. Please ensure that you have install maven

```bash
mvn install
```

### Start Server
```bash
mvn spring-boot:run
```

### Verify in Browser

Open [http://127.0.0.1:8080/api/v1/validate-json](http://127.0.0.1:8080/api/v1/validate-json)

## Tips

一切基于`springboot`的默认约定, 监听`8080`端口, 并且以`resources/static`或者`resources/public`文件夹作为静态资源文件夹提供服务.

> 为了跟后续的`webpack-dev-server`之`proxy`中间件进行演示,提供了两个测试用的api: `/api/v1/validate-json`, `/api/v1/validate-string`