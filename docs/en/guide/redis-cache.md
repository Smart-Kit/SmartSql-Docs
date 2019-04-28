# Redis Distributed caching

## Installing SmartSql.Cache.Redis

``` powershell
Install-Package SmartSql.Cache.Redis
```

## Cache Configuration

``` xml
<Cache Id="RedisCache" Type="SmartSql.Cache.Redis.RedisCacheProvider,SmartSql.Cache.Redis">
  <Parameter Key="CacheSize" Value="1000"/>
  <Parameter Key="ConnectionString" Value="192.168.31.103"/>
  <Parameter Key="DatabaseId" Value="0"/>
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