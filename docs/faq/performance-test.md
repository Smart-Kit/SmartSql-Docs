# .NET 之 ORM 性能评测

## Why

1. 你应该总能听到某ORM性能比Dapper高
2. 你应该有如下疑问：
   1. 基准测试是否权威
   2. 基准测试的方式是否合理
   3. 基准测试的标准是否能够统一
   4. 统一基准测试标准/规范

## 如何进行姿势正确的性能测试

相信大家对 Dapper 的性能，以及基准测试的权威性是没有疑问的（否则不会有那么多ORM在做性能测试的时候直接选型Dapper）,那么我们就使用 [Dapper 性能基准测试](https://github.com/StackExchange/Dapper) 来作为我们的基准测试模板，并加入一些没有纳入基准测试的 ORM 。这样从合理性/可信度就大体有了一个标准和保障。

接下来 fork Dapper GitHub 仓库，并添加了 [SmartSql](https://github.com/dotnetcore/SmartSql)/IBatis.Net/[FreeSql](https://github.com/2881099/FreeSql)/[SqlSugar](https://github.com/sunkaixuan/SqlSugar)/[Chloe](https://github.com/shuxinqin/Chloe)

> 源代码地址：[https://github.com/Ahoo-Wang/Dapper](https://github.com/Ahoo-Wang/Dapper),如对测试结果，测试方法有疑问请给我提交issue。

## 如何自己进行以上基准测试

> 强烈建议读者按照以下步骤自己运行基准测试。

1. Git-Clone [https://github.com/Ahoo-Wang/Dapper](https://github.com/Ahoo-Wang/Dapper)
2. cd Dapper/Dapper.Tests.Performance
3. dotnet publish -c release
4. 运行 Dapper.Tests.Performance.exe
5. 提示输入，请输入 "*" 运行所有基准测试
6. 等待测试结果，目录：BenchmarkDotNet.Artifacts 下会有一个日志文件，和 results 文件夹 (测试结果文件存放在此目录)

## 基准测试结果

> 重要提示：FreeSql/SqlSugar 官方nuget包为非Release版本，所以测试结果会有影响，仅供参考。

``` ini

BenchmarkDotNet=v0.11.1, OS=Windows 10.0.17763
Intel Core i7-8750H CPU 2.20GHz (Max: 2.21GHz) (Coffee Lake), 1 CPU, 12 logical and 6 physical cores
  [Host]   : .NET Framework 4.7.2 (CLR 4.0.30319.42000), 64bit RyuJIT-v4.8.3801.0
  ShortRun : .NET Framework 4.7.2 (CLR 4.0.30319.42000), 64bit RyuJIT-v4.8.3801.0

```

|            ORM |                                     Method |  Return |      Mean | Rank |   Gen 0 |  Gen 1 |  Gen 2 | Allocated |
|--------------- |------------------------------------------- |-------- |----------:|-----:|--------:|-------:|-------:|----------:|
|       Belgrade |                              ExecuteReader |    Post |  78.74 us |    1 |  2.2500 | 0.6250 |      - |  10.63 KB |
|     LINQ to DB |                         &#39;First (Compiled)&#39; |    Post |  97.61 us |    2 |  0.5000 |      - |      - |   2.67 KB |
|     LINQ to DB |                                   Query&lt;T&gt; |    Post | 103.05 us |    3 |  1.3750 | 0.1250 |      - |   6.91 KB |
|     Hand Coded |                                 SqlCommand |    Post | 107.37 us |    4 |  2.0000 | 1.0000 | 0.5000 |  12.29 KB |
|         Dapper |               QueryFirstOrDefault&lt;dynamic&gt; | dynamic | 110.83 us |    5 |  2.8750 | 0.1250 |      - |  13.57 KB |
|         Dapper |                     QueryFirstOrDefault&lt;T&gt; |    Post | 111.65 us |    5 |  2.2500 | 1.0000 | 0.3750 |  13.53 KB |
|     Hand Coded |                                  DataTable | dynamic | 114.78 us |    6 |  2.0000 | 0.5000 |      - |  12.51 KB |
|       PetaPoco |                          &#39;Fetch&lt;T&gt; (Fast)&#39; |    Post | 114.95 us |    6 |  2.2500 | 0.8750 | 0.2500 |  13.71 KB |
|         Dapper |                &#39;Query&lt;dynamic&gt; (buffered)&#39; | dynamic | 115.54 us |    6 |  2.2500 | 1.0000 | 0.2500 |  13.93 KB |
|       PetaPoco |                                   Fetch&lt;T&gt; |    Post | 119.76 us |    7 |  2.5000 | 1.0000 | 0.2500 |  14.66 KB |
|         Dapper |                      &#39;Query&lt;T&gt; (buffered)&#39; |    Post | 122.10 us |    8 |  2.2500 | 0.8750 | 0.3750 |  13.86 KB |
|        Susanoo |                 &#39;Execut&lt;dynamic&gt; (Static)&#39; | dynamic | 122.68 us |    8 |  2.5000 | 0.7500 | 0.2500 |  15.03 KB |
|        Massive |                          &#39;Query (dynamic)&#39; | dynamic | 122.82 us |    8 |  2.3750 | 0.8750 | 0.2500 |  14.25 KB |
|   ServiceStack |                              SingleById&lt;T&gt; |    Post | 123.93 us |    8 |  3.0000 | 0.7500 | 0.2500 |  17.59 KB |
|     LINQ to DB |                                      First |    Post | 124.53 us |    8 |  1.1250 | 0.1250 |      - |   5.53 KB |
|       SmartSql |          QuerySingleSqlParameterCollection |    Post | 125.26 us |    8 |  2.5000 | 0.7500 | 0.2500 |  15.48 KB |
|       SmartSql |                                QuerySingle |    Post | 126.79 us |    9 |  2.5000 | 0.7500 | 0.2500 |  15.59 KB |
|    LINQ to SQL |                         &#39;First (Compiled)&#39; |    Post | 127.17 us |    9 |  2.0000 |      - |      - |   9.87 KB |
|       SmartSql |                                    GetById |    Post | 127.24 us |    9 |  2.7500 | 0.7500 | 0.2500 |  15.89 KB |
|       SmartSql |                   QuerySingleStrongRequest |    Post | 127.70 us |    9 |  2.5000 | 0.7500 | 0.2500 |  15.51 KB |
|       SmartSql |                         QuerySingleFromXml |    Post | 128.27 us |    9 |  2.7500 | 0.7500 | 0.2500 |  16.23 KB |
|        Susanoo |                      &#39;Execute&lt;T&gt; (Static)&#39; |    Post | 128.92 us |    9 |  2.5000 | 0.7500 | 0.2500 |  15.05 KB |
|       SmartSql |          QuerySingleStrongRequest&lt;dynamic&gt; | dynamic | 129.88 us |    9 |  2.7500 | 1.0000 | 0.5000 |  16.54 KB |
|       SmartSql | QuerySingleSqlParameterCollection&lt;dynamic&gt; | dynamic | 130.96 us |    9 |  2.5000 | 0.7500 | 0.2500 |  16.51 KB |
|         Dapper |                           &#39;Contrib Get&lt;T&gt;&#39; |    Post | 132.10 us |    9 |  2.2500 | 1.0000 | 0.2500 |  14.51 KB |
| DevExpress.XPO |                              FindObject&lt;T&gt; |    Post | 137.14 us |   10 |  6.5000 | 0.2500 |      - |  29.97 KB |
|        Susanoo |                 &#39;Execute&lt;dynamic&gt; (Cache)&#39; | dynamic | 140.24 us |   11 |  3.2500 | 1.0000 | 0.5000 |  20.48 KB |
|        Susanoo |                       &#39;Execute&lt;T&gt; (Cache)&#39; |    Post | 141.23 us |   11 |  3.2500 | 0.7500 | 0.2500 |  20.96 KB |
|           EF 6 |                                   SqlQuery |    Post | 154.68 us |   12 |  4.7500 | 0.7500 |      - |  27.96 KB |
| DevExpress.XPO |                          GetObjectByKey&lt;T&gt; |    Post | 160.87 us |   13 |  5.2500 | 1.2500 |      - |  32.35 KB |
|         IBatis |                             QueryForObject |    Post | 163.87 us |   14 |  2.7500 | 0.7500 | 0.2500 |  16.59 KB |
|         Dapper |                    &#39;Query&lt;T&gt; (unbuffered)&#39; |    Post | 166.28 us |   15 |  2.2500 | 0.7500 | 0.2500 |  13.89 KB |
|         Dapper |              &#39;Query&lt;dynamic&gt; (unbuffered)&#39; | dynamic | 171.82 us |   16 |  2.2500 | 0.7500 | 0.2500 |  13.93 KB |
| DevExpress.XPO |                                   Query&lt;T&gt; |    Post | 172.38 us |   16 |  7.5000 | 0.2500 |      - |  35.02 KB |
|        FreeSql |                        FromSqlFirstDynamic | dynamic | 180.44 us |   17 |  3.2500 | 0.7500 | 0.2500 |  19.38 KB |
|        EF Core |                         &#39;First (Compiled)&#39; |    Post | 188.02 us |   18 |  3.5000 |      - |      - |  16.14 KB |
|        FreeSql |                               FromSqlFirst |    Post | 196.92 us |   19 |  3.2500 | 0.7500 | 0.2500 |  19.17 KB |
|     NHibernate |                                     Get&lt;T&gt; |    Post | 201.46 us |   20 |  5.7500 | 0.7500 |      - |  32.62 KB |
|     NHibernate |                                        HQL |    Post | 207.57 us |   21 |  5.5000 | 0.7500 |      - |  35.11 KB |
|          Chloe |                                      First |    Post | 209.26 us |   21 |  5.0000 | 0.7500 | 0.2500 |  29.85 KB |
|        EF Core |                                   SqlQuery |    Post | 234.51 us |   22 |  4.0000 |      - |      - |  20.64 KB |
|        EF Core |                                      First |    Post | 238.67 us |   23 |  4.2500 |      - |      - |  20.33 KB |
|           EF 6 |                                      First |    Post | 243.86 us |   24 | 10.5000 |      - |      - |  48.44 KB |
|    LINQ to SQL |                               ExecuteQuery |    Post | 250.54 us |   25 |  7.0000 | 1.0000 | 0.5000 |  42.48 KB |
|        EF Core |                      &#39;First (No Tracking)&#39; |    Post | 250.59 us |   25 |  3.7500 | 0.7500 | 0.2500 |  21.44 KB |
|     NHibernate |                                   Criteria |    Post | 256.87 us |   26 | 11.0000 | 1.0000 |      - |  65.64 KB |
|           EF 6 |                      &#39;First (No Tracking)&#39; |    Post | 314.69 us |   27 |  9.0000 | 1.0000 |      - |  55.27 KB |
|     NHibernate |                                        SQL |    Post | 336.02 us |   28 | 19.0000 | 1.0000 |      - |  101.4 KB |
|        FreeSql |                                      First |    Post | 429.83 us |   29 |  5.0000 | 1.0000 | 0.5000 |  31.56 KB |
|       SqlSugar |                                      First |    Post | 583.49 us |   30 | 10.0000 | 1.0000 |      - |   62.5 KB |
|    LINQ to SQL |                                      First |    Post | 761.03 us |   31 |  3.0000 | 1.0000 |      - |   14.7 KB |
|     NHibernate |                                       LINQ |    Post | 778.43 us |   32 | 10.0000 | 2.0000 |      - |  64.03 KB |
