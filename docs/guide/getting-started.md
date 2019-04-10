# 入门

## 安装

``` chsarp
Install-Package SmartSql
Install-Package SmartSql.Schema
// 以及相应ADO.NET驱动
```

## 从连接字符串创建SmartSql实例

``` chsarp
var smartSqlBuilder = new SmartSqlBuilder()
    .UseDataSource(DbProvider.SQLSERVER, ConnectionString)
    .Build();
```

## 从XML中创建SmartSql实例

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMapConfig xmlns="http://SmartSql.net/schemas/SmartSqlMapConfig.xsd">
  <Settings IgnoreParameterCase="false" ParameterPrefix="$" IsCacheEnabled="true"/>
  <Properties>
    <Property Name="ConnectionString" Value="Data Source=.;Initial Catalog=SmartSqlTestDB;Integrated Security=True"/>  
  </Properties>
  <Database>
    <DbProvider Name="SqlServer"/>
    <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
    <Read Name="ReadDb-1" ConnectionString="${ConnectionString}" Weight="100"/>
  </Database>
  <IdGenerator Type="SnowflakeId">
    <Properties>
      <Property Name="WorkerIdBits" Value="10"/>
      <Property Name="WorkerId" Value="888"/>
      <Property Name="Sequence" Value="14"/>
    </Properties>
  </IdGenerator>
  <SmartSqlMaps>
    <SmartSqlMap Path="Maps" Type="Directory"/>
  </SmartSqlMaps>
</SmartSqlMapConfig>
```

``` xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMap Scope="User" xmlns="http://SmartSql.net/schemas/SmartSqlMap.xsd">
  <Statements>
    <Statement Id="QueryParams">
      <Where>
        <IsNotEmpty Prepend="And" Property="Id">
          T.Id = @Id
        </IsNotEmpty>
        <IsNotEmpty Prepend="And" Property="UserName">
          T.UserName = @UserName
        </IsNotEmpty>
        <IsNotEmpty Prepend="And" Property="ExtendedInfo">
          T.ExtendedInfo = @ExtendedInfo
        </IsNotEmpty>
      </Where>
    </Statement>
    <!--新增-->
    <Statement Id="Insert">
      INSERT INTO T_User
      (
      Id,
      UserName,
      ExtendedInfo
      )
      VALUES
      (
      @Id,
      @UserName,
      @ExtendedInfo
      );
      Select Scope_Identity();
    </Statement>
    <!--删除-->
    <Statement Id="Delete">
      Delete From T_User
      Where Id=@Id
    </Statement>
    <!--更新-->
    <Statement Id="Update">
      UPDATE T_User
      <Set>
        <IsProperty Prepend="," Property="UserName">
          UserName = @UserName
        </IsProperty>
        <IsProperty Prepend="," Property="ExtendedInfo">
          ExtendedInfo = @ExtendedInfo
        </IsProperty>
      </Set>
      Where Id=@Id
    </Statement>

    <!--获取数据列-->
    <Statement Id="Query" >
      SELECT
      <IsNotEmpty Prepend="Top" Property="Taken">
        (@Taken)
      </IsNotEmpty>
      T.* From T_User T
      <Include RefId="QueryParams" />
      <Switch Prepend="Order By" Property="OrderBy">
        <Default>
          T.Id Desc
        </Default>
      </Switch>
    </Statement>
    <!--获取分页数据-->
    <Statement Id="QueryByPage" >
      Select T.* From T_User T With(NoLock)
      <Include RefId="QueryParams" />
      Order By T.Id Desc
      Offset ((@PageIndex-1)*@PageSize) Rows Fetch Next @PageSize Rows Only;

      Select Count(1) From T_User T
      <Include RefId="QueryParams" />
    </Statement>
    <!--获取表映射实体-->
    <Statement Id="GetEntity" >
      Select Top 1 T.* From T_User T With(NoLock)
      <Where Min="1">
        <IsNotEmpty Prepend="And" Property="Id">
          T.Id=@Id
        </IsNotEmpty>
      </Where>
    </Statement>
  </Statements>
</SmartSqlMap>
```

```chsarp
var smartSqlBuilder = new SmartSqlBuilder()
    .UseXmlConfig()
    .Build();
```

## SmartSqlBuilder 生命周期

SmartSqlBuilder 的最佳作用域是应用作用域。 可以使用单例模式或者静态单例模式。

## IDbSession

| 函数           |    说明   |
| :---------     | --------:|
| Execute  |  IDbCommand.ExecuteNonQuery，执行返回受影响行数 |
| ExecuteScalar  | IDbCommand.ExecuteScalar,执行并返回查询返回的ReultSet中第一行的第一列  |
| Query  | 执行返回实体列表 |
| QuerySingle  | 执行返回单个实体 |
| GetDataTable  | 执行返回DataTable |
| GetDataSet  | 执行返回DataSet |
| BeginTransaction  | 开启事务 |
| CommitTransaction  | 提交事务 |
| RollbackTransaction  | 回滚事务 |


``` csharp
var dbSessionFactory = new SmartSqlBuilder()
    .UseXmlConfig()
    .Build().GetDbSessionFactory();

    using (var dbSession = dbSessionFactory.Open())
    {
        // Do Somethings
    }
```

### ExecuteScalar

``` csharp
var id = DbSession.ExecuteScalar<long>(new RequestContext
            {
                Scope = nameof(User),
                SqlId = "Insert",
                Request = new User
                {
                    UserName = "SmartSql"
                }
            });
```

### Execute

``` csharp
var id = DbSession.Execute(new RequestContext
            {
                Scope = nameof(User),
                SqlId = "Update",
                Request = new User
                {
                    Id=1,
                    UserName = "SmartSql"
                }
            });
```
### Query

``` csharp
var list = DbSession.Query<User>(new RequestContext
            {
                Scope = nameof(User),
                SqlId = "Query",
                Request = new { Taken = 100 }
            });
```

### QuerySingle

``` csharp
var entity = DbSession.QuerySingle<User>(new RequestContext
            {
                Scope = nameof(User),
                SqlId = "GetEntity",
                Request = new { Id = id }
            });
```

### QueryByPage

通过传入 ValueTuple ，将多个返回结果合并。

``` csharp
var result = DbSession.QuerySingle<ValueTuple<IEnumerable<User>, int>>(new RequestContext
            {
                Scope = nameof(User),
                SqlId = "QueryByPage",
                Request = new { PageSize = 10, PageIndex = 1 }
            });
```

### StoredProcedure

``` csharp
            var dbParameterCollection = new SqlParameterCollection();
            dbParameterCollection.Add(new SqlParameter
            {
                Name = "Total",
                DbType = System.Data.DbType.Int32,
                Direction = System.Data.ParameterDirection.Output
            });
            RequestContext context = new RequestContext
            {
                CommandType = System.Data.CommandType.StoredProcedure,
                RealSql = "SP_QueryUser",
                Request = dbParameterCollection
            };
            var list = DbSession.Query<User>(context);
            dbParameterCollection.TryGetParameterValue("Total", out int total);
```

## IDbSession-CUD

IDbSession 同时提供了CUD扩展函数帮助开发者生成好CUD-SQL，方便开发者直接使用。

### Insert

``` csharp
var id = DbSession.Insert<User,long>(userEntity);
```
### Update

``` csharp
var recordsAffected = DbSession.Update<User>(new User
            {
                Id = id,
                UserName = "SmartSql"
            });
```

### DyUpdate

DyUpdate 函数的作用是当仅需更新部分字段时，可以使用。

``` csharp
var recordsAffected = dbSession.DyUpdate<User>(new { Id = id, UserName = "SmartSql" });
```

### DeleteById

``` csharp
var recordsAffected = dbSession.DeleteById<User, long>(id);
```

### DeleteMany

``` csharp
var recordsAffected = dbSession.DeleteMany<User, long>(new long[] { id0, id1, id2 });
```

### GetById

``` csharp
var entity = dbSession.GetById<User, long>(id);
```