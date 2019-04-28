# Dependency Injection

## Installing SmartSql.DIExtension

``` powershell
Install-Package SmartSql.DIExtension
```

## Demo

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseProperties(Configuration);
                })
                .AddRepositoryFromAssembly(options =>
                {
                    options.AssemblyString = "{Repository-AssemblyString}";
                });
```

## Custom instance Aliases

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseAlias("SmartSql");
                })
```

## Importing external configurations

``` json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "ConnectionString": "Data Source=.;Initial Catalog=SmartSqlTestDB;Integrated Security=True;MultipleActiveResultSets=true"
}
```

``` csharp
builder.UseProperties(Configuration);
```

``` xml
  <Database>
    <DbProvider Name="SqlServer"/>
    <Write Name="WriteDB" ConnectionString="${ConnectionString}"/>
  </Database>
```

## Custom configuration Files

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseXmlConfig(ResourceType.File, "{XmlConfigPath}");
                })
```

ResourceType supports multiple resource types:

- File (Local files)
- Embedded (Embedded files)
- Uri (Network files)

## Direct use of UseDataSource does not depend on any configuration files

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseDataSource("SqlServer","{ConnectionString}");
                })
```

## Injection of dynamic warehousing

### AssemblyAutoRegisterOptions

``` csharp
    public class AssemblyAutoRegisterOptions
    {
        /// <summary>
        /// Instance Alias
        /// </summary>
        public String SmartSqlAlias { get; set; }
        /// <summary>
        /// Repository Interface Assemblies
        /// </summary>
        public string AssemblyString { get; set; }
        /// <summary>
        /// Scope Template
        /// 默认：I{Scope}Repository
        /// </summary>
        public string ScopeTemplate { get; set; }
        /// <summary>
        /// Repository Interface Filter
        /// </summary>
        public Func<Type, bool> Filter { get; set; }

        public void UseTypeFilter<T>()
        {
            Filter = (type) => typeof(T).IsAssignableFrom(type);
        }
    }
```

> AddRepositoryFromAssembly By default traverses all interfaces under the Warehouse interface assembly and performs dynamic generation after injection dependencies.

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(options =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                });
```

### Custom Scope Naming specification

> If your interface naming specification is IUserDataAccess, you can extract Scope from the naming in the following ways.

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(options =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                   options.ScopeTemplate= "I{Scope}DataAccess";
                });
```

### Custom Filters

> Under Filter {Repository-AssemblyString}, Namespace is the Repository interface for SmartSql.Sample.AspNetCore.DyRepositories.

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(o =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                    o.Filter = (type) => type.Namespace == "SmartSql.Sample.AspNetCore.DyRepositories";
                });
```