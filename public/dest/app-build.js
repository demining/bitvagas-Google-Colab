function DashBoardController(e,t,r){}function OverviewController(e,t,r){t.tab=1,t.setTab=function(e){t.tab=e},t.isSet=function(e){return t.tab===e},t.currentUser&&t.currentUser.jobs?t.AppliersLength=r.chain(t.currentUser.jobs).pluck("job_appliers").flatten().size().value():t.AppliersLength=0,t.toggle=function(e,r){return t.$parent.open==e?void(t.$parent.open=void 0):void(t.$parent.open=e)}}function ProfileController(e,t,r,o){t.profile={},t.profile.NAME=t.currentUser.NAME,t.profile.LOCATION=t.currentUser.LOCATION,t.profile.NOTIFY_JOBS=t.currentUser.NOTIFY_JOBS,t.profile.NOTIFY_APPLIES=t.currentUser.NOTIFY_APPLIES,t.UpdateProfile=function(){o.updateMe(t.profile).then(function(r){e.$broadcast("update-me"),t.profile.NAME=r.data.NAME,t.profile.LOCATION=r.data.LOCATION})}}function WalletController(e,t,r,o,n,a,i){var l=angular.element("<qr text='address' type-number='10' size='200' image='false'></qr>");t.current=r.current.name,t.updateWallet=function(){a.updateWallet().then(function(e){})},t.receive=function(){i.swal({title:"Receive",text:"<hr/><div id='qr'></div><span id='address'></span>",html:!0,imageUrl:"img/wallet.svg",animation:"slide-from-top",showCancelButton:!0,showConfirmButton:!1},function(){}),n(function(){angular.element(document.querySelector("#loading")).addClass("animated zoomOut"),t.address=e.currentUser.WALLET_ID,angular.element(document.querySelector("#qr")).append(o(l)(t)),angular.element(document.querySelector("#address")).text(t.address)},100)},t.createWallet=function(){i.swal({title:"Wallet Password",text:"This password will be asked to sign transactions",imageUrl:"img/wallet.svg",animation:"slide-from-top",type:"input",inputPlaceholder:"Wallet Password (min. 8 characters)",inputType:"password",showCancelButton:!0,showConfirmButton:!0,closeOnConfirm:!1,showLoaderOnConfirm:!0},function(e){return e===!1?!1:""===e||e.length<8?(swal.showInputError("Passphrase Invalid, at least 8 characters"),!1):void a.createWallet(e).then(function(e){i.swal({title:"Wallet Created",text:"Address: "+e.data.WALLET_ID})})})}}function AuthenticationService(e,t,r){return{isAuthenticated:function(){var r=e.defer();return t.get("/isAuthenticated").then(function(e){0!==e?r.resolve(e):r.reject()},function(e){r.reject(e)}),r.promise}}}function EscrowController(e,t,r,o){e.initBuyer=!0,r.findAll().then(function(t){console.log(t),e.users=t.data}),e.onChangeUser=function(t){e.partner=t,console.log(t)},e.create=function(e){o.create(e).then(function(e){console.log(e)})}}function EscrowService(e){this.create=function(t){return e.post("/api/escrow",t)}}function JobPostController(e,t,r,o,n,a,i,l){var s;e.data=o.data,e.errors=o.errors||[],e.categories=a.data,e.categories[2].selected=!0,"jobs-confirm"===r.current.name&&(i.isEmpty(e.data)&&r.transitionTo("jobs-post"),e.data.DESCRIPTION=l(e.data.DESCRIPTION)),i.isElement(document.getElementById("markdown__editor"))&&(s=new SimpleMDE({element:document.getElementById("markdown__editor"),spellChecker:!1}),s.value(e.data.marked),s.render()),e.create=function(){e.data.CATEGORY_ID=i.selected(e.categories,"id"),e.data.TAGS=i.map(e.tags,"text"),e.data.DESCRIPTION=s.value(),e.data.marked=s.value();var t=e.data.TYPE_ID;e.data.TYPE_NAME=1==t?"FULL-TIME":2==t?"PART-TIME":3==t?"FREELANCE":4==t?"TEMPORARY":"FREELANCE",r.go("jobs-confirm",{data:e.data})},e.confirm=function(o){n.post(o).then(function(e){r.go("jobs-show",{id:e.data.id,title:t("UrlFilter")(e.data.TITLE)})},function(t){r.go("jobs-post",{data:e.data})})},e.unconfirm=function(t){r.go("jobs-post",{data:e.data})}}function JobCreateController(e,t,r,o,n,a,i,l,s,c,u){var d;e.data=o.data,e.errors=o.errors||[],e.categories=l.data,e.orgs=e.currentUser.orgs,e.categories[1].selected=!0,e.orgs[0]&&(e.orgs[0].selected=!0),"dashboard.jobs.confirm"===r.current.name&&(e.data.DESCRIPTION=u(e.data.DESCRIPTION)),s.isElement(document.getElementById("markdown__editor"))&&(d=new SimpleMDE({element:document.getElementById("markdown__editor"),spellChecker:!1}),d.value(e.data.marked),d.render()),e.create=function(){e.data.CATEGORY_ID=s.selected(e.categories,"id"),e.data.ORG_ID=s.selected(e.orgs,"id"),e.data.ORG_NAME=s.result(s.find(e.orgs,{id:e.data.ORG_ID}),"NAME"),e.data.TAGS=s.map(e.tags,"text"),e.data.DESCRIPTION=d.value(),e.data.marked=d.value();var t=e.data.TYPE_ID;e.data.TYPE_NAME=1==t?"FULL-TIME":2==t?"PART-TIME":3==t?"FREELANCE":4==t?"TEMPORARY":"FREELANCE",r.transitionTo("dashboard.jobs.confirm",{data:e.data})},e.confirm=function(o){a.create(o).then(function(e){r.go("jobs-show",{id:e.data.id,title:t("UrlFilter")(e.data.TITLE)})},function(t){r.go("dashboard.jobs.create",{data:e.data})})},e.unconfirm=function(t){r.go("dashboard.jobs.create",{data:e.data})},e.alertNewOrg=function(){c.swal({title:"Organização",text:"Crie uma organização ",type:"input",inputPlaceholder:"Nome da Organização",html:!0,showCancelButton:!0,closeOnConfirm:!1,confirmButtonColor:"#28B5DF",confirmButtonText:"Cadastrar",showLoaderOnConfirm:!0},function(e){return e===!1?!1:void(e?i.create({NAME:e}).then(function(e){c.swal({title:"Success",text:"Organização Criada.",type:"success",confirmButtonColor:"#29B5DF"},function(){r.reload()})}):c.swal({title:"Concelled",text:"Nome da organização é obrigatorio",type:"error",confirmButtonColor:"#C1C1C1"}))})},0===e.orgs.length&&e.alertNewOrg()}function JobListController(e,t,r,o){e.filter=r.filter,e.filterTypes={"FULL-TIME":!0,"PART-TIME":!0,FREELANCE:!0,TEMPORARY:!0},o.findAll().then(function(t){e.jobs=t.data}),e.filterJobs=function(){t.go("jobs-list",{filter:e.filter},{notify:!1})},e.filterType=function(t){return e.filterTypes[t.job_type.NAME]}}function JobDashListController(e,t){e.toggle=function(t,r){return e.$parent.open==t?void(e.$parent.open=void 0):void(e.$parent.open=t)},e.active=function(e){t.active(e).then(function(e){})}}function JobShowController(e,t,r,o,n,a,i,l,s){function c(){e.currentUser&&(e.alreadyApplied=void 0!==l.result(l.find(e.currentUser.job_appliers,{JOB_ID:e.job.id}),"EMAIL"))}e.apply={};var u=i.data;e.job=u,e.job.DESCRIPTION=s(u.DESCRIPTION),e.url=u.id+"-"+t.title,e.tags=e.job.TAGS.join(", "),c(),e.toggle=function(){e.toggled=!0,o.isAuthenticated()&&(e.apply.NAME=e.currentUser.NAME,e.apply.EMAIL=e.currentUser.EMAIL),e.otherEmail=o.isAuthenticated()?!1:!0},e.other=function(){e.otherEmail=!0},e.applyJob=function(){a.apply(e.job,e.apply).then(function(){a.findById(e.job.id).then(function(t){e.job=t.data,e.toggled=!1,e.alreadyApplied=!0})})};try{n.twttr&&n.twttr.widgets.load(),n.FB&&(n.FB.init({appId:"162990964082513",status:!0,xfbml:!0,version:"v2.5"}),n.FB.XFBML.parse())}catch(d){console.log(d)}}function UrlFilter(e){return function(t){return e.replace(t).replace(/\s+/g,"-").replace(/\-+/g,"-").toLowerCase()}}function CategoryService(e){var t="api/categories";this.findAll=function(){return e.get(t)}}function JobService(e){var t="/api/jobs/";this.create=function(r){return e.post(t,r)},this.post=function(r){return e.post(t+"post",r)},this.findAll=function(){return e.get(t)},this.findById=function(r){return e.get(t+r)},this.findByTitle=function(r){return e.get(t+"title/"+r)},this.active=function(r){return e.post(t+r.id+"/active",r)},this.apply=function(r,o){return e.post(t+r.id+"/apply",o)},this.appliers=function(e){}}function MainController(e,t,r){e.setLang=function(e){r.changeLocale(e.toLowerCase()),t.use(e)},e.currentLang=function(){return t.use()}}function fallback(){function e(e,t){t.on("error",function(){t.attr("src","img/unknown.svg")})}return{restrict:"A",link:e}}function Interceptor(e,t,r,o){return{response:function(t){return 201!==t.status&&204!==t.status||/\/api\/jobs\/\d\/apply/.exec(t.config.url)||/\/api\/jobs\/post/.exec(t.config.url)||e.$broadcast("update-me"),t},responseError:function(n){var a=r.get("$translate"),i=n.data.message?n.data.message:n.data;return o.startsWith(i,"errorMessage")&&(i=a.instant(i)),401===n.status?(n.data.destroy===!0&&e.logout(),new NotificationFx({message:'<div class="ns-thumb"><img src="img/template.png"/></div><div class="ns-content"><span>'+i+"</span></div>",layout:"other",effect:"thumbslider",ttl:9e3,type:"notice"}),e.$broadcast("unauthorized"),t.reject(n)):400===n.status?(new NotificationFx({message:'<div class="ns-thumb"><img src="img/template.png"/></div><div class="ns-content"><span>'+i+"</span></div>",layout:"other",effect:"thumbslider",ttl:9e3,type:"notice"}),t.reject(n)):404===n.status?t.reject(n):n}}}function OrgController(e,t,r,o){function n(){t.transitionTo("dashboard.organization.list")}void 0!==t.params.OrgID&&r.findById(t.params.OrgID).then(function(t){e.org=t.data}),e.create=function(e){r.create(e).then(function(e){n()},function(e){console.log(e)})},e.edit=function(e){r.edit(e).then(function(e){n()},function(e){console.log(e)})},e["delete"]=function(e){o.swal({title:"Delete Organization",text:"Deseja deletar essa organização",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Sim, deletar!",cancelButtonText:"No",closeOnConfirm:!1,closeOnCancel:!1,showLoaderOnConfirm:!0},function(t){t?r["delete"](e).then(function(e){o.swal({title:"Deleted!",text:"Organização deletada.",type:"success",confirmButtonColor:"#29B5DF"},function(){n()})},function(e){console.log(e)}):o.swal({title:"Cancelled",type:"error",confirmButtonColor:"#C1C1C1"})})}}function OrgService(e){var t="api/organizations/";this.findAll=function(){return e.get(t)},this.findById=function(r){return e.get(t+r)},this.create=function(r){return e.post(t,r)},this.edit=function(r){return e.put(t+r.id,r)},this["delete"]=function(r){return e["delete"](t+r)}}function AuthController(e,t,r,o,n,a,i){t.data={},t.data.walletEnable=!0,n.isAuthenticated()&&r.transitionTo("dashboard.overview"),t.login=function(){n.login({EMAIL:t.email,PASSWORD:t.password}).then(function(e){t.authenticated=!0,"/auth/login"===o.location.pathname?o.location.href="/dashboard/overview":r.reload()})["catch"](function(e){t.authenticated=!1})},t.signup=function(e){n.signup({NAME:t.NAME,EMAIL:t.EMAIL,PASSWORD:t.PASSWORD,REPASSWORD:t.REPASSWORD})["catch"](function(e){console.log(e)})},t.verify=function(e){a.verify(e).then(function(e){setTimeout(function(){r.transitionTo("signin")},500)})["catch"](function(e){console.log(e)})},t.forgot=function(){a.forgot(t.data).then(function(e){setTimeout(function(){r.transitionTo("verify")},500)})["catch"](function(e){console.log(e)})},t.reset=function(e){t.data.token=e,a.reset(t.data).then(function(e){setTimeout(function(){o.location.href="/signin"},500)})["catch"](function(e){console.log(e)})},t.error=function(){var e="";t.form.$error.minlength&&(e="Passwords must be at least 8 characters."),i.swal({title:"Errors",type:"error",text:e,confirmButtonColor:"#C1C1C1"})}}function CVController(e,t){e.user=t.data}function FreelancerController(e,t){e.freelancers=t.data}function FreelancerService(e){this.findAll=function(){return e.get("/api/freelancer")},this.findById=function(t){return e.get("/api/freelancer/"+t)},this.getCV=function(t){return e.post("/api/freelancer/cv",t)}}function UserService(e){this.currentUser={},this.me=function(){return e.get("/me")},this.updateMe=function(t){return e.post("/me",t)},this.invite=function(t){return e.post("/invite",t)},this.verify=function(t){return e.post("/verify",t)},this.forgot=function(t){return e.post("/forgot",t)},this.reset=function(t){return e.post("/reset",t)}}function WalletService(e){this.createWallet=function(t){return e.post("/api/createwallet",{passphrase:t})},this.updateWallet=function(){return e.post("/api/updatewallet")}}angular.module("bitvagas",["ui.router","ngAnimate","pascalprecht.translate","angular-loading-bar","720kb.tooltips","ngTagsInput","satellizer","ngSanitize","ngLodash","ngCookies","ngInput","angularMoment","oitozero.ngSweetAlert","hc.marked","ja.qr","angucomplete-alt","updateMeta","bitvagas.main","bitvagas.jobs","bitvagas.org","bitvagas.users","bitvagas.dashboard"]).config(["$translateProvider",function(e){e.useStaticFilesLoader({prefix:"locales/",suffix:".json"}).addInterpolation("$translateMessageFormatInterpolation").preferredLanguage("pt-BR").fallbackLanguage(["pt-BR","en-US"]).useLocalStorage(),e.useMessageFormatInterpolation(),e.useSanitizeValueStrategy("escaped")}]).config(["lodash",function(e){e.mixin({selected:function(t,r){return e.result(e.find(t,{selected:!0}),r)}})}]).config(["$authProvider","$httpProvider",function(e,t){e.loginOnSignup=!0,e.loginUrl="/auth/login",e.loginRedirect="/dashboard/overview",e.signupUrl="/signup",e.signupRedirect="/signup/verify",e.linkedin({clientId:"78h4jk2ak53yof",url:"/auth/linkedin/callback"}),t.interceptors.push("Interceptor")}]).run(["$rootScope","$state","$auth","$window","$translate","UserService","amMoment",function(e,t,r,o,n,a,i){function l(){delete e.currentUser,o.localStorage.removeItem("currentUser")}i.changeLocale(n.use().toLowerCase()),e.$on("$stateChangeStart",function(n,a,i,s,c){a.authenticate&&r.isAuthenticated()===!1&&(n.preventDefault(),t.transitionTo("signin")),null!==o.localStorage.getItem("currentUser")&&null!==o.localStorage.getItem("satellizer_token")?e.currentUser=JSON.parse(decodeURIComponent(o.atob(o.localStorage.currentUser))):l()}),e.linkedIn=function(){r.authenticate("linkedin")},o.onload=function(){e.isAuthenticated()&&e.updateUser()},e.$on("unauthorized",function(){t.transitionTo("signin")}),e.$on("update-me",function(){e.updateUser()}),e.logout=function(){r.logout().then(function(){l()})},e.isAuthenticated=function(){return r.isAuthenticated()},e.updateUser=function(){a.me().then(function(t){o.localStorage.currentUser=o.btoa(encodeURIComponent(JSON.stringify(t.data))),e.currentUser=t.data})}}]),angular.module("bitvagas.dashboard",["bitvagas.dashboard.controllers"]).config(["$urlRouterProvider","$stateProvider",function(e,t){t.state("dashboard",{"abstract":!0,url:"/dashboard",templateUrl:"/modules/dashboard/views/dashboard",controller:"DashBoardController",authenticate:!0,resolve:{authenticated:["$rootScope","$q","UserService",function(e,t,r){var o=t.defer();return e.currentUser?o.resolve():r.me().then(function(t){e.updateUser(t),o.resolve()}),o.promise}]}}).state("dashboard.overview",{url:"/overview",authenticate:!0,views:{"":{templateUrl:"/modules/dashboard/views/overview",controller:"OverviewController"},"wallet@dashboard.overview":{templateUrl:"/modules/users/views/dashboard/wallet",controller:"WalletController"}}}).state("dashboard.profile",{url:"/profile",views:{"":{templateUrl:"/modules/users/views/dashboard/profile",controller:"ProfileController"},"change-password@dashboard.profile":{templateUrl:"/modules/users/views/dashboard/change-password"},"settings@dashboard.profile":{templateUrl:"/modules/users/views/dashboard/settings"}},authenticate:!0}).state("dashboard.cv",{url:"/cv",templateUrl:"/modules/users/views/dashboard/my-cv",authenticate:!0})}]),angular.module("bitvagas.escrow",["bitvagas.escrow.controllers","bitvagas.escrow.services"]).config(["$urlRouterProvider","$stateProvider",function(e,t){t.state("escrow",{url:"/escrow",templateUrl:"/modules/escrow/views/escrow-create",controller:"EscrowController"}).state("dispute",{url:"/escrow/:id/dispute",templateUrl:"/modules/escrow/views/dispute"})}]),angular.module("bitvagas.jobs",["ui.router","bitvagas.jobs.controllers","bitvagas.jobs.filters","bitvagas.jobs.services","bitvagas.jobs.category.services"]).config(["$urlRouterProvider","$stateProvider",function(e,t){t.state("jobs",{url:"/jobs",templateUrl:"/modules/jobs/views/job-list",controller:"JobListController"}).state("jobs-list",{url:"/jobs/list/:filter",templateUrl:"/modules/jobs/views/job-list",controller:"JobListController"}).state("jobs-post",{url:"/jobs/post",templateUrl:"/modules/jobs/views/job-post",resolve:{Categories:["CategoryService",function(e){return e.findAll()}]},params:{data:{},errors:[]},controller:"JobPostController"}).state("jobs-confirm",{url:"/jobs/create/confirm",templateUrl:"/modules/jobs/views/job-confirm",resolve:{Categories:["CategoryService",function(e){return e.findAll()}]},params:{data:{}},controller:"JobPostController"}).state("jobs-show",{url:"/{id: [0-9]+}-:title",templateUrl:"/modules/jobs/views/job-show",controller:"JobShowController",params:{id:void 0,title:void 0},caseInsensitiveMatch:!0,resolve:{Job:["$q","$state","$stateParams","JobService",function(e,t,r,o){var n=e.defer();return r.id?o.findById(r.id).then(function(e){return n.resolve(e)})["catch"](function(e){n.reject(e),t.transitionTo("jobs-list")}):t.transitionTo("jobs-list"),n.promise}]}}).state("dashboard.jobs",{url:"/jobs","abstract":!0,templateUrl:"/modules/jobs/views/dashboard/job-dashboard",authenticate:!0}).state("dashboard.jobs.list",{url:"/",templateUrl:"/modules/jobs/views/dashboard/job-dashboard-list",authenticate:!0,controller:"JobDashListController"}).state("dashboard.jobs.create",{url:"/create",templateUrl:"/modules/jobs/views/dashboard/job-dashboard-create",resolve:{Categories:["CategoryService",function(e){return e.findAll()}]},params:{data:{},errors:[]},controller:"JobCreateController",authenticate:!0}).state("dashboard.jobs.confirm",{url:"/create",templateUrl:"/modules/jobs/views/dashboard/job-confirm",resolve:{Categories:["CategoryService",function(e){return e.findAll()}]},params:{data:{}},controller:"JobCreateController",authenticate:!0})}]),angular.module("bitvagas.main",["bitvagas.main.factory","bitvagas.main.controllers","bitvagas.main.directives"]).config(["$urlRouterProvider","$stateProvider","$locationProvider",function(e,t,r){e.otherwise("/"),r.html5Mode(!0).hashPrefix("!"),t.state("index",{url:"/",views:{"":{templateUrl:"modules/main/views/index",controller:"JobListController"},"job-list@index":{templateUrl:"modules/jobs/views/job-list",controller:"JobListController"},"job-sidebar@index":{templateUrl:"modules/jobs/views/job-sidebar"}}}).state("about",{url:"/about",templateUrl:"modules/main/views/about"}).state("terms",{url:"/terms",templateUrl:"modules/main/views/terms"})}]),angular.module("bitvagas.org",["bitvagas.org.controllers","bitvagas.org.services"]).config(["$urlRouterProvider","$stateProvider",function(e,t){t.state("dashboard.organization",{url:"/organization","abstract":!0,templateUrl:"/modules/organizations/views/organizations",authenticate:!0}).state("dashboard.organization.list",{url:"/",templateUrl:"/modules/organizations/views/org.list",authenticate:!0,controller:"OrgController"}).state("dashboard.organization.create",{url:"/create",templateUrl:"/modules/organizations/views/org.create",authenticate:!0,controller:"OrgController"}).state("dashboard.organization.edit",{url:"/edit/:OrgID",templateUrl:"/modules/organizations/views/org.edit",authenticate:!0,controller:"OrgController"})}]),angular.module("bitvagas.users",["bitvagas.users.controllers","bitvagas.users.services"]).config(["$urlRouterProvider","$stateProvider",function(e,t){t.state("signup",{url:"/signup",views:{"":{templateUrl:"modules/users/views/signup",controller:"AuthController"},"signin@signup":{templateUrl:"modules/users/views/signin",controller:"AuthController"}}}).state("signin",{url:"/signin",templateUrl:"modules/users/views/signin",controller:"AuthController"}).state("verify",{url:"/signup/verify",templateUrl:"modules/users/views/verify-message"}).state("forgot",{url:"/forgot",templateUrl:"modules/users/views/forgot",controller:"AuthController"}).state("freelancers",{url:"/freelancers",templateUrl:"modules/users/views/freelancers",resolve:{freelancers:["FreelancerService",function(e){return e.findAll()}]},controller:"FreelancerController"}).state("freelancers-cv",{url:"/freelancers/:id",templateUrl:"modules/users/views/cv",controller:"CVController",resolve:{freelancer:["$q","$state","$stateParams","FreelancerService",function(e,t,r,o){var n=e.defer();return o.findById(r.id).then(function(e){return n.resolve(e)})["catch"](function(e){n.reject(e),t.transitionTo("freelancers")}),n.promise}]}})}]),angular.module("bitvagas.dashboard.controllers",[]).controller("DashBoardController",DashBoardController),DashBoardController.$inject=["$scope","$state","UserService"],angular.module("bitvagas.dashboard.controllers").controller("OverviewController",OverviewController),OverviewController.$inject=["$rootScope","$scope","lodash"],angular.module("bitvagas.dashboard.controllers").controller("ProfileController",ProfileController),ProfileController.$inject=["$rootScope","$scope","$state","UserService"],angular.module("bitvagas.dashboard.controllers").controller("WalletController",WalletController),WalletController.$inject=["$rootScope","$scope","$state","$compile","$timeout","WalletService","SweetAlert"],angular.module("bitvagas.admin.services",[]).factory("AuthenticationService",AuthenticationService),AuthenticationService.$inject=["$q","$http","$state"],angular.module("bitvagas.escrow.controllers",[]).controller("EscrowController",EscrowController),EscrowController.$inject=["$scope","$state","FreelancerService","EscrowService"],angular.module("bitvagas.escrow.services",[]).service("EscrowService",EscrowService),EscrowService.$inject=["$http"],angular.module("bitvagas.jobs.controllers",[]),angular.module("bitvagas.jobs.controllers",["pg-ng-dropdown"]).controller("JobPostController",JobPostController).controller("JobCreateController",JobCreateController),JobPostController.$inject=["$scope","$filter","$state","$stateParams","JobService","Categories","lodash","marked"],JobCreateController.$inject=["$scope","$filter","$state","$stateParams","$timeout","JobService","OrgService","Categories","lodash","SweetAlert","marked"],angular.module("bitvagas.jobs.controllers").controller("JobListController",JobListController),JobListController.$inject=["$scope","$state","$stateParams","JobService"],angular.module("bitvagas.jobs.controllers").controller("JobDashListController",JobDashListController),JobDashListController.$inject=["$scope","JobService"],angular.module("bitvagas.jobs.controllers").controller("JobShowController",JobShowController),JobShowController.$inject=["$scope","$stateParams","$state","$auth","$window","JobService","Job","lodash","marked"],angular.module("bitvagas.jobs.filters",["txx.diacritics"]).filter("UrlFilter",UrlFilter),UrlFilter.$inject=["removeDiacritics"],angular.module("bitvagas.jobs.category.services",[]).service("CategoryService",CategoryService),CategoryService.$inject=["$http"],angular.module("bitvagas.jobs.services",[]).service("JobService",JobService),JobService.$inject=["$http"],angular.module("bitvagas.main.controllers",[]).controller("MainController",MainController),MainController.$inject=["$scope","$translate","amMoment"],angular.module("bitvagas.main.directives",[]).directive("fallback",fallback),angular.module("bitvagas.main.factory",[]).factory("Interceptor",Interceptor),Interceptor.$inject=["$rootScope","$q","$injector","lodash"],angular.module("bitvagas.org.controllers",[]).controller("OrgController",OrgController),OrgController.$inject=["$scope","$state","OrgService","SweetAlert"],angular.module("bitvagas.org.services",[]).service("OrgService",OrgService),OrgService.$inject=["$http"],angular.module("bitvagas.users.controllers",[]).controller("AuthController",AuthController),AuthController.$inject=["$rootScope","$scope","$state","$window","$auth","UserService","SweetAlert"],angular.module("bitvagas.users.controllers").controller("FreelancerController",FreelancerController).controller("CVController",CVController),CVController.$inject=["$scope","freelancer"],FreelancerController.$inject=["$scope","freelancers"],angular.module("bitvagas.users.services",[]).service("FreelancerService",FreelancerService),FreelancerService.$inject=["$http"],angular.module("bitvagas.users.services").service("UserService",UserService),UserService.$inject=["$http"],angular.module("bitvagas.users.services").service("WalletService",WalletService),WalletService.$inject=["$http"];