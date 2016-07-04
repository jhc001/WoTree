(
  function(){
     function WoTree(treedom){
        if(!(this.constructor===WoTree)){
            return new WoTree(treedom);
        }

        if(typeof treedom==='string'){
            this.treedom = $(treedom)[0];
        }else{
            this.treedom = treedom;
        }
     };

    WoTree.prototype = {
        constructor:WoTree,
        target:function(){
            return this.treedom;
        },
        append:function(tree,isParent){
            var dom = WoTree(tree).format(isParent).target();
            if($(this.treedom).find(">span:first-child").hasClass('clo')){
                $(dom).hide();
            }
            $(this.treedom).append(dom);
        },
        setName:function(name){
        	var curr= $(this.treedom);
        	curr.find('span[class=tx]').first().text(name);
        	curr.attr('tx',name);
        },
        replace:function(tree){
            if(tree){
        		 var dom = WoTree(tree).format().target();
        		 $(this.treedom).html(dom);
        	}else{
        		 $(this.treedom).html('');
        	}
        },
        clickFun:function(){
          if($(this).hasClass('ope')){
            $(this).parent().find('>ul').hide();
            $(this).removeClass('ope').addClass('clo');
          }else{
        	  $(this).parent().find('>ul').show();
            $(this).removeClass('clo').addClass('ope');
          }
        },
        format:function(isParent){
            if(!this.treedom) throw 'the tree dom is null' ;
            if('UL'!=this.treedom.nodeName&&"LI"!=this.treedom.nodeName){
                throw 'the tree dom must be UL or LI:'+this.treedom.nodeName;
            }
            var curr = $(this.treedom);
            if(this.treedom.nodeName==='UL'){
                curr.addClass("tree");
                curr.find('>li').each(function(){
                    var isParent = ($(this).attr('isParent')==='true');
                    WoTree(this).format(isParent);
                });
            }else{
                var tx = curr.attr('tx')||curr.text()||''; //节点显示的内容
                //有子节点
                if((curr.find('>ul').length>0)||isParent){
                    curr.prepend('<span class="tb clo"></span><span class="tx">'+tx+'</span>');
                    var ul = curr.find('>ul').hide()[0];
                     //绑定单击事件
                    curr.find('span:first-child').click(function(){
                        WoTree.prototype.clickFun.call(this);
                    });
                    if(ul)WoTree(ul).format();
                }else{
                	curr.html(curr.children()).prepend('<span class="tb tmg"></span><span class="tx">'+tx+'</span>');
                }
            }
            return this;
        }
    };

    WoTree.prototype.open = function(){
        if(this.treedom.nodeName==='LI'){
            var curr = $(this.treedom);
            var span = curr.find(">span:first-child").first();
            if(span.hasClass('clo')){
                span.click();   
            }
        }
    }

    WoTree.prototype.close = function(){
        if(this.treedom.nodeName==='LI'){
            var curr = $(this.treedom);
            var span = curr.find(">span:first-child");
            if(span.hasClass('ope')){
                span.click();   
            }
        }
    }
    window.WoTree = WoTree;
  }()
);