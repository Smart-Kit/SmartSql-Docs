module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'SmartSql',
            description: '高性能、高生产力，超轻量级的ORM。SmartSql = MyBatis + Cache(Memory | Redis) + R/W Splitting +Dynamic Repository + Diagnostics'
        },
        '/en/': {
            lang: 'en-US',
            title: 'SmartSql',
            description: 'High performance, high productivity, ultra lightweight ORM. SmartSql = MyBatis + Cache(Memory | Redis) + R/W Splitting +Dynamic Repository + Diagnostics'
        }
    },
    title: 'SmartSql',
    description: '高性能、高生产力，超轻量级的ORM。SmartSql = MyBatis + Cache(Memory | Redis) + ZooKeeper + R/W Splitting + Dynamic Repository',
    head: [
        ['meta', {
            name: 'keywords',
            content: 'SmartSql, MyBatis ,Cache(Memory | Redis) ,ZooKeeper , R/W Splitting , Dynamic Repository,ORM,DotNet,.Net,dotnet core'
        }],
        ['link', {
            rel: 'icon',
            href: `/logo.png`
        }],
        ['link', {
            rel: 'shortcut icon',
            href: `/favicon.ico`
        }],
    ],
    lastUpdated: true,
    themeConfig: {
        repo: 'Smart-Kit/SmartSql',
        docsRepo: 'Smart-Kit/SmartSql-Docs',
        editLinkText: '帮助我们改善此页面！',
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: [{
                    text: '指南',
                    link: '/guide/'
                }, {
                    text: '配置',
                    link: '/config/'
                }, {
                    text: '动态仓储',
                    link: '/dyrepository/'
                }, {
                    text: 'FAQ',
                    items: [{
                            text: '常见问题',
                            link: '/faq/'
                        },
                        {
                            text: '性能评测',
                            link: '/faq/performance-test/'
                        },
                        {
                            text: '更新日志',
                            link: 'https://github.com/dotnetcore/SmartSql/releases'
                        }
                    ]
                }, {
                    text: 'SmartCode',
                    link: 'https://github.com/Smart-Kit/SmartCode'
                }],
                sidebar: {
                    '/guide/': getGuideSidebar('指南', '深入'),
                    '/config/': ['', 'sqlmap'],
                    '/dyrepository/': ['', 'options'],
                    '/faq/': ['', 'performance-test']
                }
            },
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: [{
                    text: 'Guide',
                    link: '/en/guide/'
                }, {
                    text: 'Config Reference',
                    link: '/en/config/'
                }, {
                    text: 'Dynamic Repository',
                    link: '/en/dyrepository/'
                }, {
                    text: 'FAQ',
                    items: [{
                            text: 'Common Problems',
                            link: '/en/faq/'
                        },
                        {
                            text: 'Performance evaluation',
                            link: '/en/faq/performance-test/'
                        },
                        {
                            text: 'Update history',
                            link: 'https://github.com/dotnetcore/SmartSql/releases'
                        }
                    ]
                }, {
                    text: 'SmartCode',
                    link: 'https://github.com/Smart-Kit/SmartCode'
                }],
                sidebar: {
                    '/en/guide/': getGuideSidebar('Guide', 'Advanced'),
                    '/en/config/': ['', 'sqlmap'],
                    '/en/dyrepository/': ['', 'options'],
                    '/en/faq/': ['', 'performance-test']
                }
            }
        }
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/google-analytics', {
            ga: 'UA-122662513-1'
        }]
    ]
}

function getGuideSidebar(groupA, groupB) {
    return [{
            title: groupA,
            collapsable: false,
            children: [
                '',
                'getting-started',
                'di'
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'dy-repository',
                'type-handler',
                'aop',
                'id-generator',
                'bulk',
                'redis-cache',
                'skyapm'
            ]
        }
    ]
}