# Guide

## Installation

### Get Smart Tips with Nuget installation SmartSql.Schema

``` powershell
Install-Package SmartSql.Schema
```

### Global installation Schema Get intellisense

Download the following two files to the Microsoft Visual Studio XSD installation directory

> VS2017 Directory Address:\Microsoft Visual Studio\2017\Enterprise\Xml\Schemas

| 文件      |   地址   |
| --------  | -----:  |
| SmartSqlMapConfig.xsd  | [SmartSqlMapConfig.xsd](https://raw.githubusercontent.com/Ahoo-Wang/SmartSql/master/doc/Schema/SmartSqlMapConfig.xsd) |
| SmartSqlMap.xsd        |   [SmartSqlMap.xsd](https://raw.githubusercontent.com/Ahoo-Wang/SmartSql/master/doc/Schema/SmartSqlMap.xsd)   |

![intellisense](../../imgs/intellisense.png)

``` powershell
Install-Package SmartSql
// And the corresponding ADO.NET drive.
```

## Create an SmartSql instance from a connection string

``` csharp
var smartSqlBuilder = new SmartSqlBuilder()
    .UseDataSource(DbProvider.SQLSERVER, ConnectionString)
    .Build();
```

## Create an SmartSql instance from XML

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
    <Statement Id="Delete">
      Delete From T_User
      Where Id=@Id
    </Statement>
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
    <Statement Id="QueryByPage" >
      Select T.* From T_User T With(NoLock)
      <Include RefId="QueryParams" />
      Order By T.Id Desc
      Offset ((@PageIndex-1)*@PageSize) Rows Fetch Next @PageSize Rows Only;

      Select Count(1) From T_User T
      <Include RefId="QueryParams" />
    </Statement>
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

```csharp
var smartSqlBuilder = new SmartSqlBuilder()
    .UseXmlConfig()
    .Build();
```

## SmartSqlBuilder life cycle

The best scope for SmartSqlBuilder is the application scope. You can use single-case mode or static singleton mode.

## IDbSession

| Function           |    Note   |
| :---------     | --------:|
| Execute  |  IDbCommand.ExecuteNonQuery |
| ExecuteScalar  | IDbCommand.ExecuteScalar|
| Query  | Perform a list of returned entities |
| QuerySingle  | Perform a return to a single entity |
| GetDataTable  | Perform a return DataTable |
| GetDataSet  | Perform a return DataSet |
| BeginTransaction  | Open a transaction |
| CommitTransaction  | Submit a transaction |
| RollbackTransaction  | Rolling back transactions |

``` csharp
var dbSessionFactory = new SmartSqlBuilder()
    .UseXmlConfig()
    .Build()
    .GetDbSessionFactory();

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

Combine multiple return results by passing in ValueTuple.

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

IDbSession also provides CUD extension functions to help developers generate good CUD-SQL that are easy for developers to use directly.

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

The role of the DyUpdate function is that it can be used when only part of the field needs to be updated.

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

## ISqlMapper

> The ISqlMapper interface provides interface functions that are consistent with IDbSession, but ISqlMapper does not need to be explicitly created through DbSessionFactory Dbsession,isqlmapper Internal reliance on IDbSessionStore to manage DbSession, the principle of opening/releasing DbSession is: "Who opens and who is responsible for release".

``` csharp
var sqlMapper = new SmartSqlBuilder()
               .UseXmlConfig()
               .Build()
               .GetSqlMapper();
```