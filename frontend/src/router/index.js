import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/game',
        name: 'game',
        component: () => import('../views/game/GameView'),
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/app/DashBoardView.vue'),
    },
    {
        path: '/balance/deposit',
        name: 'deposit',
        component: () => import('../views/balance/DepositView.vue'),
    },
    {
        path: '/balance/withdraw',
        name: 'withdraw',
        component: () => import('../views/balance/WithdrawView.vue'),
    }
]

const router = createRouter({history: createWebHashHistory(), routes})

export default router