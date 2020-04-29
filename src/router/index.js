import Vue from 'vue'
import VueRouter from 'vue-router'

//使用VueRouter插件
Vue.use(VueRouter)

//懒加载
// import Study from 'views/study/Study.vue'
const Study = () => import('views/study/Study.vue')
const SearchSeat = () => import('views/study/other/SearchSeat.vue')
const Scan = () => import('views/study/other/Scan.vue')
const Rank = () => import('views/study/other/Rank.vue')
const Shop = () => import('views/study/other/Shop.vue')
const TimeBottle = () => import('views/study/other/TimeBottle.vue')
const Exchange = () => import('views/study/other/Exchange.vue')
const StudyTime = () => import('views/study/other/StudyTime.vue')
const StudyTimeSeat = () => import('views/study/other/StudyTimeSeat.vue')

const SchoolMate = () => import('views/schoolmate/SchoolMate.vue')
const TongZhi = () => import('views/schoolmate/other/TongZhi.vue')
const LearnTeam = () => import('views/schoolmate/other/LearnTeam.vue')

const Sns = () => import('views/sns/Sns.vue')


const Personal = () => import('views/personal/Personal.vue')
const Authentication = () => import('views/personal/other/Authentication.vue')
const More = () => import('views/personal/other/More.vue')
const GetGood = () => import('views/personal/other/GetGood.vue')
const Visted = () => import('views/personal/other/Visted.vue')
const StudyDetail = () => import('views/personal/other/StudyDetail.vue')

//配置路由
const routes = [{
    path: '/',
    redirect: '/study'
},
//学习 相关路由
{
    name: 'study',
    path: '/study',
    component: Study,
    meta: {
        keepAlive: true // 需要被缓存
    }
},
{
    name: 'searchseat',
    path: '/searchseat',
    component: SearchSeat
},
{
    name: 'rank',
    path: '/rank',
    component: Rank
},
{
    name: 'scan',
    path: '/scan',
    component: Scan
},
{
    name: 'shop',
    path: '/shop',
    component: Shop
},
{
    name: 'timebottle',
    path: '/timebottle',
    component: TimeBottle
},
{
    name: 'exchange',
    path: '/exchange',
    component: Exchange
},
{
    name: 'studytime',
    path: '/studytime',
    component: StudyTime
},
{
    name: 'studytimeseat',
    path: '/studytimeseat/roomNumber/:roomNumber/seatsNumber/:seatsNumber',
    component: StudyTimeSeat
},


//同学 相关路由
{
    name: 'schoolmate',
    path: '/schoolmate',
    component: SchoolMate
},
{
    name: 'tongzhi',
    path: '/tongzhi',
    component: TongZhi
},
{
    name: 'learnteam',
    path: '/learnteam',
    component: LearnTeam
},

//朋友圈相关路由
{
    name: 'sns',
    path: '/sns',
    component: Sns
},


//我的 相关路由
{
    name: 'personal',
    path: '/personal',
    component: Personal
},
{
    name: 'authentication',
    path: '/authentication',
    component: Authentication
},
{
    name: 'more',
    path: '/more',
    component: More
},
{
    name: 'getgood',
    path: '/getgood',
    component: GetGood
},
{
    name: 'visited',
    path: '/visited',
    component: Visted
},
{
    name: 'studydetail',
    path: '/studydetail',
    component: StudyDetail
}

]
//创建路由对象
const router = new VueRouter({
    routes
})

//导出路由对象
export default router