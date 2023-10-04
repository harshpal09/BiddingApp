"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3683],{93683:function(e,a,n){n.d(a,{Z:function(){return w}});var s=n(21722),t=n(39324),r=n(22830),i=n(75883),l=n(35250),o=n(9181),c=n.n(o),d=n(60554),u=n(70079),p=n(1454),m=n(70671),f=n(32004),g=n(94968),x=n(50795),b=n(82081),h=n(99486),v=n(78931),y=n(88798),A=n(56817),j=n(96175),C=n(19350),P=n(51061);function w(e){var a=e.isOpen,n=e.onClose,o=(0,m.Z)(),g=(0,v.hz)(),w=(0,r._)((0,u.useState)(!1),2),N=w[0],T=w[1],M=(0,d.useRouter)(),k=(0,u.useCallback)(function(){x.o.logEvent(b.a.closeAccountPaymentModal),n()},[n]),I=(0,u.useCallback)((0,s._)(function(){var e;return(0,i.Jh)(this,function(a){switch(a.label){case 0:T(!0),x.o.logEvent(b.a.clickAccountPaymentCheckout),a.label=1;case 1:return a.trys.push([1,3,4,5]),[4,h.ZP.getCheckoutLink()];case 2:return e=a.sent(),M.push(e.url),[3,5];case 3:return a.sent(),y.m.warning(o.formatMessage(S.paymentErrorWarning),{hasCloseButton:!0}),[3,5];case 4:return T(!1),[7];case 5:return[2]}})}),[o,M]),_=(0,u.useCallback)((0,s._)(function(){var e;return(0,i.Jh)(this,function(a){switch(a.label){case 0:T(!0),x.o.logEvent(b.a.clickAccountCustomerPortal),a.label=1;case 1:return a.trys.push([1,3,4,5]),[4,h.ZP.fetchCustomerPortalUrl()];case 2:return e=a.sent(),M.push(e.url),[3,5];case 3:return a.sent(),y.m.warning(o.formatMessage(S.accountErrorWarning),{hasCloseButton:!0}),[3,5];case 4:return T(!1),[7];case 5:return[2]}})}),[o,M]),Z=(0,u.useCallback)(function(){x.o.logEvent(b.a.clickAccountPaymentGetHelp)},[]),E=(0,v.YD)(),D=g.has("disable_upgrade_ui");return(0,l.jsxs)(j.x,{isOpen:a,onClose:n,children:[(0,l.jsxs)("div",{className:"flex w-full flex-row items-center justify-between border-b px-4 py-3 dark:border-gray-700",children:[(0,l.jsx)("span",{className:"text-base font-semibold sm:text-base",children:(0,l.jsx)(f.Z,(0,t._)({},S.modalTitle))}),(0,l.jsx)("button",{className:"text-gray-700 opacity-50 transition hover:opacity-75 dark:text-white",onClick:k,children:(0,l.jsx)(p.q5L,{className:"h-6 w-6"})})]}),(0,l.jsxs)("div",{className:"grid sm:grid-cols-2",children:[(0,l.jsx)("div",{className:"relative order-2 col-span-1 border-r-0 border-t dark:border-gray-700 sm:order-1 sm:border-r sm:border-t-0",children:(0,l.jsx)(C.Oi,{rowElements:[(0,l.jsx)(C.Cu,{text:P.S.free.name},"row-free-plan-name"),(0,l.jsx)(C.hi,{variant:"disabled",disabled:!0,text:P.S.free.callToAction.active},"row-free-plan-button"),(0,l.jsx)(C.G,{variant:"secondary",text:P.S.free.demandAccess},"row-free-plan-demand"),(0,l.jsx)(C.G,{variant:"secondary",text:P.S.free.responseSpeed},"row-free-plan-speed"),(0,l.jsx)(C.G,{className:"sm:pb-2",variant:"secondary",text:P.S.free.modelFeatures},"row-free-plan-updates")]})}),(0,l.jsx)("div",{className:"relative order-1 col-span-1 sm:order-2",children:(0,l.jsx)(C.Oi,{rowElements:[(0,l.jsx)(C.Cu,{text:P.S.plus.name,children:(0,l.jsx)("span",{className:"font-semibold text-gray-500",children:(0,l.jsx)(f.Z,(0,t._)({},P.S.plus.costInDollars))})},"row-plus-plan-title"),(0,l.jsx)(C.hi,{variant:"primary",disabledText:D?o.formatMessage(S.highDemandDisabledText):"",disabled:N,isLoading:N,onClick:I,text:P.S.plus.callToAction.inactivePayment},"row-plus-plan-button"),(0,l.jsx)(C.G,{variant:"primary",text:P.S.plus.demandAccess},"row-plus-plan-demand"),(0,l.jsx)(C.G,{variant:"primary",text:P.S.plus.responseSpeed},"row-plus-plan-speed"),(0,l.jsx)(C.G,{className:"sm:pb-2",variant:"primary",text:P.S.plus.modelFeatures},"row-plus-plan-updates"),E&&(0,l.jsx)(C.nR,{className:"sm:pb-1",isLoading:N,text:P.S.manageSubscriptionWeb.callToAction,onClick:_},"row-plus-plan-manage"),(0,l.jsx)(c(),{target:"_blank",href:A.ti,onClick:Z,passHref:!0,children:(0,l.jsx)(C.nR,{className:"sm:pb-1",isLoading:!1,isTextOnly:!0,text:P.S.getHelp.callToAction},"row-plus-plan-help")},"row-plus-plan-help-link")]})})]})]})}var S=(0,g.vU)({paymentErrorWarning:{id:"AccountPaymentModal.paymentErrorWarning",description:"Error toast when payment page has an error",defaultMessage:"The payments page encountered an error. Please try again. If the problem continues, please visit help.openai.com."},accountErrorWarning:{id:"AccountPaymentModal.accountErrorWarning",description:"Error toast when account page has an error",defaultMessage:"The account management page encountered an error. Please try again. If the problem continues, please visit help.openai.com."},modalTitle:{id:"AccountPaymentModal.modalTitle",description:"Title for the payment page modal",defaultMessage:"Your plan"},highDemandDisabledText:{id:"AccountPaymentModal.highDemandDisabledText",description:"Message shown when demand is too high and payments are disabled",defaultMessage:"Due to high demand, we've temporarily paused upgrades."}})},96175:function(e,a,n){n.d(a,{x:function(){return o}});var s=n(4337),t=n(35250),r=n(21389),i=n(89368);function l(){var e=(0,s._)(["flex grow justify-center bg-white dark:bg-gray-900 rounded-md flex-col items-start overflow-hidden border shadow-md dark:border-gray-700"]);return l=function(){return e},e}var o=function(e){var a=e.children,n=e.isOpen,s=e.onClose;return(0,t.jsx)(i.Z,{size:"fullscreen",isOpen:n,onClose:s,type:"success",className:"!bg-transparent !shadow-none md:w-[672px] lg:w-[896px] xl:w-[1024px]",children:(0,t.jsx)("div",{className:"focus-none flex h-full flex-col items-center justify-start outline-none",children:(0,t.jsx)("div",{className:"relative",children:(0,t.jsx)(c,{children:a})})})})},c=r.Z.div(l())},19350:function(e,a,n){n.d(a,{Cu:function(){return v},G:function(){return j},Oi:function(){return h},hi:function(){return A},nR:function(){return C}});var s=n(39324),t=n(4337),r=n(35250),i=n(19841),l=n(61888),o=n(70079),c=n(1454),d=n(32004),u=n(21389),p=n(67273),m=n(45635),f=n(88327);function g(){var e=(0,t._)(["p-4 flex flex-col gap-3 bg-white z-20 relative dark:bg-gray-900"]);return g=function(){return e},e}function x(){var e=(0,t._)(["gap-2 flex flex-row justify-start text-sm items-start"]);return x=function(){return e},e}function b(){var e=(0,t._)(["text-xl font-semibold justify-between items-center flex"]);return b=function(){return e},e}var h=function(e){var a=e.rowElements;return(0,r.jsx)(P,{children:a.map(function(e){return e})})},v=function(e){var a=e.className,n=e.text,t=e.children;return(0,r.jsxs)(S,{className:a,children:[(0,r.jsx)(d.Z,(0,s._)({},n)),t]})},y={"primary-disabled":"border-none bg-gray-200 py-3 font-semibold hover:bg-gray-200",primary:"border-none py-3 font-semibold",disabled:"dark:text-gray-white border-none bg-gray-300 py-3 font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-500 dark:opacity-100"},A=(0,o.forwardRef)(function(e,a){var n=e.isLoading,t=void 0!==n&&n,l=e.disabled,o=e.onClick,u=e.variant,g=void 0===u?"primary":u,x=e.text,b=e.disabledText;return""!==b&&null!=b?(0,r.jsx)("div",{className:"relative",children:(0,r.jsx)(m.u,{side:"bottom",sideOffset:20,label:b,usePortal:!1,children:(0,r.jsxs)(p.z,{ref:a,as:"button",color:"disabled",className:(0,i.default)("w-full",y[g]),children:[(0,r.jsx)(d.Z,(0,s._)({},x)),t&&(0,r.jsx)(f.ZP,{className:"animate-spin",icon:c.dAq})]})})}):(0,r.jsxs)(p.z,{disabled:void 0!==l&&l,onClick:o,ref:a,as:"button",className:(0,i.default)(y[g]),children:[(0,r.jsx)("span",{className:(0,i.default)("inline-block",{"text-gray-700":"primary-disabled"===g,"text-white":"primary"===g}),children:(0,r.jsx)(d.Z,(0,s._)({},x))}),t&&(0,r.jsx)(f.ZP,{className:"animate-spin",icon:c.dAq})]})});A.displayName="PricingPlanButton";var j=function(e){var a=e.variant,n=void 0===a?"primary":a,t=e.className,l=e.text;return(0,r.jsxs)(w,{className:t,children:[(0,r.jsx)(f.ZP,{icon:c._rq,className:(0,i.default)("h-5 w-5",{"text-green-700":"primary"==n,"text-gray-400":"secondary"==n})}),(0,r.jsx)("span",{className:"max-w-[250px]",children:(0,r.jsx)(d.Z,(0,s._)({},l))})]})},C=function(e){var a=e.className,n=e.text,t=e.isLoading,i=e.isTextOnly,u=e.onClick,p=void 0===u?l.noop:u,m="flex flex-row items-center space-x-1 underline",g=(0,o.useMemo)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.Z,(0,s._)({},n)),t&&(0,r.jsx)(f.ZP,{className:"animate-spin",icon:c.dAq})]})},[t,n]);return(0,r.jsx)(w,{className:a,children:void 0!==i&&i?(0,r.jsx)("div",{className:m,children:g}):(0,r.jsx)("button",{onClick:p,className:m,children:g})})},P=u.Z.div(g()),w=u.Z.div(x()),S=u.Z.div(b())},51061:function(e,a,n){n.d(a,{S:function(){return t}});var s=(0,n(94968).vU)({freeName:{id:"pricingPlanConstants.free.name",defaultMessage:"Free plan",description:"Name of the free pricing plan"},freeActive:{id:"pricingPlanConstants.free.callToAction.active",defaultMessage:"Your current plan",description:"Active call to action for free plan"},freeInactive:{id:"pricingPlanConstants.free.callToAction.inactive",defaultMessage:"Your current plan",description:"Inactive call to action for free plan"},freeCost:{id:"pricingPlanConstants.free.costInDollars",defaultMessage:" ",description:"Cost for free plan"},freeAccess:{id:"pricingPlanConstants.free.demandAccess",defaultMessage:"Access to our GPT-3.5 model",description:"Access rights for free plan"},freeSpeed:{id:"pricingPlanConstants.free.responseSpeed",defaultMessage:"Standard response speed",description:"Response speed for free plan"},freeFeatures:{id:"pricingPlanConstants.free.modelFeatures",defaultMessage:"Regular model updates",description:"Model features for free plan"},plusName:{id:"pricingPlanConstants.plus.name",defaultMessage:"ChatGPT Plus",description:"Name of the ChatGPT Plus pricing plan"},plusActive:{id:"pricingPlanConstants.plus.callToAction.active",defaultMessage:"Your current plan",description:"Active call to action for plus plan"},plusInactive:{id:"pricingPlanConstants.plus.callToAction.inactive",defaultMessage:"I'm interested",description:"Inactive call to action for plus plan"},plusInactivePayment:{id:"pricingPlanConstants.plus.callToAction.inactivePayment",defaultMessage:"Upgrade to Plus",description:"Inactive payment call to action for plus plan"},plusCost:{id:"pricingPlanConstants.plus.costInDollars",defaultMessage:"USD $20/mo",description:"Cost for plus plan"},plusAccess:{id:"pricingPlanConstants.plus.demandAccess",defaultMessage:"Access to GPT-4, our most capable model",description:"Access rights for plus plan"},plusSpeed:{id:"pricingPlanConstants.plus.responseSpeed",defaultMessage:"Faster response speed",description:"Response speed for plus plan"},plusFeatures:{id:"pricingPlanConstants.plus.modelFeatures",defaultMessage:"Exclusive access to beta features like Browsing, Plugins, and Advanced Data Analysis",description:"Model features for plus plan"},manageSubscriptionWeb:{id:"pricingPlanConstants.manageSubscriptionWeb.callToAction",defaultMessage:"Manage my subscription",description:"Web subscription management"},manageSubscriptionIos:{id:"pricingPlanConstants.manageSubscriptionIos.callToAction",defaultMessage:"Manage my subscription in the ChatGPT iOS app",description:"iOS subscription management"},manageSubscriptionAndroid:{id:"pricingPlanConstants.manageSubscriptionAndroid.callToAction",defaultMessage:"Manage my subscription in the ChatGPT Android app",description:"Android subscription management"},getHelp:{id:"pricingPlanConstants.getHelp.callToAction",defaultMessage:"I need help with a billing issue",description:"Help for billing issues"},business:{id:"pricingPlanConstants.business.callToAction",defaultMessage:"Buy for my team",description:"Business purchase call to action"}}),t={free:{name:s.freeName,callToAction:{active:s.freeActive,inactive:s.freeInactive},costInDollars:s.freeCost,demandAccess:s.freeAccess,responseSpeed:s.freeSpeed,modelFeatures:s.freeFeatures},plus:{name:s.plusName,callToAction:{active:s.plusActive,inactive:s.plusInactive,inactivePayment:s.plusInactivePayment},costInDollars:s.plusCost,demandAccess:s.plusAccess,responseSpeed:s.plusSpeed,modelFeatures:s.plusFeatures},manageSubscriptionWeb:{callToAction:s.manageSubscriptionWeb},manageSubscriptionIos:{callToAction:s.manageSubscriptionIos},manageSubscriptionAndroid:{callToAction:s.manageSubscriptionAndroid},getHelp:{callToAction:s.getHelp},business:{callToAction:s.business}}}}]);