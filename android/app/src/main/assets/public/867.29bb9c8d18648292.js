"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[867],{867:(h,a,i)=>{i.r(a),i.d(a,{FournisseursEspacePage:()=>f});var c=i(177),u=i(4341),s=i(9935),n=i(3953),l=i(1626);let p=(()=>{var e;class o{constructor(t){this.http=t,this.baseUrl="http://localhost:8080/api/fournisseurs"}getFournisseurPublic(){return this.http.get(`${this.baseUrl}/public`)}}return(e=o).\u0275fac=function(t){return new(t||e)(n.KVO(l.Qq))},e.\u0275prov=n.jDH({token:e,factory:e.\u0275fac,providedIn:"root"}),o})();function g(e,o){1&e&&n.nrm(0,"ion-icon",17)}function F(e,o){1&e&&n.nrm(0,"ion-icon",18)}function m(e,o){if(1&e&&(n.j41(0,"ion-card")(1,"ion-card-header")(2,"div",8)(3,"ion-card-title",9),n.EFF(4),n.k0s(),n.j41(5,"ion-card-subtitle",10),n.DNE(6,g,1,0,"ion-icon",11)(7,F,1,0,"ion-icon",12),n.k0s()()(),n.j41(8,"ion-card-content")(9,"p",13)(10,"strong"),n.EFF(11),n.k0s()(),n.j41(12,"div",8)(13,"p"),n.nrm(14,"ion-icon",14),n.j41(15,"strong"),n.EFF(16),n.k0s()(),n.j41(17,"p"),n.nrm(18,"ion-icon",15),n.j41(19,"strong"),n.EFF(20),n.k0s()()(),n.j41(21,"div",16)(22,"strong"),n.EFF(23),n.k0s()()()()),2&e){const r=o.$implicit,t=n.XpG();n.R7$(4),n.JRh(r.fournName),n.R7$(2),n.Y8G("ngForOf",t.getStars(r.noteMoyenne||0)),n.R7$(),n.Y8G("ngForOf",t.getEmptyStars(r.noteMoyenne||0)),n.R7$(4),n.SpI(" ",r.service,""),n.R7$(5),n.SpI(" ",r.email," "),n.R7$(4),n.JRh(r.telephone),n.R7$(3),n.SpI(" ",r.commentaire," ")}}let f=(()=>{var e;class o{constructor(t){this.fournisseurespaceServie=t,this.fournisseurs=[]}ngOnInit(){this.fournisseurespaceServie.getFournisseurPublic().subscribe(t=>{this.fournisseurs=t,console.log("mes frs public :",this.fournisseurs)})}getStars(t){return Array(Math.round(t)).fill(0)}getEmptyStars(t){return Array(5-Math.round(t)).fill(0)}}return(e=o).\u0275fac=function(t){return new(t||e)(n.rXU(p))},e.\u0275cmp=n.VBU({type:e,selectors:[["app-fournisseurs-espace"]],standalone:!0,features:[n.aNF],decls:16,vars:3,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["size","large"],[1,"section-title"],[1,"content-wrapper"],[4,"ngFor","ngForOf"],[1,"ok"],[1,"title"],[1,"star-rating"],["name","star",4,"ngFor","ngForOf"],["name","star-outline",4,"ngFor","ngForOf"],[1,"margin"],["name","mail-outline"],["name","call-outline"],[1,"commentaire"],["name","star"],["name","star-outline"]],template:function(t,d){1&t&&(n.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),n.EFF(3,"Fournisseurs Espace"),n.k0s(),n.j41(4,"ion-buttons",1),n.nrm(5,"ion-menu-button"),n.k0s()()(),n.j41(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title",4),n.EFF(10,"Fournisseurs Espace"),n.k0s()()(),n.j41(11,"div",5)(12,"h2"),n.EFF(13,"Espace Fournisseur"),n.k0s()(),n.j41(14,"div",6),n.DNE(15,m,24,7,"ion-card",7),n.k0s()()),2&t&&(n.Y8G("translucent",!0),n.R7$(6),n.Y8G("fullscreen",!0),n.R7$(9),n.Y8G("ngForOf",d.fournisseurs))},dependencies:[s.QW,s.W9,s.eU,s.MC,s.BC,s.ai,c.MD,c.Sq,u.YN,s.b_,s.ME,s.tN,s.HW,s.iq,s.I9],styles:['@charset "UTF-8";.star-rating[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px;color:gold}.star-rating[_ngcontent-%COMP%]   ion-icon[name=star-outline][_ngcontent-%COMP%]{color:#d3d3d3}.ok[_ngcontent-%COMP%]{display:flex;gap:1.5rem;align-items:center}.title[_ngcontent-%COMP%]{font-size:.8rem;font-weight:700}.commentaire[_ngcontent-%COMP%]{border-radius:10px;border:1px solid black;height:10vh;padding:8px 10px;margin-top:10px}.margin[_ngcontent-%COMP%]{margin-bottom:10px}.section-title[_ngcontent-%COMP%]{padding:16px}.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:24px;text-align:center}']}),o})()}}]);