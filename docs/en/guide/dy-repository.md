# Dynamic Agent Repository

> SmartSql Dynamic Agent Repository, a highly productive component. The component seems difficult to understand and actually only does the ability to map Statement and forward requests. But it means a lot.

## SmartSql provides a universal generic Repository interface

> SmartSql.DyRepository.IRepository<TEntity, TPrimary>

``` csharp
    public interface IRepository
    {
        ISqlMapper SqlMapper { get; }
    }
    public interface IRepository<TEntity, TPrimary> : IRepository
        , IInsert<TEntity>, IUpdate<TEntity>, IDelete<TPrimary>,
        IGetEntity<TEntity, TPrimary>,
        IGetRecord, IQueryByPage<TEntity>,
        IQuery<TEntity>, IIsExist
    {

    }
    public interface IRepositoryAsync<TEntity, TPrimary> : IRepository
      , IInsertAsync<TEntity>, IUpdateAsync<TEntity>, IDeleteAsync<TPrimary>,
        IGetEntityAsync<TEntity, TPrimary>,
        IGetRecordAsync, IQueryByPageAsync<TEntity>,
        IQueryAsync<TEntity>, IIsExistAsync
    {

    }
```

## Define Repository interfaces

``` csharp
    /// <summary>
    /// Attributes are optional: [SqlMap (Scope =  "User")], and the default Scope template is not set: I{Scope}Repository
    /// Can be passed into a custom template
    /// RepositoryBuilder builder=new RepositoryBuilder("I{Scope}DAL");
    /// </summary>
    public interface IUserRepository : IRepository<User, string>
    {
        /// <summary>
        /// Property Optional [Statement (Execute = ExecuteBehavior.Auto,Id =  "Query")]
        /// Default Execute:auto, automatically determines execution type
        /// Default Id: Method name
        /// </summary>
        /// <param name="reqParams"></param>
        /// <returns></returns>
        [Statement(Sql = "Select Top(@taken) T.* From User T With(NoLock);")]
        IEnumerable<User> QueryBySql(int taken);
    }
```

## Injection dependencies

> After the injection of dependencies, the Repository interface is dynamically implemented and the corresponding SqlMap is mapped.

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(o =>
                {
                    o.AssemblyString = "SmartSql.Sample.AspNetCore";
                    o.Filter = (type) => type.Namespace == "SmartSql.Sample.AspNetCore.DyRepositories";
                });
```

## Attribute

### Repository interface, function characteristics (StatementAttribute)

``` csharp
    public class StatementAttribute : Attribute
    {
        /// <summary>
        /// Define SmartSqlMap.Scope This property is optional, and the Scope of the Repository interface is used by default
        /// </summary>
        public string Scope { get; set; }
        /// <summary>
        /// Optionally, the function name is used as Statement.Id by default
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Optional, default Execute:auto, automatically determine execution type
        /// </summary>
        public ExecuteBehavior Execute { get; set; } = ExecuteBehavior.Auto;
        /// <summary>
        /// Optional, you can define SQL directly when you are not using SmartSqlMap.Statement
        /// </summary>
        public string Sql { get; set; }
        /// <summary>
        /// Command type
        /// </summary>
        public CommandType CommandType { get; set; } = CommandType.Text;
        /// <summary>
        /// Data source
        /// </summary>
        public DataSourceChoice SourceChoice { get; set; } = DataSourceChoice.Unknow;
    }
```

``` csharp
    public enum ExecuteBehavior
    {
        Auto = 0,
        Execute = 1,
        ExecuteScalar = 2,
        Query = 3,
        QuerySingle = 4,
        GetDataTable = 5,
        GetDataSet = 6
    }
```

### Repository interface Features (SqlMapAttribute)

``` csharp
    public class SqlMapAttribute : Attribute
    {
        /// <summary>
        /// SmartSqlMapConfig.Scope
        /// </summary>
        public string Scope { get; set; }
    }
```

### Function parameter attributes (ParamAttribute)

``` csharp
    public class ParamAttribute : Attribute
    {
        public ParamAttribute(string name = "")
        {
            Name = name;
        }
        /// <summary>
        /// DbDataParameter.Name
        /// </summary>
        public String Name { get; set; }
        public Type FieldType { get; set; }
```