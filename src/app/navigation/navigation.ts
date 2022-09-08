import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Admin Dashboard',
                type: 'item',
                icon: 'business',
                url: '/pages/admin-dashboard'
            },

            {
                id: 'Archcorp Search',
                title: 'Archcorp Search',
                type: 'item',
                icon: 'search',
                url: 'external1'
            },
            { 
                id: 'PMRS',
                title: 'PMRS',
                type: 'item',
                icon: 'business',
                url: 'external2'
            },
            {
                id: 'HRMS',
                title: 'HRMS',
                type: 'item',
                icon: 'groups',
                url: 'external3'
            },
            {
                id: 'IVB Planner',
                title: 'IVBP',
                type: 'item',
                icon: 'payment',
                url: 'external4'
            },
            {
                id: 'Project Room',
                title: 'Project Room',
                type: 'item',
                icon: 'present_to_all',
                url: 'external5'
            },
            {
                id: 'AccBIM',
                title: 'AccBIM-Coming Soon',
                type: 'item',
                icon: 'book',
                url: 'external6'
            },
            {
                id: 'TimeSheet',
                title: 'TimeSheet',
                type: 'item',
                icon: 'timeline',
                url: 'external7'
            },
            {
                id: 'AI-Bot',
                title: 'AI-Bot',
                type: 'item',
                icon: 'android',
                url: 'external'
            },

            {
                id: 'projects',
                title: 'Projects',
                type: 'item',
                icon: 'business',
                url: '/pages/projects'
            },
            {
                id: 'todo',
                title: 'Tasks',
                type: 'item',
                icon: 'mobile_friendly',
                url: '/apps/todo'
            },
            {
                id: 'mytimeline',
                title: 'My Time Line',
                type: 'item',
                icon: 'groups',
                url: '/pages/mytimeline'
            },
            // {
            //     id: 'Profile',
            //     title: 'profile',
            //     type: 'item',
            //     icon: 'business',
            //     url: '/pages/profile'
            // },
            {
                id: 'reports',
                title: 'Reports',
                type: 'collapsable',
                icon: 'insert_chart',
                children: [
                    {
                        id: 'reports',
                        title: 'Reports',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/reports',
                    },
                    {
                        id: 'detialed-reports',
                        title: 'Detailed Reports',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/detailed-reports',
                    },
                    {
                        id: 'monthly-reports',
                        title: 'Monthly Reports',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/monthly-reports',
                    },
                    {
                        id: 'Report',
                        title: 'Gantt Monthly Report',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/ganttmonthly-report',
                    },
                ]
            },
            {
                id: 'siteResource',
                title: 'Site Resource',
                type: 'collapsable',
                icon: 'insert_chart',
                children: [
                    {
                        id: 'resourceallocation',
                        title: 'Resource Allocation',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/resource-allocation',
                    },
                    {
                        id: 'resourceViewer',
                        title: 'Resource Viewer',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/resource-viewer',
                    },
                ]
            },
            // {
            //     id: 'approvals',
            //     title: 'Approvals',
            //     type: 'item',
            //     icon: 'mobile_friendly',
            //     url: '/pages/approvals'
            // },
            {
                id: 'resources',
                title: 'Resources',
                type: 'collapsable',
                icon: 'groups',
                children: [
                    {
                        id: 'resources',
                        title: 'Resources Allocation',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/resources',
                    },
                    // {
                    //     id: 'resources-assignment',
                    //     title: 'Resource Assignment',
                    //     type: 'item',
                    //     icon: 'groups',
                    //     url: '/pages/resource-assignment'
                    // }
                ]
            },
            {
                id: 'leaves',
                title: 'Leave Application',
                type: 'collapsable',
                icon: 'exit_to_app',
                children: [
                    {
                        id: 'apply-leave',
                        title: 'Apply Leave/TimeOff',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/apply-leave',
                    },
                    {
                        id: 'leave-summary',
                        title: 'Leave Requests',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/leave-summary'
                    },
                    {
                        id: 'Time-leave',
                        title: 'TimeOff Requests',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/time-leaves'
                    },
                    {
                        id: 'Employee-leave-Request',
                        title: 'My Leave Request',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/myleave-request'
                    },
                    {
                        id: 'My-TimeOff-leave-Request',
                        title: 'My TimeOff Request',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/timeoff-leaves'
                    }
                    ,
                    {
                        id: 'view-balance-details',
                        title: 'View Balance Details',
                        type: 'item',
                        icon: 'exit_to_app',
                        url: '/pages/view-leaves'
                    }
                  
                ]
            },

            
            // {
            //     id: 'staffinfo',
            //     title: 'Employee Details',
            //     type: 'collapsable',
            //     icon: 'exit_to_app',
            //     children: [
            //         {
            //             id: 'add-staff',
            //             title: 'New Employee',
            //             type: 'item',
            //             icon: 'exit_to_app',
            //             url: '/staff-info/add-staff',
            //         },
            //         {
            //             id: 'view-staff',
            //             title: 'View Employee Details',
            //             type: 'item',
            //             icon: 'exit_to_app',
            //             url: '/staff-info/view-staff'
            //         },                                   
            //     ]
            // },    

            {
                id: 'financialresport',
                title: 'Finance',
                type: 'collapsable',
                icon: 'insert_chart',
                children: [
                    {
                        id: 'Income',
                        title: 'Income',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/income',
                    },
                    {
                        id: 'expense',
                        title: 'Expense',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/expense',
                    },
                    {
                        id: 'ExpectedIncome',
                        title: 'Expected Income',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/expected-income',
                    },
                    {
                        id: 'Income Report',
                        title: 'Income Report',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/income-report',
                    },
                    {
                        id: 'ExpenseReport',
                        title: 'Expense Report',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/expense-report',
                    },
                    {
                        id: 'ExpenseReport',
                        title: 'Project Expense',
                        type: 'item',
                        icon: 'insert_chart',
                        url: '/pages/projectprofitloss',
                    },
                ]
            },
        ]
    }
];
