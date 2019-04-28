# TypeHandler

## Nuget Installation

``` powershell
Install-Package SmartSql.TypeHandler
```

SmartSql.TypeHandler includes two types of type handlers: JsonTypeHandler, when a field type needs to be serialized into a Json or Xml scene, you can serialize the Data property to a Json string and store it to DB by using the following configuration:

### SmartSqlMapConfig child element

``` xml
  <TypeHandlers>
    <TypeHandler Name="Json" Type="SmartSql.TypeHandler.JsonTypeHandler,SmartSql.TypeHandler"/>
  </TypeHandlers>
```

### SmartSqlMap child element

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