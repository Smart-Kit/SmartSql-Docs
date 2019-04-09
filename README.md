---
sidebar: auto
---

<p align="center">
  <a href="https://github.com/Ahoo-Wang/SmartSql" target="_blank"><img width="100"src="./imgs/SmartSql.png"></a>
</p>

# 简介

 SmartSql = SmartSql = MyBatis + Cache(Memory | Redis) + ZooKeeper + R/W Splitting +Dynamic Repository + ......

## 主要特性

- 1 ORM
  - 1.1 Sync
  - 1.2 Async
- 2 XmlConfig & XmlStatement -> Sql
  - 2.1 SmartSqlMapConfig & SmartSqlMap (是的，你猜对了，和MyBatis一样，通过XML配置分离SQL。)
  - 2.2 Config Hot Update ->ConfigWatcher & Reload (配置文件热更新：当你需要修改Sql的时候，直接修改SqlMap配置文件，保存即可。)
- 3 读写分离
  - 3.1 读写分离
  - 3.2 多读库 权重筛选 （配置多读库，根据读库权重选举读库）
- 4 日志
  - 4.1 基于 Microsoft.Extensions.Logging.Abstractions  (当你需要跟踪调试的时候一切都是那么一目了然)
- 5 Dynamic Repository
  - 5.1 SmartSql.DyRepository  （解放你的双手，你来定义仓储接口，我来实现数据库访问）
- 6 查询缓存  （热数据缓存，一个配置轻松搞定）
  - 6.1 SmartSql.Cache.Memory
    - 6.1.1 Fifo
    - 6.1.2 Lru
  - 6.2 SmartSql.Cache.Redis
  - 6.3 缓存事务一致性
- 7 分布式配置插件
  - 7.1 IConfigLoader (配置文件加载器)
  - 7.2 LocalFileConfigLoader  (本地文件配置加载器)
    - 7.2.1 Load SmartSqlMapSource Xml
    - 7.3.1 Load SmartSqlMapSource Directory
  - 7.3 SmartSql.ZooKeeperConfig (ZooKeeper 分布式配置文件加载器)

## 示例项目

>建议感兴趣的同学可以用 [SmartCode](https://github.com/Ahoo-Wang/SmartCode) 配置好数据库链接，生成解决方案，直接 Run 来体验 SmartSql !

- <https://github.com/ElderJames/wizard-cinema>


## 文档贡献者

- [Ahoo-Wang](https://github.com/Ahoo-Wang)
- [RocherKong](https://github.com/RocherKong)
- [ElderJames](https://github.com/ElderJames)

## 技术交流

点击链接加入QQ群【SmartSql 官方交流群】：[604762592](https://jq.qq.com/?_wv=1027&k=5Sy8Ahw)