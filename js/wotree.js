(
  function(){
     var  WoTree = function(treedom,template){
        return new WoTree.prototype.init(treedom,template);
    };

    WoTree.prototype = {
        constructor:WoTree,
        init:function(treedom){
            this.treedom = treedom;
        },
        leafHtml:function(name){
            return '<li class="nmtxt"><span class="tb tmg"></span>'+name+'</li>';
        },
        addParentNode:function(data){
           if(data&&data.name){
               if(data.child&&data.child.length>0){
                    var li = $('<li><p class="nmtxt"><span class="tb clo"></span>'+data.name+'</p><ul class="list" style="display:none"></ul></li>');
                    $(this.treedom).append(li);
                    //绑定单击事件
                    li.find('>p>span:first-child').click(function(){
                        WoTree.prototype.clickFun.call(this);
                    });
                    var ul = li.find('> ul');
                    for(var i=0;i<data.child.length;i++){
                        var c = data.child[i];
                        if(!c)continue;
                        var showName = c.name||'';
                        var ht = $(this.leafHtml(showName));
                        ht[0].data = c;
                        ul.append(ht);
                    }
               }else{
                    $(this.treedom).append(this.leafHtml(data.name));
               }
                
           } 
        },

        addLeafNode:function(data){
            
        },
        clickFun:function(){
          if($(this).hasClass('ope')){
            $(this).parent().find('+ul').hide();
            $(this).removeClass('ope').addClass('clo');
          }else{
            $(this).parent().find('+ul').show();
            $(this).removeClass('clo').addClass('ope');
          }
        },
        fotmat:function(){
            if(!this.treedom)return ;
            if('UL'!=this.treedom.nodeName)return;
            $(this.treedom).addClass("tree").css('display','table');
            var jqt = $(this.treedom);
            jqt.find(">li").each(function(){
                //是否为子节点
                var currLi = $(this);
                var tx = currLi.attr('tx')||currLi.text()||'';
                if(currLi.find('>ul').length<1){
                    currLi.addClass('nmtxt');
                    currLi.html('<span class="tb tmg"></span>'+tx);
                }else{
                    currLi.prepend('<p class="nmtxt"><span class="tb clo"></span>'+tx+'</p>');
                    currLi.find('ul').addClass('list').css('display','none');
                    
                }
                //绑定单击事件
                currLi.find('>p').find('span:first-child').click(function(){
                    WoTree.prototype.clickFun.call(this);
                });
            });
            return this;
        }
    };

    WoTree.prototype.init.prototype = WoTree.prototype;
    window.WoTree = WoTree;
  }()
);