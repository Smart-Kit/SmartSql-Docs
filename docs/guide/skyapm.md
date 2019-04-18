# Skywalking 监控

SmartSql 目前支持 Skywalking 监控，通过安装 [SkyAPM-dotnet](https://github.com/SkyAPM/SkyAPM-dotnet) 代理来启用。以下是部分截图。

## 监控执行命令

![Query](../imgs/skyapm-0.png)

### 查看是否缓存，以及返回的记录数

![Query-Detail](../imgs/skyapm-1.png)

### 查看执行的SQL语句

![Query-Statement](../imgs/skyapm-2.png)

## 事务

![Transaction](../imgs/skyapm-3.png)

## 异常

![Error](../imgs/skyapm-error-0.png)

### 异常堆栈跟踪

![Error-Detail](../imgs/skyapm-error-1.png)