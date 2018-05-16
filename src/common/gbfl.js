/**
 * 全局变量通用文件
 */
(function (global, undefined) {
  var GBFL = global.GBFL = {
    version: '4.0.0',
    MSG: {}
  }

  GBFL.Cache = {
    get: function (key) {
      if (typeof key !== 'string') return

      var value = null
      var str = global.localStorage.getItem(key)
      try {
        value = JSON.parse(str)
      } catch (e) {
        value = str
      }

      return value
    },
    set: function (key, value) {
      if (typeof key !== 'string') return
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      try {
        global.localStorage.setItem(key, value)
      } catch (e) {
        console.log(e)
      }
    },
    remove: function (key) {
      if (typeof key !== 'string') return
      global.localStorage.removeItem(key)
    },
    clear: function () {
      global.localStorage.clear()
    }
  }
  GBFL.Util = {
    deepCopy: function deepCopy(parent, child) {
      child = child || {};
      for(var i in parent) {
        if(parent.hasOwnProperty(i)) {
        //检测当前属性是否为对象
          if(typeof parent[i] === "object") {
            //如果当前属性为对象，还要检测它是否为数组
            //这是因为数组的字面量表示和对象的字面量表示不同
            //前者是[],而后者是{}
            child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
            //递归调用extend
            deepCopy(parent[i], child[i]);
          } else {
            child[i] = parent[i];
          }
        }
      }
      return child;
    },
    openDateFormat: function(){
      Date.prototype.format = function(fmt) { 
        var o = { 
          "M+" : this.getMonth()+1,                 //月份 
          "d+" : this.getDate(),                    //日 
          "h+" : this.getHours(),                   //小时 
          "m+" : this.getMinutes(),                 //分 
          "s+" : this.getSeconds(),                 //秒 
          "q+" : Math.floor((this.getMonth()+3)/3), //季度 
          "S"  : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt; 
      }
    },
    closeDateFormat: function(){
      Date.prototype.format = undefined
    },
    formatJSON: function(txt,compress){
      var indentChar = '    ';
	    if(/^\s*$/.test(txt)){   
	        return '';
      }
      
	    try{var data=eval('('+txt+')');}   
	    catch(e){   
	        alert('数据源语法错误,格式化失败! 错误信息: '+e.description,'err');   
	        return;   
	    };  
	    var draw=[],last=false,This=this,line=compress?compress:'\n',nodeCount=0,maxDepth=0;   
	       
	    var notify=function(name,value,isLast,indent,formObj){   
	        nodeCount++; 
	        for (var i=0,tab='';i<indent;i++ )tab+=indentChar;  
	        tab=compress?'':tab;  
	        maxDepth=++indent;  
	        if(value&&value.constructor==Array){
	            draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);
	            for (var i=0;i<value.length;i++)   
	                notify(i,value[i],i==value.length-1,indent,false);   
	            draw.push(tab+']'+(isLast?line:(','+line)));
	        }else if(value&&typeof value=='object'){
                draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line); 
                var len=0,i=0;   
                for(var key in value)len++;   
                for(var key in value)notify(key,value[key],++i==len,indent,true);   
                draw.push(tab+'}'+(isLast?line:(','+line)));
	        }else{   
                if(typeof value=='string')value='"'+value+'"';   
                draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
            };   
	    };   
	    var isLast=true,indent=0;   
      notify('',data,isLast,indent,false);
	    return draw.join('');   
    }
  }
})(window)
