# Bulk Insert

## Install the appropriate DB driver

| Package | NuGet Stable |  Downloads |
| ------- | -------- | ------- |
| [SmartSql.Bulk.SqlServer](https://www.nuget.org/packages/SmartSql.Bulk.SqlServer/) | [![SmartSql.Bulk.SqlServer](https://img.shields.io/nuget/v/SmartSql.Bulk.SqlServer.svg)](https://www.nuget.org/packages/SmartSql.Bulk.SqlServer/)  | [![SmartSql.Bulk.SqlServer](https://img.shields.io/nuget/dt/SmartSql.Bulk.SqlServer.svg)](https://www.nuget.org/packages/SmartSql.Bulk.SqlServer/) |
| [SmartSql.Bulk.PostgreSql](https://www.nuget.org/packages/SmartSql.Bulk.PostgreSql/) | [![SmartSql.Bulk.PostgreSql](https://img.shields.io/nuget/v/SmartSql.Bulk.PostgreSql.svg)](https://www.nuget.org/packages/SmartSql.Bulk.PostgreSql/)  | [![SmartSql.Bulk.PostgreSql](https://img.shields.io/nuget/dt/SmartSql.Bulk.PostgreSql.svg)](https://www.nuget.org/packages/SmartSql.Bulk.PostgreSql/)
| [SmartSql.Bulk.MySql](https://www.nuget.org/packages/SmartSql.Bulk.MySql/) | [![SmartSql.Bulk.MySql](https://img.shields.io/nuget/v/SmartSql.Bulk.MySql.svg)](https://www.nuget.org/packages/SmartSql.Bulk.MySql/)  | [![SmartSql.Bulk.MySql](https://img.shields.io/nuget/dt/SmartSql.Bulk.MySql.svg)](https://www.nuget.org/packages/SmartSql.Bulk.MySql/) |
| [SmartSql.Bulk.MySqlConnector](https://www.nuget.org/packages/SmartSql.Bulk.MySqlConnector/) | [![SmartSql.Bulk.MySqlConnector](https://img.shields.io/nuget/v/SmartSql.Bulk.MySqlConnector.svg)](https://www.nuget.org/packages/SmartSql.Bulk.MySqlConnector/)  | [![SmartSql.Bulk.MySqlConnector](https://img.shields.io/nuget/dt/SmartSql.Bulk.MySqlConnector.svg)](https://www.nuget.org/packages/SmartSql.Bulk.MySqlConnector/) |

## BulkExtensions

> Because the IBulkInsert object only supports DataTable data sources, an extension is written: BulkExtensions.

``` csharp
 public static class BulkExtensions
    {
        public static DataTable ToDataTable<TEntity>(this IEnumerable<TEntity> list);
        public static void Insert<TEntity>(this IBulkInsert bulkInsert, IEnumerable<TEntity> list);
        public static async Task InsertAsync<TEntity>(this IBulkInsert bulkInsert, IEnumerable<TEntity> list);
    }
```

## SqlServer

``` csharp
using (var dbSession= SqlMapper.SessionStore.Open())
            {
                var data = SqlMapper.GetDataTable(new RequestContext
                {
                    Scope = nameof(AllPrimitive),
                    SqlId = "Query",
                    Request = new { Taken = 100 }
                });
                data.TableName = "T_AllPrimitive";
                IBulkInsert bulkInsert = new BulkInsert(dbSession);
                bulkInsert.Table = data;
                bulkInsert.Insert();
            }
```

## PostgreSql

``` csharp
            using (var dbSession = dbSessionFactory.Open())
            {
                var data = list.ToDataTable();
                data.Columns.RemoveAt(0);
                data.Columns["UserName"].ColumnName = "user_name";
                data.Columns["Status"].ColumnName = "status";
                data.TableName = "t_user";
                BulkInsert bulkInsert = new BulkInsert(dbSession);
                bulkInsert.Table = data;
                bulkInsert.Insert();
            }
```

## MySql

``` csharp
            using (var dbSession = dbSessionFactory.Open())
            {
                var data = list.ToDataTable();
                data.TableName = "t_user";
                BulkInsert bulkInsert = new BulkInsert(dbSession)
                {
                    SecureFilePriv = "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads",
                    Table = data
                };
                bulkInsert.Insert();
            }
```