# SmartSqlMapConfig

## Demo

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMapConfig xmlns="http://SmartSql.net/schemas/SmartSqlMapConfig.xsd">
  <Settings/>
  <Database>
    <DbProvider Name="SqlServer"/>
    <Write Name="WriteDB" ConnectionString="Data Source=.;database=TestDB;uid=sa;pwd=SmartSql.net"/>
    <Read Name="ReadDB-0" ConnectionString="Data Source=.;database=TestDB;uid=sa;pwd=SmartSql.net" Weight="80"/>
    <Read Name="ReadDB-1" ConnectionString="Data Source=.;database=TestDB;uid=sa;pwd=SmartSql.net" Weight="20"/>
  </Database>
  <TypeHandlers>
    <TypeHandler Name="Json" Type="SmartSql.TypeHandler.JsonTypeHandler,SmartSql.TypeHandler"/>
  </TypeHandlers>
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

| 属性           |    说明   |
| :---------     | --------:|
| Name  | 名称标识,可用于**Env**标签的DB环境识别 |
| ParameterPrefix | 参数前缀:[SqlServer:@ ; MySQL:? ; Oracle::] |
| Type | 类型 |

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
| :---------     | :--------|
| Path  | 用于定位 SmartSqlMap 文件/目录 位置  |
| Type | 枚举类型:File/Directory/Embedded,File:为文件资源;Directory:为目录资源,取该目录下所有Map文件,<br>Embedded:为嵌入的资源(vs中右键你map的xml文件,选为嵌入的资源)，其Path标签应为是一个以1个英文逗号分隔的字符串，前一个为xml的的路径，一般为项目名称.文件夹名称.map.xml,后一个应该为项目名称 |
### 注意事项###

### SmartSqlConfig文件中SmartSqlMaps标签配置示例
```
  <SmartSqlMaps>
    <SmartSqlMap Path="ProjectName.Maps.Client.xml,ProjectName" Type="Embedded" ></SmartSqlMap>
    <SmartSqlMap Path="ProjectName.Maps.Client.xml" Type="File" ></SmartSqlMap>
    <SmartSqlMap Path="Maps" Type="Directory" ></SmartSqlMap>
  </SmartSqlMaps>
```
---

