# Common Problems

## Why not support Linq?

SmartSql wants developers to be more exposed to SQL and gain absolute control and security. So there are currently no plans to support Code first programming mode.
>I've thought about how to write Sql, and then I'm going to write Linq, and it's probably a bad experience to look at the SQL output in the Linq. To be absolutely optimized for SQL, developers must have absolute control over SQL. In addition, SQL itself is very simple, why add a layer of translators?

> **Codefirst a beautiful, but unrealistic, idea.**

## Interested in SmartSql, I don't know where to start?

Please read the sample project:<https://github.com/dotnetcore/SmartSql/tree/master/sample/SmartSql.Sample.AspNetCore>

## What databases does SmartSql support?

As long as the database-driven database that implements ADO.NET is supported, you only need to install the corresponding driver.

## Does SmartSql support multiple databases?

Support, you can introduce multiple DB instances by configuring:

``` csharp
var sqlServerMapper = SmartSqlContainer.Instance.GetSmartSql("SqlServer");
var mySqlMapepr = SmartSqlContainer.Instance.GetSmartSql("MySql");
```

## What is the performance of SmartSql?

SmartSql performance and Dapper is to save the same level of ≈ native handwriting (another number of other ORM in their own test reports stated higher than Dapper performance, **Please keep your classmates curious**), the document in the SmartSql Performance comparison test report is open source code, Any student interested in performance can run the performance test clone the source code himself. **The performance test of your own run is the real test!**

## What is the availability of SmartSql?

SmartSql has been validated by dozens of microservice scenarios on the line for more than 2 years, and its performance, availability, and productivity have been validated.

## For simple CURD configurations

The author also open source a Code Builder project: SmartCode<https://github.com/Ahoo-Wang/SmartCode>, you can use SmartCode to build a solution.



## Why XML is selected as configuration syntax

The label syntax of XML will be more flexible to use.
For example, filter labels, nested multiplexing, readability. Complex query scenarios will be very comfortable to use, readability will be better, the code level does not need to do any processing, all to the Xml.

## How cluster scenarios are used to get cache consistency

SmartSql provides a Redis cache plug-in that can be installed through NuGet:

``` csharp
Install-Package SmartSql.Cache.Redis
```

## I've used MyBatis before, and I feel like SmartSql has a sense of déjà vu.

Yes, the SmartSql programming model draws on MyBatis in many ways, and if you've used MyBatis before, then SmartSql will be a better choice for you, because you hardly need to have any programming transformation to get started directly, and have cross-platform, high-performance, And the support of many of your plug-ins.

## Handwriting Xml is painful, is there a intellisense?

SmartSql provides an XML schema document for the experience of entering intellisense:
![intellisense](../../imgs/intellisense.png)