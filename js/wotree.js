(
    var WoTree = function(treedom){
        return new WoTree.prototype.init(treedom);
    };

    WoTree.prototype = {
        constructor:WoTree,
        init:function(treedom){
            this.treedom = treedom;
            $(treedom).addClass("tree");
        }
    };
    WoTree.prototype.init.prototype = WoTree.prototype;
    window.WoTree = WoTree;
)