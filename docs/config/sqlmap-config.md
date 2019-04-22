# SmartSqlMapConfig

## Demo

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMapConfig xmlns="http://SmartSql.net/schemas/SmartSqlMapConfig.xsd">
  <Settings IgnoreParameterCase="false" ParameterPrefix="$" IsCacheEnabled="true"/>
  <Properties>
    <Property Name="JsonTypeHandler`" Value="SmartSql.TypeHandler.JsonTypeHandler`1,SmartSql.TypeHandler"/>
    <Property Name="JsonTypeHandler" Value="SmartSql.TypeHandler.JsonTypeHandler,SmartSql.TypeHandler"/>
    <Property Name="EnumTypeHandler" Value="SmartSql.TypeHandlers.EnumTypeHandler`1, SmartSql"/>
    <Property Name="ScriptBuilder" Value="SmartSql.ScriptTag.ScriptBuilder,SmartSql.ScriptTag"/>
  </Properties>
  <Database>
    <DbProvider Name="SqlServer"/>
    <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
    <Read Name="ReadDb-1" ConnectionString="${ConnectionString}" Weight="100"/>
    <Read Name="ReadDb-2" ConnectionString="${ConnectionString}" Weight="100"/>
  </Database>
  <TypeHandlers>
    <TypeHandler Name="Json" Type="${JsonTypeHandler}">
      <Properties>
        <Property Name="DateFormat" Value="yyyy-MM-dd mm:ss"/>
        <Property Name="NamingStrategy" Value="Camel"/>
      </Properties>
    </TypeHandler>
    <TypeHandler PropertyType="SmartSql.Test.Entities.UserInfo,SmartSql.Test" Type="${JsonTypeHandler`}">
      <Properties>
        <Property Name="DateFormat" Value="yyyy-MM-dd mm:ss"/>
        <Property Name="NamingStrategy" Value="Camel"/>
      </Properties>
    </TypeHandler>
    <TypeHandler PropertyType="SmartSql.Test.Entities.NumericalEnum,SmartSql.Test" Type="${EnumTypeHandler}"/>
  </TypeHandlers>
  <TagBuilders>
    <TagBuilder Name="Script" Type="${ScriptBuilder}"/>
  </TagBuilders>
  <IdGenerator Type="SnowflakeId">
    <Properties>
      <Property Name="WorkerIdBits" Value="10"/>
      <Property Name="WorkerId" Value="888"/>
      <Property Name="Sequence" Value="14"/>
    </Properties>
  </IdGenerator>
  <SmartSqlMaps>
    <SmartSqlMap Path="Maps" Type="Directory"></SmartSqlMap>
  </SmartSqlMaps>
</SmartSqlMapConfig>
```

## Settings 标签属性

| 属性           |    说明   |
| :---------     | --------:|
| ParameterPrefix | 全局参数前缀,默认使用 $ 适配所有DB |
| IgnoreParameterCase | 忽略参数大小写 |
| IsCacheEnabled| 是否开启缓存 |

---

## Database 子标签

| 标签           |    说明   |
| :---------     | --------:|
| DbProvider  | 各Db Client 的 DbProviderFactory 实现类 |
| Write | 写库（必选） |
| Read | 读库（可选） |

### DbProvider 标签

| 属性           |    说明   |    是否必填   |
| :---------     | --------:|--------:|
| Name  | 名称标识,目前内置了：SqlServer/MySQL/Oracle/PostgreSql/SQLite |是|
| ParameterPrefix | 参数前缀:[SqlServer:@ ; MySQL:? ; Oracle::] |否|
| Type | 类型 |否|

### Write 标签

| 属性           |    说明   |
| :---------     | --------:|
| Name  | 名称标识 |
| ConnectionString | 数据库链接字符串 |

### Read 标签

| 属性           |    说明   |
| :---------     | --------:|
| Name  | 名称标识 |
| ConnectionString | 数据库链接字符串 |
| Weight | 权重 |

---

## TypeHandlers 子标签

### TypeHandler 标签

| 属性           |    说明   |
| :---------     | --------:|
| Name  | 名称标识 |
| Type | 类型 |

---

## SmartSqlMaps 子标签

| 标签           |    说明   |
| :---------     | --------:|
| SmartSqlMap  | 用于定位SmartSqlMap文件位置 |

### SmartSqlMap 标签

| 属性           |    说明   |
| :---------     | --------:|
| Path  | 用于定位 SmartSqlMap 文件/目录 位置 |
| Type | 枚举类型:File/Directory/DirectoryWithAllSub/Uri/Embedded,File:为文件资源;Directory:为目录资源,取该目录下所有Map文件 |

---