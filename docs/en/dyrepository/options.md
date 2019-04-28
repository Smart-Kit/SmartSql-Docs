# DyRepository Configuration

The DyRepository configuration is divided into default configuration, feature configuration, and registration configuration, but both must be configured for IoC registration because it is necessary to create a dynamic interface implementation into the IoC.

## Required Configuration:

1. Single Registration

``` csharp
    services.AddRepository<IUserRepository>();
```

2. Bulk Registration

``` csharp
    services.AddSmartSqlRepositoryFromAssembly((options) =>
    {
        //Full name of the assembly where the warehousing interface resides
        options.AssemblyString = "SmartSql.Starter.Repository";
    });
```

## Optional configuration

Feature configuration refers to the configuration items that are labeled on the interface to configure DyRepository, while the registration configuration refers to the configuration in the IoC registration method, and the following shows the difference between the two.

### Scope configuration

#### Scene

I{Scope}Repository is the default configuration of the Scope template, such as IUserRepository Scope is User.
If this is the interface naming style, there is no need to reconfigure it. When you need to change the interface naming style, such as query User's DAO layer name is IUserDao, you need to configure the corresponding Scope.

#### Feature configuration

``` csharp
    [SqlMap(Scope = "User")]
    public interface IUserDao
    {
    }
```

#### Registering a configuration

``` csharp
    //Interface or that interface?
    public interface IUserDao
    {
    }

    //In the IoC configuration, register a single interface
    services.AddRepository<IUserDao>(scope:"User");
    //Or Bulk Registration
    services.AddSmartSqlRepositoryFromAssembly((options) =>
    {
        options.AssemblyString = "SmartSql.Starter.Repository";
        options.ScopeTemplate = "I{Scope}Dao";
    });
```

Note that AddSmartSqlRepositoryFromAssembly can be configured multiple times, and you can configure different properties for different interfaces as long as the interfaces you are scanned to are different

### SqlId Configuration

**SqlId default is the method name for the warehousing interface, and no configuration is required as long as the method name is the same as the SqlId in the XML.**

#### Scene

Because the SQL configuration of SmartSql can be rendered dynamically, different query conditions can be rendered when the same SqlId is passed in with different parameters. For example:

``` xml
    <Statement Id="Query">
      SELECT * FROM User T
      <Where>
        <IsNotEmpty Prepend="And" Property="Email">
          T.Email = @Email
        </IsNotEmpty>
        <IsNotEmpty Prepend="And" Property="UserName">
          T.UserName Like Concat('%',$UserName,'%')
        </IsNotEmpty>
      </Where>
    </Statement>
```

At this point, if you only use the default configuration, writing the two Query (string) method will have the same method name and parameter type can not be overloaded problem.
Therefore, the interface method name needs to be different at this time, and the same SqlId is specified by configuration.

#### Attribute configuration

``` csharp
    [SqlMap(Scope = "User")]
    public interface IUserRepository
    {
        [Statement(Id = "Query")]
        int QueryByEmail(string email);

        [Statement(Id = "Query")]
        int QueryByUserName(string userName);
    }
```

#### Registering a configuration

The registration configuration is achieved by configuring a delegate parameter called sqlIdNamingConvert to implement the conversion method named to SqlId by the interface method.

``` csharp
    services.AddSmartSqlRepositoryFactory(sqlIdNamingConvert: (type, method) =>
    {
        if (method.Name.StartsWith("QueryBy"))
            return "Query"; //It's SqlId back.
    });
    services.AddRepositoryFromAssembly((options) =>
    {
        options.AssemblyString = "SmartSql.Starter.Repository";
    })
```

It is important to note that this configuration needs to separate the AddSmartSqlRepositoryFactory and AddRepositoryFromAssembly two methods, The reason is that AddSmartSqlRepositoryFactory has been called inside the AddSmartSqlRepositoryFromAssembly method in the previous configuration, and if it is called again, it can cause a conflict.

### Other configurations

#### Scene

If you want SmartSql to do only the interface implementation without invading the interface, the above registration configuration can basically meet most of the requirements.

But if you need to drill down into SmartSql, you can get more extra functionality with feature configuration and a generic interface.

#### Interface method Specifies SQL

That is, directly to the interface method to bind SQL, no longer need to configure SQL from the XML, but note that the parameter prefix still needs to be configured in the corresponding configuration file.

``` csharp
    [Statement(Sql = "Select Top(@taken) T.* From User T With(NoLock);")]
    IEnumerable<User> QueryBySql(int taken);
```

The statement attribute is marked only on the method, and there are several other parameters:

|  Parameters | Default value| Note|
| :---: | :---: |:---:|
| Scope | Scope of the current interface|Scope corresponding to XML|
| Id    | Method name| Id of XML corresponding to Statement|
| Execute |ExecuteBehavior.Auto|Execution type, general default is good|
| Sql| None| When you configure SQL, SQL is executed directly on this feature|

#### Specifying query parameters

That is, parameters that specify the parameter name when passing the parameter value of the interface method to SQL rendering, such as passing the value of the ID to the@UserId：

``` csharp
    IEnumerable<User> Query([Param("UserId")]int id);
```

#### Generic interface

After inheriting the generic interface, the CURD common method inside it can be called directly.

1. Synchronous calls:`IRepository<TEntity, TPrimary>`
2. Asynchronous Call:`IRepositoryAsync<TEntity, TPrimary>`