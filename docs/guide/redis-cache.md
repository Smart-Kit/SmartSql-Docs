# Redis 分布式缓存

## 安装 SmartSql.Cache.Redis

``` powershell
Install-Package SmartSql.Cache.Redis
```

## Cache 配置

``` xml
<Cache Id="RedisCache" Type="SmartSql.Cache.Redis.RedisCacheProvider,SmartSql.Cache.Redis">
  <Property Name="CacheSize" Value="1000"/>
  <Property Name="ConnectionString" Value="192.168.31.103"/>
  <Property Name="DatabaseId" Value="0"/>
  <FlushInterval Hours="24" Minutes="0" Seconds="0"/>
  <FlushOnExecute Statement="Insert"/>
  <FlushOnExecute Statement="Update"/>
</Cache>
```

## Demo

``` xml
<Statement Id="GetListByRedisCache" Cache="RedisCache">
      SELECT Top 10 T.* From T_Test T With(NoLock)
      <Include RefId="QueryParams"/>
    </Statement>
```
