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

## Settings Label Attribute

| Attribute           |    Note   |
| :---------     | --------:|
| ParameterPrefix | Global parameter prefix, using the default to fit all DB |
| IgnoreParameterCase | Ignore parameter case |
| IsCacheEnabled| Whether to turn on caching |

---

## Database Child elements

| element           |    Note   |
| :---------     | --------:|
| DbProvider  | DbProviderFactory implementation classes for each Db Client |
| Write | Write Library (required) |
| Read | Read library (optional) |

### DbProvider element

| Attribute           |    Note   |
| :---------     | --------:|
| Name  | Name identification, DB environment identification available for **Env** tags |
| ParameterPrefix | Parameter prefix:[SqlServer:@ ; MySQL:? ; Oracle::] |
| Type | Type |

### Write element

| Attribute           |    Note   |
| :---------     | --------:|
| Name  | Name identification |
| ConnectionString | Database Connection string |

### Read element

| Attribute           |    Note   |
| :---------     | --------:|
| Name  | Name identification |
| ConnectionString | Database Connection string |
| Weight | Weight |

---

## TypeHandlers

### TypeHandler element

| Attribute           |    Note   |
| :---------     | --------:|
| Name  | Name identification |
| Type | Type |

---

## SmartSqlMaps child element

| element           |    Note   |
| :---------     | --------:|
| SmartSqlMap  | Used to locate SmartSqlMap file locations |

### SmartSqlMap element

| Attribute           |    Note   |
| :---------     | --------:|
| Path  | Used to locate SmartSqlMap File/directory location |
| Type | Enumeration type: File/Directory,File: for file resources; directory: for directory resources, take all MAP files under that directory |

---