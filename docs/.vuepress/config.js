module.exports = {
    title: 'SmartSql',
    description: '高性能、高生产力，超轻量级的ORM。SmartSql = MyBatis + Cache(Memory | Redis) + ZooKeeper + R/W Splitting +Dynamic Repository',
    head: [
        ['meta', {
            name: 'keywords',
            content: 'SmartSql, MyBatis ,Cache(Memory | Redis) ,ZooKeeper , R/W Splitting , Dynamic Repository,ORM,DotNet,.Net,dotnet core'
        }],
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'shortcut icon', href: `/favicon.ico` }],
    ],
    lastUpdated: true,
    themeConfig: {
        repo: 'Smart-Kit/SmartSql',
        docsRepo: 'Smart-Kit/SmartSql-Docs',
        editLinks: true,
        docsDir: 'docs',
        nav: [
            { text: '指南', link: '/guide/' }
            , { text: '配置', link: '/config/' }
            , { text: '动态仓储', link: '/dyrepository/' }
            , { text: 'FAQ', link: '/faq/' }
            , { text: 'SmartCode', link: 'https://github.com/Smart-Kit/SmartCode' }
            , {
                text: '选择语言',
                items: [{
                    text: '中文',
                    link: '/'
                },
                {
                    text: '英文',
                    link: '/en/'
                }
                ]
            }],
        sidebar: {
            '/guide/': getGuideSidebar('指南', '深入'),
            '/dyrepository/': getDyRepositorySidebar('介绍', '配置')
        }
    },
    plugins: 
    [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/google-analytics', {
        ga: 'UA-122662513-1'
        }]
    ]
}

function getGuideSidebar(groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'getting-started',
                'installation',
                'quick-use'
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'dy-repository',
                'type-handler'
            ]
        }
    ]
}
function getDyRepositorySidebar(groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            link: ''
        },
        {
            title: groupB,
            collapsable: false,
            link: 'options'
        }
    ]
}