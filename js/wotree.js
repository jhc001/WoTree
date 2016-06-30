(
  function(){
     var  WoTree = function(treedom,template){
        return new WoTree.prototype.init(treedom);
    };

    WoTree.prototype = {
        constructor:WoTree,
        init:function(treedom){
            if(typeof treedom==='string'){
                this.treedom = $(treedom)[0];
            }else{
                this.treedom = treedom;
            }
        },
        target:function(){
            return this.treedom;
        },
        append:function(tree){
            var dom = WoTree(tree).format().target();
            $(this.treedom).append(dom);
        },
        replace:function(tree){
            var dom = WoTree(tree).format().target();
            $(this.treedom).html(dom);
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
        format:function(){
            if(!this.treedom) throw 'the tree dom is null' ;
            if('UL'!=this.treedom.nodeName&&"LI"!=this.treedom.nodeName){
                throw 'the tree dom must be UL or LI:'+this.treedom.nodeName;
            }
            var curr = $(this.treedom);
            if(this.treedom.nodeName==='UL'){
                curr.addClass("tree");
                curr.find('>li').each(function(){
                    WoTree(this).format();
                });
            }else{
                var tx = curr.attr('tx')||curr.text()||''; //节点显示的内容
                //没有子节点
                if(curr.find('>ul').length<1){
                     curr.addClass("nmtxt").html('<span class="tb tmg"></span>'+tx);
                }else{
                    curr.prepend('<p class="nmtxt"><span class="tb clo"></span>'+tx+'</p>');
                    var ul = curr.find('>ul').hide()[0];
                     //绑定单击事件
                    curr.find('>p').find('span:first-child').click(function(){
                        WoTree.prototype.clickFun.call(this);
                    });
                    WoTree(ul).format();
                }
            }
            return this;
        }
    };
    WoTree.prototype.init.prototype = WoTree.prototype;
    window.WoTree = WoTree;
  }()
);