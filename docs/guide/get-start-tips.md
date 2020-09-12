# 开始使用时，可能需要注意的问题

## 1 SmartSqlMapConfig.xml

一个比较简单的 SmartSqlMapConfig.xml 配置如下。

``` xml
<SmartSqlMapConfig xmlns="http://SmartSql.net/schemas/SmartSqlMapConfig.xsd">
    <Settings IgnoreParameterCase="false" ParameterPrefix="$" IsCacheEnabled="true" EnablePropertyChangedTrack="true"/>

    <Database>
        <DbProvider Name="MySql"/>
        <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
        <Read Name="ReadDb-1" ConnectionString="${ConnectionString}" Weight="100"/>
    </Database>

    <SmartSqlMaps>
        <SmartSqlMap Path="Mappers" Type="Directory"></SmartSqlMap>
    </SmartSqlMaps>
</SmartSqlMapConfig>
```

### 1.1 ParameterPrefix ：SQL 中的参数前缀

写的 SQL 大概是这个样子：  

`SELECT * FROM t_user WHERE c_id= @id`

这里的 `@id` 是需要被替换的参数，那前缀是 @,?,#,: 中的哪一个呢？上面配置的是 $.
出了使用配置的值，还可以使用数据库默认的前缀。

| 数据库连接类型  | 前缀 |
|-----------------|------|
| SQLSERVER       | @    |
| MS_SQLSERVER    | @    |
| MYSQL           | ?    |
| MYSQL_CONNECTOR | ?    |
| POSTGRESQL      | @    |
| ORACLE          | :    |
| SQLITE          | @    |

也可以针对数据源进行单独配置，如：
这里使用的就是 #

``` xml
    <Database>
        <DbProvider Name="SQLite" ParameterPrefix="#"/>
        <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
        <Read Name="ReadDb" ConnectionString="${ConnectionString}" Weight="100"/>
    </Database>
```

对应的 SQL 就是：

``` sql
SELECT * FROM T_User WHERE Id = #id
```

### 1.2 SmartSqlMaps ： SQL XML 文件的定义位置

定义之后，需要拷贝到输出目录，
你需要在 csproj 文件中加这么一段：

``` xml
    <ItemGroup>
        <None Update="SmartSqlMapConfig.xml">
            <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
        <None Update="Mappers\*.xml">
            <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
    </ItemGroup>
```

## 2 Repository 接口的命名

默认情况下，应该使用 I{Scope}Repository 的方式，也可以自己配。

[依赖注入 | SmartSql](https://smartsql.net/guide/di.html#%E6%B3%A8%E5%85%A5%E5%8A%A8%E6%80%81%E4%BB%93%E5%82%A8 )

``` xml
<SmartSqlMap Scope="User" xmlns="http://SmartSql.net/schemas/SmartSqlMap.xsd">
    <Caches>
        <Cache Id="UserCache" Type="Lru">
            <FlushOnExecute Statement="Update"/>
            <FlushOnExecute Statement="Delete"/>
        </Cache>
    </Caches>

    <Statements>
    </Statements>
</SmartSqlMap>
```

这里的 `Scope="User"` 对应的接口命名（默认情况下）就需要是：IUserRepository 。

## 3 其它

* 使用 MySQL 数据库，连接字符串中，需要加上 `AllowUserVariables=True;`
* 想要查看详细的日志和生成的 SQL 语句，将日志输出级别调整为 DEBUG.
