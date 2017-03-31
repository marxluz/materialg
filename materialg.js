(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.materialg=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){module.exports={view:require("./view/index"),validate:require("./validate/index"),plugins:require("./plugins/index")}},{"./plugins/index":3,"./validate/index":7,"./view/index":14}],2:[function(require,module,exports){var mgdate=function(element){var self=this;var lang=$(element).data("lang")!==undefined?$(element).data("lang"):"pt";$(element).on("click",function(){var val=$(this).val();$(this).attr("readonly",true);var day="",month="",year="";var arrayValue=val.split("-");var valid=self.validDate(arrayValue[2],arrayValue[1],arrayValue[0]);if(val===undefined||val===""||valid===false){var today=new Date;day=today.getDate();month=today.getMonth()+1;year=today.getFullYear()}else{day=Number(arrayValue[2]);month=Number(arrayValue[1]);year=Number(arrayValue[0])}self.init($(this),day,month,year,lang)})};mgdate.prototype.init=function(element,day,month,year,lang){this.element=element;this.day=day;this.month=month;this.year=year;this.lang=lang;this.loadHtml();$("#MG_Date_Back").fadeIn("fast");this.dayAdjust=1;this.monthAdjust=1;this.yearAdjust=1;this.loadDays();this.loadYears();elMonth=this.loadMonths();elDay=this.loadDays();this.setYear(this.year);this.setMonth(elMonth);this.setDay(elDay);this.events()};mgdate.prototype.setDay=function(element){if(element.length>0){this.jumpToDay(element)}else{$("#MG_Date_day .scroller").html("");var selected=this.loadDays();this.jumpToDay(selected)}};mgdate.prototype.goToDay=function(element,velocity){if(velocity===undefined){velocity=200}var cont=element.parent();this.dayAdjust=0;this.day=Number(element.data("day"));$("#dSelected").attr("id","");element.attr("id","dSelected");this.loadDays();scrollValue=this.getScrollValueEl(element);var self=this;cont.animate({scrollTop:scrollValue},velocity,function(){if(element.data("type")==="f"){var realId="d"+self.day;self.jumpToDay(realId)}setTimeout(function(){self.dayAdjust=1},300)})};mgdate.prototype.jumpToDay=function(el){this.day=el.data("day");var cont=el.parent();var newValue=this.getScrollValueEl(el);cont.scrollTop(newValue)};mgdate.prototype.getDayHtml=function(day,selected){var div=document.createElement("div");$(div).attr("data-day",day);if(selected===true){$(div).attr("id","dSelected")}if(day>28){$(div).attr("class","d"+day)}var nDay=day<10?"0"+day:day;var t=document.createTextNode(nDay);div.appendChild(t);return $(div)};mgdate.prototype.reloadDays=function(){var lastDay=this.lastDayMonth(this.year,this.month);var dif=lastDay-this.day;el=$("#dSelected");if(dif<0){for(var i=0;i>dif;i--){prev=el.prev();el=prev}}this.goToDay(el);$("#MG_Date_day .scroller").html("");this.loadDays()};mgdate.prototype.loadDays=function(){var div=this.getDayHtml(this.day,true);if($("#dSelected").length===0){$("#MG_Date_day .scroller").append(div)}var lastDay=this.lastDayMonth(this.year,this.month);this.loadPrevDays(lastDay);this.loadNextDays(lastDay);return $("#dSelected")};mgdate.prototype.loadPrevDays=function(lastDay){var selected=$("#dSelected");var tDay=this.day-1;var prev=selected.prev();for(var i=0;i<60;i++){if(tDay===0){tDay=lastDay}var html=this.getDayHtml(tDay);if(prev.length===0){$("#MG_Date_day .scroller").prepend(html)}else{prev.html(html.html())}prev=prev.prev();--tDay}var i2=0;while(prev.length!=0){if(tDay===0){tDay=lastDay}var tPrev=prev.prev();prev.remove();prev=tPrev;--tDay}};mgdate.prototype.loadNextDays=function(lastDay){var selected=$("#dSelected");var tDay=this.day+1;var next=selected.next();for(var i=0;i<60;i++){if(tDay===lastDay+1){tDay=1}if(next.length===0){var html=this.getDayHtml(tDay);$("#MG_Date_day .scroller").append(html)}next=next.next();++tDay}while(next.length!=0){if(tDay===lastDay+1){tDay=1}var tNext=next.next();next.remove();next=tNext;++tDay}};mgdate.prototype.infiniteScrollDay=function(){var cont=$("#MG_Date_day .scroller");var wait=250;if(this.dayAdjust===1){clearTimeout($.data(this,"scrollTimer"));var self=this;$.data(this,"scrollTimer",setTimeout(function(){self.adjustScrollDay()},wait))}};mgdate.prototype.adjustScrollDay=function(){if(this.dayAdjust===1){var self=this;var cel=$("#MG_Date_day .scroller div:nth-child(1)");var halfCelHeight=cel.height()/2;$("#MG_Date_day .scroller div").each(function(){if($(this).position().top>-halfCelHeight){var correct=$(this).next().next();self.goToDay(correct,50);return false}})}};mgdate.prototype.setMonth=function(element){if(element.length>0){this.jumpToMonth(element)}else{$("#MG_Date_month .scroller").html("");var selected=this.loadMonths();this.jumpToMonth(selected)}};mgdate.prototype.goToMonth=function(element,velocity){var elYear=Number(element.data("year"));if(velocity===undefined){velocity=200}var cont=element.parent();this.monthAdjust=0;this.month=element.data("month");$("#mSelected").attr("id","");element.attr("id","mSelected");this.reloadDays();this.loadMonths();scrollValue=this.getScrollValueEl(element);var self=this;cont.animate({scrollTop:scrollValue},velocity,function(){setTimeout(function(){self.monthAdjust=1},300)})};mgdate.prototype.jumpToMonth=function(el){this.month=el.data("month");var cont=el.parent();var newValue=this.getScrollValueEl(el);cont.scrollTop(newValue)};mgdate.prototype.infiniteScrollMonth=function(){var cont=$("#MG_Date_month .scroller");var wait=250;if(this.monthAdjust===1){clearTimeout($.data(this,"scrollTimer"));var self=this;$.data(this,"scrollTimer",setTimeout(function(){self.adjustScrollMonth()},wait))}};mgdate.prototype.adjustScrollMonth=function(){if(this.monthAdjust===1){var self=this;var cel=$("#MG_Date_month .scroller div:nth-child(1)");var halfCelHeight=cel.height()/2;$("#MG_Date_month .scroller div").each(function(){if($(this).position().top>-halfCelHeight){var correct=$(this).next().next();self.goToMonth(correct,50);return false}})}};mgdate.prototype.loadMonths=function(){var div=this.getMonthHtml(this.month,this.year,true);if($("#mSelected").length===0){$("#MG_Date_month .scroller").append(div)}this.loadPrevMonths();this.loadNextMonths();return $("#mSelected")};mgdate.prototype.getMonthHtml=function(month,year,selected){if(month===0){month=12;--year}var div=document.createElement("div");div.setAttribute("data-month",month);if(selected!==undefined){div.setAttribute("id","mSelected")}var nMonth=this.monthNames[this.lang][month];var t=document.createTextNode(nMonth);div.appendChild(t);return $(div)};mgdate.prototype.loadPrevMonths=function(){var selected=$("#mSelected");var tMonth=this.month-1;var tYear=this.year;var prev=selected.prev();for(var i=0;i<60;i++){if(tMonth===0){tMonth=12;tYear--}if(prev.length===0){var html=this.getMonthHtml(tMonth,tYear);$("#MG_Date_month .scroller").prepend(html)}prev=prev.prev();--tMonth}while(prev.length!=0){if(tMonth===0){tMonth=12}var tPrev=prev.prev();prev.remove();prev=tPrev;--tMonth}};mgdate.prototype.loadNextMonths=function(){var selected=$("#mSelected");var tMonth=this.month+1;var tYear=this.year;var next=selected.next();for(var i=0;i<60;i++){if(tMonth===13){tMonth=1}if(next.length===0){var html=this.getMonthHtml(tMonth,tYear);$("#MG_Date_month .scroller").append(html)}next=next.next();++tMonth}while(next.length!=0){if(tMonth===13){tMonth=1}var tNext=next.next();next.remove();next=tNext;++tMonth}};mgdate.prototype.setYear=function(element){if(element.length>0){this.jumpToYear(element)}else{$("#MG_Date_year .scroller").html("");var selected=this.loadYears();this.jumpToYear(selected)}};mgdate.prototype.goToYear=function(element,velocity){if(velocity===undefined){velocity=200}var cont=element.parent();this.yearAdjust=0;this.year=Number(element.data("year"));$("#ySelected").attr("id","");element.attr("id","ySelected");this.loadYears();this.reloadDays();scrollValue=this.getScrollValueEl(element);var self=this;cont.animate({scrollTop:scrollValue},velocity,function(){if(element.data("type")==="f"){var realId="d"+self.year;self.jumpToYear(realId)}setTimeout(function(){self.yearAdjust=1},300)})};mgdate.prototype.jumpToYear=function(el){this.year=el.data("year");var cont=el.parent();var newValue=this.getScrollValueEl(el);cont.scrollTop(newValue)};mgdate.prototype.getYearHtml=function(year,selected){var div=document.createElement("div");$(div).attr("data-year",year);if(selected===true){$(div).attr("id","ySelected")}if(year>28){$(div).attr("class","y"+year)}var nYear=year<10?"0"+year:year;var t=document.createTextNode(nYear);div.appendChild(t);return $(div)};mgdate.prototype.loadYears=function(){var div=this.getYearHtml(this.year,true);if($("#ySelected").length===0){$("#MG_Date_year .scroller").append(div)}this.loadPrevYears();this.loadNextYears();return $("#ySelected")};mgdate.prototype.loadPrevYears=function(){var selected=$("#ySelected");var tYear=this.year-1;var prev=selected.prev();for(var i=0;i<60;i++){var html=this.getYearHtml(tYear);if(prev.length===0){$("#MG_Date_year .scroller").prepend(html)}else{prev.html(html.html())}prev=prev.prev();--tYear}var i2=0;while(prev.length!=0){var tPrev=prev.prev();prev.remove();prev=tPrev;--tYear}};mgdate.prototype.loadNextYears=function(){var selected=$("#ySelected");var tYear=this.year+1;var next=selected.next();for(var i=0;i<60;i++){if(next.length===0){var html=this.getYearHtml(tYear);$("#MG_Date_year .scroller").append(html)}next=next.next();++tYear}while(next.length!=0){var tNext=next.next();next.remove();next=tNext;++tYear}};mgdate.prototype.infiniteScrollYear=function(){var cont=$("#MG_Date_year .scroller");var wait=250;if(this.yearAdjust===1){clearTimeout($.data(this,"scrollTimer"));var self=this;$.data(this,"scrollTimer",setTimeout(function(){self.adjustScrollYear()},wait))}};mgdate.prototype.adjustScrollYear=function(){if(this.yearAdjust===1){var self=this;var cel=$("#MG_Date_year .scroller div:nth-child(1)");var halfCelHeight=cel.height()/2;$("#MG_Date_year .scroller div").each(function(){if($(this).position().top>-halfCelHeight){var correct=$(this).next().next();self.goToYear(correct,50);return false}})}};mgdate.prototype.getScrollValue=function(id){var element=$("#"+id);var scrollTarget=element.prev().prev();var cont=element.parent();var scrollValue=cont.scrollTop()+scrollTarget.position().top;return scrollValue};mgdate.prototype.getScrollValueEl=function(element){var scrollTarget=element.prev().prev();var cont=element.parent();var scrollValue=cont.scrollTop()+scrollTarget.position().top;return scrollValue};mgdate.prototype.events=function(id){var self=this;$("body").delegate("#MG_Date_day .scroller div","click",function(){if(self.dayAdjust===1){self.goToDay($(this))}});$("#MG_Date_day .scroller").scroll(function(){self.infiniteScrollDay()});$("body").delegate("#MG_Date_month .scroller div","click",function(){if(self.monthAdjust===1){self.goToMonth($(this))}});$("#MG_Date_month .scroller").scroll(function(){self.infiniteScrollMonth()});$("body").delegate("#MG_Date_year .scroller div","click",function(){if(self.yearAdjust===1){self.goToYear($(this))}});$("#MG_Date_year .scroller").scroll(function(){self.infiniteScrollYear()});$("#MG_Date_Buttons .cancel").on("click",function(){self.cancel()});$("#MG_Date_Buttons .send").on("click",function(){self.send()})};mgdate.prototype.cancel=function(){$("#MG_Date_Back").fadeOut("fast",function(){$(this).remove()})};mgdate.prototype.send=function(){var day=this.day;var month=this.month;var year=this.year;if(day<10){day="0"+day}if(month<10){month="0"+month}var countYear=year.toString().length;var difYear=4-countYear;while(difYear>0){year="0"+year;difYear--}this.element.val(year+"-"+month+"-"+day);this.cancel()};mgdate.prototype.monthNames={pt:["","Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],es:["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],en:["","January","February","March","April","May","June","July","August","September","October","November","December"]};mgdate.prototype.text={pt:{cancel:"cancelar",send:"confirmar"},es:{cancel:"cancelar",send:"confirmar"},en:{cancel:"cancel",send:"confirm"}};mgdate.prototype.lastDayMonth=function(year,month){var year=Number(year);var month=Number(month);var lastDay=new Date(year,month);lastDay.setDate(0);return lastDay.getUTCDate()};mgdate.prototype.validDate=function(d,m,y){var date=new Date(y,m-1,d);return date.getFullYear()==y&&date.getMonth()+1==m&&date.getDate()==d};mgdate.prototype.loadHtml=function(){self=this;if($("#MG_Date_Back").length===0){var mgDateBack=document.createElement("div");mgDateBack.setAttribute("id","MG_Date_Back");var mgDateContainer=document.createElement("div");mgDateContainer.setAttribute("id","MG_Date_Container");mgDateBack.appendChild(mgDateContainer);var mgDate=document.createElement("div");mgDate.setAttribute("id","MG_Date");mgDate.setAttribute("class","MG_Date");var mgDateButtons=document.createElement("div");mgDateButtons.setAttribute("id","MG_Date_Buttons");mgDateContainer.appendChild(mgDate);var celDay=document.createElement("div");celDay.setAttribute("id","MG_Date_celday");var day=document.createElement("div");day.setAttribute("id","MG_Date_day");var scroller=document.createElement("div");scroller.className="scroller";mgDate.appendChild(celDay);celDay.appendChild(day);day.appendChild(scroller);var celMonth=document.createElement("div");celMonth.setAttribute("id","MG_Date_celmonth");var month=document.createElement("div");month.setAttribute("id","MG_Date_month");var scroller2=document.createElement("div");scroller2.className="scroller";mgDate.appendChild(celMonth);celMonth.appendChild(month);month.appendChild(scroller2);var celYear=document.createElement("div");celYear.setAttribute("id","MG_Date_celyear");var year=document.createElement("div");year.setAttribute("id","MG_Date_year");var scroller3=document.createElement("div");scroller3.className="scroller";mgDate.appendChild(celYear);celYear.appendChild(year);year.appendChild(scroller3);var cover=document.createElement("div");cover.setAttribute("id","MG_Date_cover");cover.className="MG_Date";mgDate.appendChild(cover);var d1=document.createElement("div");var d2=document.createElement("div");var d3=document.createElement("div");cover.appendChild(d1);cover.appendChild(d2);cover.appendChild(d3);mgDateContainer.appendChild(mgDateButtons);var ipCancel=document.createElement("input");ipCancel.id="MG_Date_Cancel";ipCancel.type="button";ipCancel.className="cancel";ipCancel.value=self.text[this.lang]["cancel"];var ipSend=document.createElement("input");ipSend.id="MG_Date_Send";ipSend.type="button";ipSend.className="send";ipSend.value=self.text[this.lang]["send"];mgDateButtons.appendChild(ipCancel);mgDateButtons.appendChild(ipSend);$("body").append(mgDateBack)}};$.fn.mgdate=function(){new mgdate($(this));return this};module.exports=mgdate},{}],3:[function(require,module,exports){module.exports={Date:require("./date")}},{"./date":2}],4:[function(require,module,exports){var Checked=function(elements){this.elements=elements;this.msg="Selecione um dos campos"};module.exports=Checked;Checked.prototype.isValid=function(value,cb){var res=false;if(this.elements.filter(":checked").size()==1)res=true;cb(res)}},{}],5:[function(require,module,exports){var Container=function(){this.elements=[]};module.exports=Container;Container.prototype.append=function(element){this.elements.push(element)};Container.prototype.isValid=function(cb,obj){var promises=[];for(var e in this.elements){var element=this.elements[e];var def=new $.Deferred(function(def){element.isValid(function(res){def.resolve(res)},obj)});promises.push(def)}$.when.apply(undefined,promises).promise().done(function(){var args=Array.prototype.slice.call(arguments);cb(args.indexOf(false)<0)})};Container.prototype.getValues=function(){var values={};for(var e in this.elements){var element=this.elements[e];var name=!!element.name?element.name:element.attr("name");if(!!name)values[name]=element.getValue()}return values}},{}],6:[function(require,module,exports){var Decorator=function(element,msg){if(element.validators)return element;element.validators=[];element.filters=[];if(!element.name)element.name=element.attr("name");element.addValidator=function(validator){this.validators.push(validator)};element.addFilter=function(filter){this.filter.push(filter)};element.getValue=function(){var value=this.val().trim();for(var f in this.filters){var filter=this.filters[f];var value=filter.filter(value)}return value};element.isValid=function(cb,obj){var self=this;var res=true;var promises=[];var value=this.getValue();if(msg)msg.text("");element.removeClass("invalid");for(var v in this.validators){var validator=this.validators[v];var def=new $.Deferred(function(def){validator.isValid(value,function(res){if(!res&&msg){msg.text(validator.msg);element.addClass("invalid")}def.resolve(res)},obj)});promises.push(def)}$.when.apply(undefined,promises).promise().done(function(){var args=Array.prototype.slice.call(arguments);if(args.indexOf(false)>=0){cb(false)}else{cb(true)}})};return element};module.exports=Decorator},{}],7:[function(require,module,exports){module.exports={Container:require("./container"),Decorator:require("./decorator"),Checked:require("./checked"),NotEmpty:require("./notEmpty"),NotEmptyDependent:require("./notEmptyDependent")}},{"./checked":4,"./container":5,"./decorator":6,"./notEmpty":8,"./notEmptyDependent":9}],8:[function(require,module,exports){var NotEmpty=function(){this.msg="Campo obrigatório"};module.exports=NotEmpty;NotEmpty.prototype.isValid=function(value,cb){var value=value.trim();if(value===null||value==undefined||value==""){return cb(false)}return cb(true)}},{}],9:[function(require,module,exports){var NotEmptyDependent=function(dep){this.dependent=dep;this.msg="Campo obrigatório"};module.exports=NotEmptyDependent;NotEmptyDependent.prototype.isValid=function(value,cb){if(value==""){var dep=this.dependent.val();if(dep!="")return cb(false)}return cb(true)}},{}],10:[function(require,module,exports){var View=require("../view");var base=function(){this.list=[];this.name=!!name?name:"";this.label="";this.value=null;this.container=null};base.prototype=new View;base.prototype.constructor=base;module.exports=base;base.prototype.setLabel=function(label){this.label=label};base.prototype.val=function(value){if(value===undefined){return this.value}else{this.value=value;this.makeInputs()}};base.prototype.attr=function(){};base.prototype.removeClass=function(){};base.prototype.makeInputs=function(){}},{"../view":15}],11:[function(require,module,exports){module.exports={Base:require("./base"),Radio:require("./radio"),TextMultiRow:require("./textMultiRow")}},{"./base":10,"./radio":12,"./textMultiRow":13}],12:[function(require,module,exports){var Base=require("./base");var view=function(name){this.list=[];this.name=!!name?name:"";this.title="";this.value="";this.container=null};view.prototype=new Base;view.prototype.constructor=view;module.exports=view;view.prototype.setTitle=function(title){this.title=title};view.prototype.make=function(){var div=CE("div","box");var label=CE("label","item","item-input","item-stacked-label");div.append(label);var title=CE("span","wdl").text(this.title);label.append(title);this.message=CE("span","wdl","error");label.append(this.message);this.container=CE("div","box");this.makeInputs();div.append(this.container);return div};view.prototype.makeInputs=function(){var self=this;this.container.html("");for(var x in this.list){var key=this.list[x][0];var label=this.list[x][1];var input=CE("input").attr({type:"radio",name:this.name,value:key});input.css({"float":"right",width:"30px",height:"2em",border:"0px"});this.container.append(CE("label","item").text(label).append(input));if(this.value==key)input.attr("checked","checked")}this.container.change(function(){self.value=self.container.find(":checked").val()})};view.prototype.add=function(key,label){this.list.push([key,label])}},{"./base":10}],13:[function(require,module,exports){var Base=require("./base");var view=function(name){this.list=[];this.name=!!name?name:"";this.title="";this.value="";this.container=null;this.sequence=0};view.prototype=new Base;view.prototype.constructor=view;module.exports=view;view.prototype.setTitle=function(title){this.title=title};view.prototype.make=function(){var self=this;var div=CE("div","form-group");var label=CE("label").text(this.title);div.append(label);this.input=CE("input","form-control").attr({type:"text"});this.input.focusout(function(){self.add.call(self)});div.append(this.input);this.list=CE("div","box");div.append(this.list);this.output=CE("input").attr({type:"hidden",name:this.name});div.append(this.output);return div};view.prototype.add=function(){var found=false;var text=this.input.val().trim();if(text=="")return;var rowid=parseInt(this.input.attr("rowid"));if(isNaN(rowid))rowid=--this.sequence;var values=this.getValues();for(var v in values){var value=values[v];if(value.id==rowid){found=true;values[v].value=text;break}}if(!found){values.push({id:rowid,value:text})}this.setValues(values);this.refresh(values);this.clear_input();this.input.focus()};view.prototype.clear_input=function(){this.input.val("");this.input.attr("rowid","")};view.prototype.refresh=function(values){var self=this;this.list.html("");var div=CE("div","box").css({border:"1px solid #ccc","margin-top":"5px"});this.list.append(div);var values=!!values?values:this.getValues();if(values.length==0){div.remove();return}for(var v in values){var value=values[v];var row=CE("div","box").css({"border-bottom":"1px solid #ccc",padding:"5px"}).attr("rowid",value.id);div.append(row);var text=CE("span","left").text(value.value);row.append(text);(function(value){var del=CE("button","btn","btn-danger","btn-xs","right").attr({type:"button"}).text("Apagar");del.click(function(){self.delete.call(self,value.id)});row.append(del);var edit=CE("button","btn","btn-warning","btn-xs","right").attr({type:"button"}).text("Editar");edit.click(function(){self.edit.call(self,value.id)});row.append(edit)})(value)}};view.prototype.edit=function(id){var values=this.getValues();var self=this;for(var v in values){var value=values[v];if(value.id==id){self.input.val(value.value);self.input.attr("rowid",value.id);break}}};view.prototype.delete=function(id){var values=this.getValues();var self=this;for(var v in values){var value=values[v];if(value.id==id){values.splice(v,1);break}}this.setValues(values);this.refresh()};view.prototype.getValues=function(){var json_data=this.output.val();if(json_data=="")json_data="[]";return JSON.parse(json_data)};view.prototype.setValues=function(values){var json_data=JSON.stringify(values);this.output.val(json_data)}},{"./base":10}],14:[function(require,module,exports){module.exports={View:require("./view"),field:require("./field/index")}},{"./field/index":11,"./view":15}],15:[function(require,module,exports){var CE=function(tag){var element=$(document.createElement(tag));for(var i=1;i<arguments.length;i++){element.addClass(arguments[i])}return element};window.CE=CE;var base=function(C){this.pos_make=[];this.pre_make=[];this.C=C};base.prototype.toString=function(){return this.render()};base.prototype.make=function(){};base.prototype.render=function(){var self=this;$.each(this.pre_make,function(k,v){v.call(self)});var render=this.make();$.each(this.pos_make,function(k,v){v.call(self)});return render};module.exports=base},{}]},{},[1])(1)});