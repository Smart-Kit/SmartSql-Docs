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

接下来 fork Dapper GitHub 仓库，并添加了 [SmartSql](https://github.com/dotnetcore/SmartSql)/[FreeSql](https://github.com/2881099/FreeSql)/[SqlSugar](https://github.com/sunkaixuan/SqlSugar)/[Chloe](https://github.com/shuxinqin/Chloe)

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
Intel Core i7-6700K CPU 4.00GHz (Skylake), 1 CPU, 8 logical and 4 physical cores
  [Host]   : .NET Framework 4.7.2 (CLR 4.0.30319.42000), 64bit RyuJIT-v4.7.3416.0
  ShortRun : .NET Framework 4.7.2 (CLR 4.0.30319.42000), 64bit RyuJIT-v4.7.3416.0

```

|            ORM |                                     Method |  Return |      Mean |   Gen 0 |  Gen 1 |  Gen 2 | Allocated |
|--------------- |------------------------------------------- |-------- |----------:|--------:|-------:|-------:|----------:|
|       Belgrade |                              ExecuteReader |    Post |  79.62 us |  2.6250 | 0.5000 |      - |  11.09 KB |
|     LINQ to DB |                         &#39;First (Compiled)&#39; |    Post |  99.53 us |  0.6250 |      - |      - |   2.66 KB |
|     LINQ to DB |                                   Query&lt;T&gt; |    Post | 105.18 us |  1.6250 |      - |      - |   6.89 KB |
|     Hand Coded |                                 SqlCommand |    Post | 110.50 us |  2.3750 | 0.8750 | 0.2500 |  12.26 KB |
|         Dapper |               QueryFirstOrDefault&lt;dynamic&gt; | dynamic | 111.83 us |  3.2500 |      - |      - |  13.53 KB |
|         Dapper |                &#39;Query&lt;dynamic&gt; (buffered)&#39; | dynamic | 113.80 us |  2.5000 | 1.0000 | 0.2500 |  13.89 KB |
|         Dapper |                     QueryFirstOrDefault&lt;T&gt; |    Post | 114.47 us |  2.5000 | 1.0000 | 0.2500 |  13.49 KB |
|       PetaPoco |                          &#39;Fetch&lt;T&gt; (Fast)&#39; |    Post | 115.29 us |  2.3750 | 1.1250 | 0.2500 |  13.67 KB |
|        Massive |                          &#39;Query (dynamic)&#39; | dynamic | 116.91 us |  2.5000 | 1.0000 | 0.3750 |  14.21 KB |
|     Hand Coded |                                  DataTable | dynamic | 117.39 us |  2.1250 | 0.8750 |      - |  12.47 KB |
|         Dapper |                      &#39;Query&lt;T&gt; (buffered)&#39; |    Post | 117.41 us |  2.2500 | 1.1250 | 0.2500 |  13.81 KB |
|         Dapper |                           &#39;Contrib Get&lt;T&gt;&#39; |    Post | 119.77 us |  2.7500 | 1.0000 | 0.3750 |  14.47 KB |
|       PetaPoco |                                   Fetch&lt;T&gt; |    Post | 122.33 us |  2.7500 | 1.2500 | 0.2500 |  14.61 KB |
|       SmartSql |          QuerySingleSqlParameterCollection |    Post | 123.78 us |  2.5000 | 1.1250 | 0.3750 |  15.44 KB |
|   ServiceStack |                              SingleById&lt;T&gt; |    Post | 124.67 us |  3.3750 | 0.8750 | 0.3750 |  17.54 KB |
|       SmartSql |                                QuerySingle |    Post | 124.68 us |  2.8750 | 1.0000 | 0.3750 |  15.55 KB |
|        Susanoo |                      &#39;Execute&lt;T&gt; (Static)&#39; |    Post | 125.09 us |  2.7500 | 1.1250 | 0.3750 |     15 KB |
|       SmartSql |                   QuerySingleStrongRequest |    Post | 125.50 us |  2.5000 | 1.1250 | 0.3750 |  15.46 KB |
|       SmartSql |                                    GetById |    Post | 126.35 us |  2.5000 | 1.0000 | 0.2500 |  15.85 KB |
|       SmartSql | QuerySingleSqlParameterCollection&lt;dynamic&gt; | dynamic | 126.47 us |  2.7500 | 1.0000 | 0.2500 |  16.46 KB |
|     LINQ to DB |                                      First |    Post | 126.57 us |  1.2500 |      - |      - |   5.51 KB |
|       SmartSql |                         QuerySingleFromXml |    Post | 126.99 us |  3.0000 | 1.0000 | 0.2500 |  16.18 KB |
|       SmartSql |          QuerySingleStrongRequest&lt;dynamic&gt; | dynamic | 129.19 us |  2.7500 | 1.0000 | 0.2500 |  16.49 KB |
|    LINQ to SQL |                         &#39;First (Compiled)&#39; |    Post | 132.02 us |  2.2500 |      - |      - |   9.84 KB |
| DevExpress.XPO |                              FindObject&lt;T&gt; |    Post | 136.06 us |  7.2500 |      - |      - |  29.89 KB |
|        Susanoo |                 &#39;Execute&lt;dynamic&gt; (Cache)&#39; | dynamic | 140.22 us |  3.2500 | 1.0000 | 0.5000 |  20.42 KB |
|        Susanoo |                       &#39;Execute&lt;T&gt; (Cache)&#39; |    Post | 140.73 us |  3.5000 | 0.7500 | 0.2500 |   20.9 KB |
| DevExpress.XPO |                          GetObjectByKey&lt;T&gt; |    Post | 151.69 us |  5.2500 | 1.2500 |      - |  32.25 KB |
|         Dapper |              &#39;Query&lt;dynamic&gt; (unbuffered)&#39; | dynamic | 163.49 us |  2.5000 | 1.0000 | 0.2500 |  13.89 KB |
|           EF 6 |                                   SqlQuery |    Post | 165.64 us |  5.0000 | 0.7500 |      - |  27.88 KB |
|         Dapper |                    &#39;Query&lt;T&gt; (unbuffered)&#39; |    Post | 166.32 us |  2.5000 | 1.0000 | 0.2500 |  13.85 KB |
| DevExpress.XPO |                                   Query&lt;T&gt; |    Post | 172.58 us |  8.5000 |      - |      - |  34.92 KB |
|        EF Core |                         &#39;First (Compiled)&#39; |    Post | 174.38 us |  3.7500 |      - |      - |   16.1 KB |
|        FreeSql |                        FromSqlFirstDynamic | dynamic | 184.96 us |  3.0000 | 0.7500 | 0.2500 |  19.33 KB |
|        FreeSql |                               FromSqlFirst |    Post | 191.37 us |  3.7500 | 0.7500 | 0.2500 |  19.13 KB |
|          Chloe |                                      First |    Post | 199.02 us |  5.2500 | 0.7500 | 0.2500 |  29.96 KB |
|     NHibernate |                                     Get&lt;T&gt; |    Post | 206.03 us |  5.2500 | 1.0000 |      - |  32.52 KB |
|     NHibernate |                                        HQL |    Post | 215.57 us |  6.0000 | 1.0000 |      - |  35.02 KB |
|        EF Core |                      &#39;First (No Tracking)&#39; |    Post | 222.85 us |  3.7500 | 0.7500 | 0.2500 |  21.38 KB |
|           EF 6 |                                      First |    Post | 224.57 us | 11.5000 |      - |      - |   48.3 KB |
|        EF Core |                                      First |    Post | 231.05 us |  4.5000 |      - |      - |  20.27 KB |
|    LINQ to SQL |                               ExecuteQuery |    Post | 235.34 us |  7.0000 | 1.0000 |      - |  42.36 KB |
|           EF 6 |                      &#39;First (No Tracking)&#39; |    Post | 255.54 us |  9.5000 | 1.0000 |      - |   55.1 KB |
|        EF Core |                                   SqlQuery |    Post | 262.78 us |  5.0000 |      - |      - |  20.77 KB |
|        Susanoo |                 &#39;Execut&lt;dynamic&gt; (Static)&#39; | dynamic | 265.78 us |  2.3750 | 1.1250 | 0.5000 |  14.99 KB |
|     NHibernate |                                   Criteria |    Post | 288.01 us | 11.5000 | 1.0000 |      - |  65.32 KB |
|     NHibernate |                                        SQL |    Post | 300.42 us | 21.0000 | 1.0000 |      - | 100.99 KB |
|        FreeSql |                                      First |    Post | 532.63 us |  5.0000 | 1.0000 |      - |  31.47 KB |
|       SqlSugar |                                      First |    Post | 615.67 us | 10.0000 | 2.0000 |      - |  62.42 KB |
|     NHibernate |                                       LINQ |    Post | 860.69 us | 11.0000 | 2.0000 |      - |  61.81 KB |
|    LINQ to SQL |                                      First |    Post | 934.30 us |  3.0000 | 1.0000 |      - |  14.66 KB |
