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
        cloneTree:function(template){
            $(template).find('>li').each(function(){
                var currLi = $(this);
                var showName = currLi.attr('sname')||currLi.text()||'';
                //判断是否为叶子节点
                if(currLi.find('>ul').length<1){
                    $(this.treedom).append(this.leafHtml(showName));
                }else{
                    $(this.treedom).addend('<li><li>');
                    var dom = $(this.treedom).find("li:last-child")[0];
                }
            });
        }
    };

    WoTree.prototype.init.prototype = WoTree.prototype;
    window.WoTree = WoTree;
  }()
);