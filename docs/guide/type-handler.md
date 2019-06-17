# 类型处理器

SmartSql支持针对复杂类型的数据存储的序列化和反序列化操作，来提升开发者的效率。

## Nuget 安装

``` powershell
Install-Package SmartSql.TypeHandler
```

SmartSql.TypeHandler 包括了俩种类型的类型处理程序: JsonTypeHandler和XmlTypeHandler，当字段类型需要序列化成Json或Xml场景时可使用以下配置,即可将Data属性序列化成Json字符串存储到DB：

#### SmartSqlMapConfig 子元素

``` xml
  <TypeHandlers>
    <TypeHandler Name="Json" Type="SmartSql.TypeHandler.JsonTypeHandler,SmartSql.TypeHandler"/>
    <TypeHandler Name="Xml" Type="SmartSql.TypeHandler.XmlTypeHandler,SmartSql.TypeHandler"/>
  </TypeHandlers>
```

#### SmartSqlMap 子元素

``` xml
  <ResultMaps>
    <ResultMap Id="ExtendedDataResult">
      <Result Property="Data" Column="Data" TypeHandler="Json"/>
    </ResultMap>
  </ResultMaps>
  <ParameterMaps>
    <ParameterMap Id="ExtendedDataParameter">
      <Parameter Property="Data" TypeHandler="Json"/>
    </ParameterMap>
  </ParameterMaps>
```

#### 对应序列化Statement配置

``` xml
  <Statement Id="PublishEvent" ParameterMap="ExtendedDataParameter">
```

#### 对应反序列化配置

``` xml
  <Statement Id="PublishEvent" ResultMap="ExtendedDataParameter">
```

### 针对PostgreSql Json的处理需要Nuget安装SmartSql.TypeHandler.PostgreSql

``` powershell
Install-Package SmartSql.TypeHandler.PostgreSql
```

SmartSql.TypeHandler.PostgreSql 包括了如下类型处理程序:

| 属性       |    说明   |
| :--------- | --------:|
| BoxTypeHandler    | Box类型  |
| CircleTypeHandler    | Circle类型  |
| DecimalArrayTypeHandler    | Decimal[]类型  |
| DictionaryTypeHandler    | Dictionary类型  |
| GuidArrayTypeHandler    | Guid[]类型  |
| InetTypeHandler    | inet类型  |
| Int16ArrayTypeHandler    | Int16[]类型  |
| Int32ArrayTypeHandler    | Int32[]类型  |
| Int64ArrayTypeHandler    | Int64[]类型  |
| JsonTypeHandler    | Json类型  |
| JsonTypeHandler`1    | Json类型  |
| LineSegmentTypeHandler    | LineSegment类型  |
| LineTypeHandler    | Line类型  |
| PathTypeHandler    | Path类型  |
| PointTypeHandler    | Point类型  |
| PolygonTypeHandler    | Polygon类型  |
| StringArrayTypeHandler    | String[]类型  |

当字段类型需要序列化成对应类型场景时可使用以上配置,例下面例子中可将Data属性序列化成Json字符串存储到DB：

#### SmartSqlMapConfig 子元素

``` xml
  <TypeHandlers>
    <TypeHandler Name="Json" Type="SmartSql.TypeHandler.PostgreSql.JsonTypeHandler,SmartSql.TypeHandler.PostgreSql"/>
  </TypeHandlers>
```

#### SmartSqlMap 子元素

``` xml
  <ResultMaps>
    <ResultMap Id="ExtendedDataResult">
      <Result Property="Data" Column="Data" TypeHandler="Json"/>
    </ResultMap>
  </ResultMaps>
  <ParameterMaps>
    <ParameterMap Id="ExtendedDataParameter">
      <Parameter Property="Data" TypeHandler="Json"/>
    </ParameterMap>
  </ParameterMaps>
```

#### Statement对应的配置同上 

为了进一步提升开发者对数据操作的开发效率，SmartSql还加入了Json泛型类型处理器，免去SqlMap文件映射关系的配置。具体配置如下：

#### SmartSqlMapConfig 子元素

``` xml
  <TypeHandler PropertyType="SmartSql.Test.Entities.UserInfo,SmartSql.Test" Type="SmartSql.TypeHandler.JsonTypeHandler`1,SmartSql.TypeHandler">
      <Properties>
        <Property Name="DateFormat" Value="yyyy-MM-dd mm:ss"/>
        <Property Name="NamingStrategy" Value="Camel"/>
      </Properties>
  </TypeHandler>
  <TypeHandlers>
    <TypeHandler Name="Json" Type="SmartSql.TypeHandler.JsonTypeHandler`1,SmartSql.TypeHandler"/>
  </TypeHandlers>
```

#### SmartSqlMap 无需配置


