import{j as q,k as ce,r as v,A as me,l as pe,B as k,a1 as fe,$ as ge,aD as he,w as ve,ay as T,v as _e,aF as R,a2 as o,aa as y,a6 as m,a5 as n,a4 as a,aG as K,a3 as g,ad as V,a9 as _,ac as M,af as B,a7 as b,ae as w,aP as j,a as Ce,H as ye,ak as X,ai as E,ah as I,ab as z}from"./index.c97da185.js";import{b as J,Q as Y}from"./QDialog.d42c9718.js";import{_ as A,b as O,Q as F}from"./QCardSection.3bdf9a7a.js";import{Q as U}from"./QInput.9d3d625c.js";import{Q as be}from"./QFile.3a1fda0e.js";import{Q as xe}from"./QSelect.2b0028e2.js";import{Q as Z}from"./QForm.2ebf8009.js";import{Q as $}from"./QCardActions.ba5cce65.js";import{b as ee,a as we}from"./axios.3d912423.js";import{b as ke,c as Me,d as Se,e as De,f as qe}from"./enterprises.hooks.505d1084.js";import{Q as Ee}from"./QMarkupTable.915e59d6.js";import{u as Oe,a as Ve,T as Ne,b as Qe}from"./TableDocuments.a9f8b6fe.js";import{Q as ze}from"./QCheckbox.337e149d.js";import{C as Ae}from"./ClosePopup.e72f02d5.js";import{V as te}from"./ValidDeleteMenu.6c00e83b.js";import"./QChip.ba98e3ca.js";import"./format.a8cdc0f5.js";import"./QItemLabel.bcb8e9f7.js";import"./user.store.7bf26499.js";import"./pinia.485b638e.js";const Le={ratio:[String,Number]};function Ue(r,t){return q(()=>{const l=Number(r.ratio||(t!==void 0?t.value:void 0));return isNaN(l)!==!0&&l>0?{paddingBottom:`${100/l}%`}:null})}const He=1.7778;var Te=ce({name:"QImg",props:{...Le,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:He},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(r,{slots:t,emit:l}){const e=v(r.initialRatio),c=Ue(r,e),f=_e(),{registerTimeout:u,removeTimeout:p}=J(),{registerTimeout:s,removeTimeout:i}=J(),h=q(()=>r.placeholderSrc!==void 0?{src:r.placeholderSrc}:null),S=q(()=>r.errorSrc!==void 0?{src:r.errorSrc,__qerror:!0}:null),C=[v(null),v(h.value)],x=v(0),N=v(!1),Q=v(!1),P=q(()=>`q-img q-img--${r.noNativeMenu===!0?"no-":""}menu`),ae=q(()=>({width:r.width,height:r.height})),ne=q(()=>`q-img__image ${r.imgClass!==void 0?r.imgClass+" ":""}q-img__image--with${r.noTransition===!0?"out":""}-transition q-img__image--`),le=q(()=>({...r.imgStyle,objectFit:r.fit,objectPosition:r.position}));function oe(){if(i(),r.loadingShowDelay===0){N.value=!0;return}s(()=>{N.value=!0},r.loadingShowDelay)}function H(){i(),N.value=!1}function se({target:d}){T(f)===!1&&(p(),e.value=d.naturalHeight===0?.5:d.naturalWidth/d.naturalHeight,G(d,1))}function G(d,D){D===1e3||T(f)===!0||(d.complete===!0?ie(d):u(()=>{G(d,D+1)},50))}function ie(d){T(f)!==!0&&(x.value=x.value^1,C[x.value].value=null,H(),d.getAttribute("__qerror")!=="true"&&(Q.value=!1),l("load",d.currentSrc||d.src))}function de(d){p(),H(),Q.value=!0,C[x.value].value=S.value,C[x.value^1].value=h.value,l("error",d)}function W(d){const D=C[d].value,L={key:"img_"+d,class:ne.value,style:le.value,alt:r.alt,crossorigin:r.crossorigin,decoding:r.decoding,referrerpolicy:r.referrerpolicy,height:r.height,width:r.width,loading:r.loading,fetchpriority:r.fetchpriority,"aria-hidden":"true",draggable:r.draggable,...D};return x.value===d?Object.assign(L,{class:L.class+"current",onLoad:se,onError:de}):L.class+="loaded",k("div",{class:"q-img__container absolute-full",key:"img"+d},k("img",L))}function ue(){return N.value===!1?k("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},ge(t[Q.value===!0?"error":"default"])):k("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():r.noSpinner===!0?void 0:[k(he,{color:r.spinnerColor,size:r.spinnerSize})])}{let d=function(){ve(()=>r.src||r.srcset||r.sizes?{src:r.src,srcset:r.srcset,sizes:r.sizes}:null,D=>{p(),Q.value=!1,D===null?(H(),C[x.value^1].value=h.value):oe(),C[x.value].value=D},{immediate:!0})};me.value===!0?pe(d):d()}return()=>{const d=[];return c.value!==null&&d.push(k("div",{key:"filler",style:c.value})),C[0].value!==null&&d.push(W(0)),C[1].value!==null&&d.push(W(1)),d.push(k(fe,{name:"q-transition--fade"},ue)),k("div",{key:"main",class:P.value,style:ae.value,role:"img","aria-label":r.alt},d)}}});const Re={props:{show:{type:Boolean,required:!0},enterprise:{required:!0}},setup(r,{emit:t}){const l=R(r,"show"),e=R(r,"enterprise"),c=v(null),f=v(null),u=v(!0),p=v(null);ee.get("users",{params:{rol:"users_enterprise"}}).then(h=>{u.value=!1,p.value=h.data.users});const s=()=>t("handleCloseMenuEditEnterprise");return{show:l,handleClose:s,enterprise:e,error_edit:c,handleUpdateEnterprise:async()=>{const{isError:h,error:S,enterprise:C}=await ke(e.value.slug,{...e.value,image:f.value});h.value?c.value=S.value:(e.value.image=C.value.image,s())},isLoadingUser:u,image:f,users:p}}},Be={class:"q-pa-xs bg-negative text-white"},Ie={class:"q-pa-xs bg-negative text-white"},je={key:0};function Fe(r,t,l,e,c,f){return o(),y(Y,{modelValue:e.show,"onUpdate:modelValue":t[3]||(t[3]=u=>e.show=u)},{default:m(()=>[n(F,{style:{width:"900px"}},{default:m(()=>[n(O,null,{default:m(()=>t[4]||(t[4]=[a("div",{class:"text-h6"},"Menu Edit Empresa",-1)])),_:1}),e.enterprise?(o(),y(O,{key:0,class:"q-pt-none"},{default:m(()=>[n(Z,{onSubmit:K(e.handleUpdateEnterprise,["prevent"])},{default:m(()=>{var u,p;return[n(U,{name:"nombre",required:"",label:"nombre",modelValue:e.enterprise.name,"onUpdate:modelValue":t[0]||(t[0]=s=>e.enterprise.name=s)},null,8,["modelValue"]),(o(!0),g(M,null,V((u=e.error_edit)==null?void 0:u.nombre,(s,i)=>(o(),g("div",{key:i,class:"q-mt-sm"},[a("span",Be,_(s),1)]))),128)),n(be,{color:"teal",filled:"",label:"image",modelValue:e.image,"onUpdate:modelValue":t[1]||(t[1]=s=>e.image=s)},{prepend:m(()=>[n(B,{name:"cloud_upload"})]),_:1},8,["modelValue"]),(o(!0),g(M,null,V((p=e.error_edit)==null?void 0:p.image,(s,i)=>(o(),g("div",{key:i,class:"q-mt-sm"},[a("span",Ie,_(s),1)]))),128)),e.isLoadingUser?(o(),g("p",je,"loading...")):(o(),y(xe,{key:1,modelValue:e.enterprise.user,"onUpdate:modelValue":t[2]||(t[2]=s=>e.enterprise.user=s),required:"","option-label":"email",options:e.users,label:"Usuarios"},null,8,["modelValue","options"])),n(b,{label:"Editar",class:"q-mt-md q-mr-sm",type:"submit",color:"primary"})]}),_:1},8,["onSubmit"])]),_:1})):w("",!0),n($,{align:"right"},{default:m(()=>[n(b,{flat:"",label:"Cerrar",color:"primary",onClick:e.handleClose},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])}var Pe=A(Re,[["render",Fe],["__scopeId","data-v-b99d61b4"]]);const Ge={props:{show:{type:Boolean,required:!0}},setup(r,{emit:t}){const l=R(r,"show"),{params:e}=j(),c=Ce({ci:"",name:"",authorized:!1,role_description:null}),f=v(null),u=()=>{t("handleCloseCreateOperator")};return{dataCreateOperator:c,handleCreateOperator:()=>{ee.post(`enterprises/${e.slug}/operators`,c).then(()=>{u()}).catch(s=>{if(console.log(s),s.response.status===422){const i=s.response.data.errors;f.value=i}})},show:l,handleCloseCreateOperator:u,error_create:f}}},We={style:{},class:"q-pa-xs bg-negative text-white"},Je={style:{},class:"q-pa-xs bg-negative text-white"},Ke={style:{},class:"q-pa-xs bg-negative text-white"};function Xe(r,t,l,e,c,f){return o(),y(Y,{modelValue:e.show,"onUpdate:modelValue":t[4]||(t[4]=u=>e.show=u)},{default:m(()=>[n(F,{style:{width:"900px"}},{default:m(()=>[n(O,null,{default:m(()=>t[5]||(t[5]=[a("div",{class:"text-h6"},"Crear operador",-1)])),_:1}),n(O,{class:"q-pt-none"},{default:m(()=>[n(Z,{onSubmit:K(e.handleCreateOperator,["prevent"])},{default:m(()=>{var u,p,s;return[n(U,{name:"C\xE9dula",required:"",label:"C\xE9dula",modelValue:e.dataCreateOperator.ci,"onUpdate:modelValue":t[0]||(t[0]=i=>e.dataCreateOperator.ci=i)},null,8,["modelValue"]),(o(!0),g(M,null,V((u=e.error_create)==null?void 0:u.ci,(i,h)=>(o(),g("div",{key:h,class:"q-mt-sm"},[a("span",We,_(i),1)]))),128)),n(U,{name:"Nombre",required:"",label:"Nombre",modelValue:e.dataCreateOperator.name,"onUpdate:modelValue":t[1]||(t[1]=i=>e.dataCreateOperator.name=i)},null,8,["modelValue"]),(o(!0),g(M,null,V((p=e.error_create)==null?void 0:p.nombre,(i,h)=>(o(),g("div",{key:h,class:"q-mt-sm"},[a("span",Je,_(i),1)]))),128)),n(ze,{label:"Autorizado",modelValue:e.dataCreateOperator.authorized,"onUpdate:modelValue":t[2]||(t[2]=i=>e.dataCreateOperator.authorized=i)},null,8,["modelValue"]),n(U,{name:"Cargo",required:"",label:"Cargo",modelValue:e.dataCreateOperator.role_description,"onUpdate:modelValue":t[3]||(t[3]=i=>e.dataCreateOperator.role_description=i)},null,8,["modelValue"]),(o(!0),g(M,null,V((s=e.error_create)==null?void 0:s.authorize,(i,h)=>(o(),g("div",{key:h,class:"q-mt-sm"},[a("span",Ke,_(i),1)]))),128)),n(b,{label:"Crear",class:"q-mt-md",type:"submit",color:"primary"})]}),_:1},8,["onSubmit"])]),_:1}),n($,{align:"right"},{default:m(()=>[ye(n(b,{flat:"",label:"Cerrar",color:"primary",onClick:e.handleCloseCreateOperator},null,8,["onClick"]),[[Ae]])]),_:1})]),_:1})]),_:1},8,["modelValue"])}var re=A(Ge,[["render",Xe]]);const Ye={components:{ValidDeleteMenu:te},props:{operator:{type:Object,required:!0}},setup(r,{emit:t}){const l=X(),{params:e}=j(),c=v(!1);return{handleClickOperator:()=>{l.push({name:"operators-detail",params:{pk:r.operator.id,enterprise:e.slug}})},handleDeleteMenuOpen:i=>{i.stopPropagation(),c.value=!0},handleDeleteMenuClose:()=>c.value=!1,handleDeleteMenuAccept:async()=>{c.value=!1,await Oe(e.slug,r.operator.id),t("refetch")},validDeleteMenu:c}}},Ze={class:"text-left"},$e={class:"text-left"},et={class:"text-left"},tt={class:"text-left"},rt={class:"text-center"};function at(r,t,l,e,c,f){const u=E("ValidDeleteMenu");return o(),g(M,null,[e.validDeleteMenu?(o(),y(u,{key:0,show:e.validDeleteMenu,onHandleDeleteMenuClose:e.handleDeleteMenuClose,onHandleDeleteMenuAccept:e.handleDeleteMenuAccept},null,8,["show","onHandleDeleteMenuClose","onHandleDeleteMenuAccept"])):w("",!0),a("tr",{class:I(`${l.operator.is_valid?"":"bg-grey-4"} cursor-pointer`),onClick:t[0]||(t[0]=()=>e.handleClickOperator())},[a("td",Ze,_(l.operator.ci),1),a("td",$e,_(l.operator.name),1),a("td",et,[a("p",{class:I(l.operator.is_valid?"text-green":"text-red")},_(l.operator.is_valid?"Autorizado":"No Autorizado"),3)]),a("td",tt,_(l.operator.cargo)+" hola",1),a("td",rt,[n(b,{type:"button",onClick:e.handleDeleteMenuOpen,class:"text-h5 text-negative"},{default:m(()=>t[1]||(t[1]=[a("span",{class:"mdi mdi-trash-can"},null,-1)])),_:1},8,["onClick"])])],2)],64)}var nt=A(Ye,[["render",at]]);const lt={components:{MenuCreateOperator:re,OperatorItem:nt},props:{enterprise:{type:String,required:!0}},setup(r){const{operators:t,isLoading:l,refetch:e}=Ve(r.enterprise),c=v(!1);return{operators:t,createOperator:c,handleOpenCreateOperator:()=>{c.value=!0},handleCloseCreateOperator:()=>{c.value=!1,e()},refetch:e,isLoading:l}}},ot={class:"flex justify-between items-center q-my-md"};function st(r,t,l,e,c,f){const u=E("MenuCreateOperator"),p=E("operator-item");return o(),g(M,null,[e.createOperator?(o(),y(u,{key:0,show:e.createOperator,onHandleCloseCreateOperator:e.handleCloseCreateOperator},null,8,["show","onHandleCloseCreateOperator"])):w("",!0),a("div",ot,[t[0]||(t[0]=a("h4",{class:"text-h4 q-my-none"},"Operarios:",-1)),n(b,{label:"Crear Operario",class:"q-mt-md q-mr-sm",type:"button",color:"primary",onClick:e.handleOpenCreateOperator},null,8,["onClick"])]),n(Ee,{flat:"",bordered:""},{default:m(()=>[t[1]||(t[1]=a("thead",{class:"bg-dark text-white"},[a("tr",null,[a("th",{class:"text-left"},"C.I."),a("th",{class:"text-left"},"Nombre"),a("th",{class:"text-left"},"Autorizaci\xF3n"),a("th",{class:"text-left"},"Cargo"),a("th",{class:"text-center"},"Acciones")])],-1)),a("tbody",{class:I(r.$q.dark.isActive?"bg-grey-91973-08-07 00:00:00":"bg-grey-3")},[(o(!0),g(M,null,V(e.operators,s=>(o(),y(p,{key:s.id,operator:s,onRefetch:e.refetch},null,8,["operator","onRefetch"]))),128))],2)]),_:1})],64)}var it=A(lt,[["render",st]]);const dt={components:{EditEnterprise:Pe,MenuCreateOperator:re,TableDocuments:Ne,OperatorsList:it,ValidDeleteEnterpriseMenu:te},setup(){const r=X(),t=j(),{params:l}=t,{enterprise:e,isLoading:c,refetch:f}=Me(l.slug),{documents:u,isLoading:p,refetch:s}=Qe(l.slug),i=v(!1),h=v(!1),S=v(!1);return{isLoading:c&&p,enterprise:e,documents:u,isLoadingDocuments:p,refetchDocuments:s,showDeleteMenu:S,enterpriseNoExiste:i,handleDeleteMenuClose:()=>S.value=!1,handleDeleteMenuAccept:async()=>{S.value=!1,await Se(l.slug),r.push({name:"enterprises"})},api_base_backend:we,enterpriseEditMenu:h,handleCloseMenuEditEnterprise:()=>{h.value=!1,f()},handleNotValidEnterprise:async()=>{await De(l.slug),f()},handleValidEnterprise:async()=>{await qe(l.slug),f()}}}},ut={style:{"margin-left":"20px"}},ct={key:1},mt={class:"absolute-full text-subtitle2 flex flex-center"},pt={class:"text-h4"},ft={class:"absolute-full text-subtitle2 flex flex-center"},gt={class:"text-h4"},ht={class:"row justify-between"},vt={class:"text-caption"},_t={class:"text-grey row items-center"},Ct={class:"flex justify-left items-center q-mt-md w-full"},yt={key:0,style:{width:"400px"}},bt={key:2,class:"text-center"},xt={key:3,class:"row justify-center"},wt={class:"text-h4 column"};function kt(r,t,l,e,c,f){const u=E("valid-delete-enterprise-menu"),p=E("edit-enterprise"),s=E("operators-list"),i=E("table-documents");return o(),g("div",ut,[e.showDeleteMenu?(o(),y(u,{key:0,show:e.showDeleteMenu,onHandleDeleteMenuClose:e.handleDeleteMenuClose,onHandleDeleteMenuAccept:e.handleDeleteMenuAccept},null,8,["show","onHandleDeleteMenuClose","onHandleDeleteMenuAccept"])):w("",!0),e.isLoading?w("",!0):(o(),g("div",ct,[n(Te,{src:`${e.api_base_backend}/${e.enterprise.image}`,alt:"esta enterprise no pose imagen",style:{height:"350px"},fit:r.cover},{error:m(()=>[a("div",mt,[a("h4",pt,_(e.enterprise.name),1)])]),default:m(()=>[a("div",ft,[a("h4",gt,_(e.enterprise.name),1)])]),_:1},8,["src","fit"]),a("div",ht,[a("div",vt,[a("div",_t,[z(_(e.enterprise.is_valid?"Verificado":"No verificado")+" ",1),n(B,{name:e.enterprise.is_valid?"check_circle":"cancel",color:e.enterprise.is_valid?"green":"red",size:"30px"},null,8,["name","color"]),n(O,{class:"q-pt-none q-px-none q-ml-sm"},{default:m(()=>[a("div",Ct,[n(b,{label:"Editar",type:"button",class:"q-mr-sm",color:"primary",onClick:t[0]||(t[0]=h=>e.enterpriseEditMenu=!0)}),e.enterpriseEditMenu?(o(),y(p,{key:0,enterprise:e.enterprise,show:e.enterpriseEditMenu,onHandleCloseMenuEditEnterprise:e.handleCloseMenuEditEnterprise},null,8,["enterprise","show","onHandleCloseMenuEditEnterprise"])):w("",!0),e.enterprise.is_valid?(o(),y(b,{key:1,label:"Desvalidar",type:"button",color:"negative",onClick:e.handleNotValidEnterprise},null,8,["onClick"])):(o(),y(b,{key:2,label:"Validar",type:"button",color:"secondary",onClick:e.handleValidEnterprise},null,8,["onClick"])),n(b,{type:"button",class:"text-lg text-negative q-ml-md",onClick:t[1]||(t[1]=()=>{e.showDeleteMenu=!0})},{default:m(()=>t[2]||(t[2]=[z(" Eliminar "),a("span",{class:"mdi mdi-trash-can"},null,-1)])),_:1})])]),_:1})])]),e.enterprise.user?(o(),g("div",yt,[t[3]||(t[3]=a("h5",{class:"text-h5 q-my-none"},"Encargado de la enterprise",-1)),n(F,null,{default:m(()=>[n(O,null,{default:m(()=>[z(" Nombre: "+_(e.enterprise.user.name),1)]),_:1}),n(O,null,{default:m(()=>[z(" Email: "+_(e.enterprise.user.email),1)]),_:1})]),_:1})])):w("",!0)]),n(s,{enterprise:e.enterprise.slug},null,8,["enterprise"]),n(i,{documents:e.documents,onRefetch:e.refetchDocuments},null,8,["documents","onRefetch"])])),e.isLoading?(o(),g("div",bt,"Cargando...")):w("",!0),e.enterpriseNoExiste?(o(),g("div",xt,[a("h4",wt,[t[4]||(t[4]=z(" no existe esta enterprise ")),n(B,{name:"warning",size:"50px",color:"warning"})])])):w("",!0)])}var Pt=A(dt,[["render",kt]]);export{Pt as default};
