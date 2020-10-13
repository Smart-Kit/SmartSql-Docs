# Tips for getting started

## 1 SmartSqlMapConfig.xml

A relatively simple one SmartSqlMapConfig.xml The configuration is as follows.

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

### 1.1 ParameterPrefix ：Parameter prefix in SQL

The SQL you write looks like this: 

`SELECT * FROM t_user WHERE c_id= @id`

Here '@id' is the parameter to be replaced. Which of the prefixes is `@,?,#,:` ? The configuration above is `$`

You can also use the default prefix of the database.

| Db Type  | Prefix |
|-----------------|----------|
| SQLSERVER       | @        |
| MS_SQLSERVER    | @        |
| MYSQL           | ?        |
| MYSQL_CONNECTOR | ?        |
| POSTGRESQL      | @        |
| ORACLE          | :        |
| SQLITE          | @        |

You can also configure data sources separately, such as:

This is what we use here `#`.

``` xml
    <Database>
        <DbProvider Name="SQLite" ParameterPrefix="#"/>
        <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
        <Read Name="ReadDb" ConnectionString="${ConnectionString}" Weight="100"/>
    </Database>
```

The corresponding SQL is:

``` sql
SELECT * FROM T_User WHERE Id = #id
```

### 1.2 SmartSqlMaps ： Definition location of SQL XML file

After definition, it needs to be copied to the output directory,
You need to add this paragraph to the csproj file:

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

## 2 Repository Name of interface

By default, I{scope}repository should be used, or you can configure it yourself.

[DI | SmartSql](https://smartsql.net/guide/di.html#%E6%B3%A8%E5%85%A5%E5%8A%A8%E6%80%81%E4%BB%93%E5%82%A8 )

``` xml
<SmartSqlMap Scope="User" xmlns="http://SmartSql.net/schemas/SmartSqlMap.xsd">
</SmartSqlMap>
```

The name of the interface corresponding to `Scope="User"` here (by default) needs to be IUserRepository.

## 3 Other

* To use MySQL database, add  `AllowUserVariables=True;` to the connection string.
* To view the detailed log and generated SQL statements, adjust the log output level to DEBUG.