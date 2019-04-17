# SmartSqlMap

| 属性       |    说明   |
| :--------- | --------:|
| Scope    | 域,用于SqlMap定义Sql声明范围  |
| xmlns    | 命名空间,固定值："http://SmartSql.net/schemas/SmartSqlMap.xsd"  |

## SmartSqlMap 子标签

| 属性       |    说明   |
| :--------- | --------:|
| ParameterMaps    | 参数映射（ParameterMap）集  |
| Caches    | 缓存策略（Cache）集  |
| Statements    | 语句（Statement）集  |
| ResultMaps    | 结果映射（ResultMap）集  |
| MultipleResultMaps    | 多结果映射（MultipleResultMap）集  |


## ResultMap

``` xml
    <ResultMap Id="UserExtendResultMap">
      <Result Column="Data" Property="Info" TypeHandler="Json"/>
    </ResultMap>
```

| 属性       |    说明   |
| :--------- | --------:|
| Id    | 唯一性编号  |

### ResultMap.Result

| 属性       |    说明   |
| :--------- | --------:|
| Column    | 列名  |
| Property    | 属性名  |
| TypeHandler    | 类型处理器，内置（Json/Xml）  |

## ParameterMap

``` xml
    <ParameterMap Id="UserExtendParameterMap">
      <Parameter Property="Info" TypeHandler="Json"/>
    </ParameterMap>
```

| 属性       |    说明   |
| :--------- | --------:|
| Id    | 唯一性编号  |

### ParameterMap.Parameter

| 属性       |    说明   |
| :--------- | --------:|
| Property    | 属性名  |
| TypeHandler    | 类型处理器，内置（Json/Xml）  |

## MultipleResultMap

``` xml
    <MultipleResultMap Id="QueryByPage_Map">
      <Result  Property="Total"/>
      <Result  Property="List"/>
    </MultipleResultMap>
```

``` csharp
    public class QueryByPageResponse
    {
        public int Total { get; set; }
        public IEnumerable<T_Entity> List { get; set; }
    }
```

| 属性       |    说明   |
| :--------- | --------:|
| Id    | 唯一性编号  |

### MultipleResultMap.Result

| 属性       |    说明   |
| :--------- | --------:|
| Property    | 属性  |

## Statement标签

| 属性       |    说明   |
| :--------- | --------:|
| Id    | 唯一性编号  |
| Cache    | 缓存策略编号,引用自Cache标签  |
| CommandType    | Text/StoredProcedure , Default:Text |
| SourceChoice    | Unknow/Write/Read , Default:Unknow  |
| ResultMap    |  ResultMap.Id 用于结果映射，列表VS属性名映射，以及字段类型处理器处理 |
| ParameterMap    |  ParameterMap.Id |
| MultipleResultMap    | MultipleResultMap.Id，用于返回多结果集映射  |

## Statement 筛选子标签

| 标签           |    真条件   |
| :---------     | --------:|
| IsEmpty        | null or 空字符串 or 空IEnumerable |
| IsNotEmpty     | !(null or 空字符串 or 空IEnumerable)         |
| IsEqual        | 与比较值相等 |
| IsNotEqual     | 参数不等于比较值    |
| IsTrue         | 参数为 true         |
| IsFalse        | 参数为 false  |
| IsGreaterEqual | 参数大于等于比较值     |
| IsGreaterThan  | 参数大于比较值        |
| IsLessEqual    | 参数小于等于比较值    |
| IsLessThan     | 参数小于比较值        |
| IsNotNull      | 参数不等于 null  |
| IsNull         | 参数等于 null    |
| IsProperty     | 查询对象包含属性名 |
| Switch         | Switch 标签      |
| Case           | Switch标签的子标签,等于比较值 |
| Defalut        | Switch标签的子标签,未命中任何Case子标签时命中此标签  |

### Tag标签 公共属性
| 属性       |    说明   |
| :--------- | --------:|
| Prepend    | 前缀（选填）  |
| Property    | 属性 （必填） |
| Required    | 严格模式：1或true 则必须存在，如无此参数则报错 （选填，默认0） |

### IsEmpty

``` xml
      <IsEmpty Prepend="And" Property="Name" Required="1">
        T.Name=@Name
      </IsEmpty>
``` 

### IsNotEmpty

``` xml
      <IsNotEmpty Prepend="And" Property="Name">
        T.Name=@Name
      </IsNotEmpty>
``` 

### IsEqual

``` xml
      <IsEqual Prepend="And" Property="Name">
        T.Name=1
      </IsEqual>
``` 

### IsNotEqual

``` xml
      <IsNotEqual Prepend="And" Property="Name">
        T.Name=1
      </IsNotEqual>
``` 

### IsTrue

``` xml
        <IsTrue Prepend="And" Property="FBool">
          T.FBool=1
        </IsTrue>
```

### IsFalse

``` xml
        <IsFalse Prepend="And" Property="FBool">
          T.FBool=0
        </IsFalse>
```

### IsGreaterEqual

``` xml
        <IsGreaterEqual Prepend="And" Property="FInt" CompareValue="0">
          T.FInt=@FInt
        </IsGreaterEqual> 
```

### IsGreaterThan

``` xml
        <IsGreaterThan Prepend="And" Property="FInt" CompareValue="0">
          T.FInt=@FInt
        </IsGreaterThan> 
```

### IsLessEqual

``` xml
        <IsLessEqual Prepend="And" Property="FInt" CompareValue="0">
          T.FInt=@FInt
        </IsLessEqual> 
```

### IsLessThan

``` xml
        <IsLessThan Prepend="And" Property="FInt" CompareValue="0">
          T.FInt=@FInt
        </IsLessThan> 
```

### IsNotNull

``` xml
        <IsNotNull Prepend="And" Property="NullStatus">
          T.NullStatus=@NullStatus
        </IsNotNull>
```

### IsNull

``` xml
        <IsNull Prepend="And" Property="NullStatus">
          T.NullStatus=@NullStatus
        </IsNull>
```

### IsProperty

``` xml
        <IsProperty Prepend="And" Property="NullStatus">
          T.NullStatus=@NullStatus
        </IsProperty>
```

### Switch-Case-Default

``` xml
 <Switch Prepend="Order By" Property="OrderBy">
        <Case CompareValue="1">
          T.SortId ASC
        </Case>
        <Default>
          T.SortId Desc,Id Asc
        </Default>
      </Switch>
```

## Statement 其他子标签

| 标签       |    说明   |
| :--------- | --------:|
| Env        | 用于判断全局变量 DbProvider |
| Include    | 引用外部Statement     |
| Dynamic    | 动态标签,用于包裹筛选标签,匹配的第一个筛选标签的前缀将忽略 |
| For        | 用于参数为IEnumerable,遍历参数动态拼接Sql |
| Where      | 继承至Dynamic,用于包裹筛选标签,匹配的第一个筛选标签前缀被忽略,并添加 Where 前缀|
| Set      | 继承至Dynamic,用于Update,包裹筛选标签,匹配的第一个筛选标签前缀被忽略,并添加 Set 前缀,必须匹配至少一个子标签，否则将抛出SmartSqlException异常。|
| Placeholder    | 占位符标签，用于替换参数键值 |

## Cache 标签

| 属性       |    说明   |
| :--------- | --------:|
| Id    | 唯一性标号  |
| Type   | Cache类型继承自ICacheProvider,内置常量:Lru 最近最少使用算法,内存缓存, Fifo 先进先出算法,其他继承自ICacheProvider缓存类型均可,例: Type="SmartSql.Cache.Redis.RedisCacheProvider,SmartSql.Cache.Redis" |

### Cache 子标签

| 标签           |    说明   |
| :---------     | --------:|
| FlushInterval  | 定时刷新策略 |
| FlushOnExecute | 事件触发策略 |
| Parameter | 作为 ICacheProvider 初始化参数  |

### FlushInterval

| 属性       |    说明   |
| :--------- | --------:|
| Hours    | 时  |
| Minutes   | 分 |
| Seconds   | 秒 |

### FlushOnExecute

| 属性       |    说明   |
| :--------- | --------:|
| Statement    | 触发刷新缓存的声明  |

### Parameter

| 属性       |    说明   |
| :--------- | --------:|
| Key    | 键  |
| Value    | 值  |

## For 标签

| 属性       |    说明   |
| :--------- | --------:|
| Open    | 左闭合  |
| Separator    | 分隔符  |
| Close    | 右闭合  |
| Key    | 唯一性键名  |
| Property    | 请求属性名  |

### 应用场景

#### 批量新增

``` xml
<Statement Id="InsertBatch">
      INSERT INTO T_Entity
      (FString
      ,FDecimal
      ,FNullDecimal
      ,FBool
      ,FNullBool
      ,Status
      ,NullStatus
      ,CreationTime
      ,LastUpdateTime)
      VALUES
      <For Open="" Close="" Key="T" Property="Items" Separator=",">
        (@FString
        ,@FDecimal
        ,@FNullDecimal
        ,@FBool
        ,@FNullBool
        ,@Status
        ,@NullStatus
        ,@CreationTime
        ,@LastUpdateTime)
      </For>
    </Statement>
```

``` csharp
var items = new List<T_Entity> {
                new T_Entity
                {
                    CreationTime = DateTime.Now,
                    FBool = true,
                    FDecimal = 1,
                    FLong = 1,
                    FNullBool = false,
                    FString = Guid.NewGuid().ToString("N"),
                    FNullDecimal = 1.1M,
                    LastUpdateTime = DateTime.Now,
                    Status = EntityStatus.Ok
                },new T_Entity
                {
                    CreationTime = DateTime.Now,
                    FBool = true,
                    FDecimal = 1,
                    FLong = 1,
                    FNullBool = false,
                    FString = Guid.NewGuid().ToString("N"),
                    FNullDecimal = 1.1M,
                    LastUpdateTime = DateTime.Now,
                    Status = EntityStatus.Ok
                }
            };
            _sqlMapper.Execute(new RequestContext
            {
                Scope = Scope,
                SqlId = "InsertBatch",
                Request = new { Items = items }
            });
```

#### 多 Like 查询

``` xml
    <Statement Id="Query">
      Select T.* From T_Entity T
      <Where>
        <For Prepend="And" Key="LikeKey" Open="(" Close=")" Property="FStrings" Separator="Or">
          T.FString Like Concat(@LikeKey,'%')
        </For>
      </Where>
    </Statement>
```

``` csharp
            RequestContext context = new RequestContext
            {
                Scope = Scope,
                SqlId = "Query",
                Request = new { FStrings = new string[] { "SmartSql", "SmartCode" } }
            };
            var list = _sqlMapper.Query<T_Entity>(context);
```

生成的SQL

``` sql
Select T.* From T_Entity T With(NoLock)
       Where   (
          T.FString Like Concat(@LikeKey_For__FStrings_0,'%')
         Or
          T.FString Like Concat(@LikeKey_For__FStrings_1,'%')
        )
```