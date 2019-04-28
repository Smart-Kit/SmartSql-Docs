# Dynamic Agent Repository

## Introduction

Dynamic Agent Repository (SmartSql.DyRepository) components are SmartSql very unique features that simplify the use of SmartSql. There is little intrusion into the business code other than configuration. It can be said that using ISqlMapper is the original method, and DyRepository automatically helps you implement these methods.

DyRepository only need to define the Repository interface, through a simple configuration can automatically implement these interfaces and register in the IoC container, when used injection instant acquisition implementation. The principle is to obtain the Scope and SqlId in the XML file of SmartSql through the naming rules of the interface and interface method, use the parameters of the interface method as the Request, and automatically judge the query or perform the operation through the SQL in the XML, and finally realize the ISqlMapper Call.

## Suitable for scenarios

1. Architecture using Repository mode

The Repository model is mainly used in DDD tactics and is used to isolate fields and databases. The functional requirements of DyRepository are mainly found in the practice of DDD, which has so far met most of the needs of DDD practice, and if there are other relevant needs welcome to put forward Issue.

2. Applications similar to SqlHepler

DyRepository can implement any one of the interfaces to query the database tool, CURD method is not the exception. The decoupling effect can be played more through interface injection.

## Introduction to use

The following is a brief demonstration of the comparison between the use of DyRepository and ISqlMapper.

### Ready to work

1. First to create a Repository, this warehousing does not rely on SmartSql, just ordinary warehousing interface

``` csharp
    //Repository interface, the default template is I{Scope}Repository, so the Scope of this interface is Activity
    public interface IActivityRepository
    {
        //The interface method corresponds to SqlId, so the SqlId of this method is Insert
        //The method parameter corresponds to Request, so the Request of this method is activity
        int Insert(Activity activity);

        //The parameters of the value type are automatically encapsulated as an object, so the Request of this method is new {activityId = activityId}
        Activity Query(long activityId);
    }
```

2. Create a configuration XML file SmartSqlMapConfig.xml：

```xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMapConfig xmlns="http://SmartSql.net/schemas/SmartSqlMapConfig.xsd">
  <Settings IsWatchConfigFile="true" IgnoreParameterCase="true"/>
  <Database>
    <!--ParameterPrefix:[SqlServer:@ | MySQL:? |Oracle::] -->
    <DbProvider Name="SqlServer"/>
    <Write Name="WriteDB" ConnectionString="Data Source=.;Initial Catalog=SmartSqlStarterDB;Integrated Security=True"/>
  </Database>
  <SmartSqlMaps>
    <SmartSqlMap Path="Maps" Type="Directory"></SmartSqlMap>
  </SmartSqlMaps>
</SmartSqlMapConfig>

```

3. Then create the XML configuration file Activity.xml, put it in the Maps directory, and set it to always copy in the properties panel:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<SmartSqlMap Scope="Activity"  xmlns="http://SmartSql.net/schemas/SmartSqlMap.xsd">
  <Statements>
    <Statement Id="Insert">
      INSERT INTO Activity
      (ActivityId
      ,Name
      ,BeginTime
      ,Address
      ,CreationTime
      ,Deleted)
      VALUES
      (@ActivityId
      ,@Name
      ,@BeginTime
      ,@Address
      ,@CreationTime
      ,@Deleted)
      ;Select Scope_Identity();
    </Statement>

    <Statement Id="Query">
      SELECT * FROM Activity
      WHERE
      ActivityId = @activityId;
    </Statement>
  </Statements>
</SmartSqlMap>
```

When the preparation is complete, the following can show the difference between the two uses.

### Two uses

#### ISqlMapper usage

If we don't use DyRepository, we need to use ISqlMapper to achieve this warehousing.

``` csharp

    public class ActivityRepository : IActivityRepository
    {
        ISmartSqlMapper SqlMapper = MapperContainer.Instance.GetSqlMapper();

        public int Insert(Activity activity)
        {
            return SqlMapper.ExecuteScalar<int>(new RequestContext()
            {
                Scope = "Activity",
                SqlId = "Insert",
                Request = activity
            });
        }

        public Activity Query(long activityId)
        {
            return SqlMapper.Query<Activity>(new RequestContext()
            {
                Scope = "Activity",
                SqlId = "Query",
                Request = new { activityId = activityId }
            });
        }
    }
```

And register the implementation class with the IoC.:

``` csharp
var services = new ServiceCollection();
var services.AddSingleton<IActivityRepository,ActivityRepository>();
```

#### DyRepository

If you use DyRepository, we only need to configure the IoC registration.

``` csharp
    var services = new ServiceCollection();
    services.AddSmartSqlRepositoryFromAssembly((options) =>
    {
        options.AssemblyString = "SmartSql.Starter.Repository";
    });
```

#### Injection usage

Use the method to inject the interface, and then call the interface method.

``` csharp
    // Suppose ActivityService has been registered with the IoC container
    public class ActivityService
    {
        IActivityRepository activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            this.activityRepository = activityRepository;
        }

        public int Create(Activity activity)
        {
            return activityRepository.Insert(activity);
        }

        public int GetById(int id)
        {
            return activityRepository.Insert(id);
        }
    }

```

## Summarize

Through the simple contrast between DyRepository and ISqlMapper, we can see that DyRepository is powerful and saves us a lot of code. Of course, ISqlMapper naturally has its flexibility and is able to use it anywhere. But if there are no other special needs, in terms of architecture, because there is little intrusion into business code, DyRepository is undoubtedly the most recommended way to use it.

This article only describes the use of the DyRepository default convention, in fact, it can also be through a variety of configuration items to achieve more flexible functions. For more information, see the next DyRepository configuration.