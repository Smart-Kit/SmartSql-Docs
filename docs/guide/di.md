# 依赖注入

## 安装 SmartSql.DIExtension

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

## 自定义实例别名

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseAlias("SmartSql");
                })
```

## 导入外部配置

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

## 自定义配置文件

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseXmlConfig(ResourceType.File, "{XmlConfigPath}");
                })
```

ResourceType 支持多种资源类型:

- File (本地文件)
- Embedded (嵌入式文件)
- Uri (网络文件)

## 直接使用 UseDataSource 不依赖任何配置文件

``` csharp
            services
                .AddSmartSql((builder) =>
                {
                    builder.UseDataSource("SqlServer","{ConnectionString}");
                })
```

## 注入动态仓储

### AssemblyAutoRegisterOptions

``` csharp
    public class AssemblyAutoRegisterOptions
    {
        /// <summary>
        /// 实例别名
        /// </summary>
        public String SmartSqlAlias { get; set; }
        /// <summary>
        /// 仓储接口程序集
        /// </summary>
        public string AssemblyString { get; set; }
        /// <summary>
        /// Scope模板
        /// 默认：I{Scope}Repository
        /// </summary>
        public string ScopeTemplate { get; set; }
        /// <summary>
        /// 仓储接口筛选器
        /// </summary>
        public Func<Type, bool> Filter { get; set; }

        public void UseTypeFilter<T>()
        {
            Filter = (type) => typeof(T).IsAssignableFrom(type);
        }
    }
```

> AddRepositoryFromAssembly 默认会遍历仓储接口程序集下的所有接口，并执行动态生成后注入依赖。

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(options =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                });
```

### 自定义 Scope 命名规范

> 如果你的接口命名规范为 IUserDataAccess ,可使用以下方式来从命名中提取Scope。

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(options =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                   options.ScopeTemplate= "I{Scope}DataAccess";
                });
```

### 自定义筛选器

> 筛选 {Repository-AssemblyString} 下，Namespace 为 SmartSql.Sample.AspNetCore.DyRepositories 的仓储接口。

``` csharp
            services
                .AddSmartSql()
                .AddRepositoryFromAssembly(o =>
                {
                   options.AssemblyString = "{Repository-AssemblyString}";
                    o.Filter = (type) => type.Namespace == "SmartSql.Sample.AspNetCore.DyRepositories";
                });
```