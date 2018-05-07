/**
 * 1. 数据劫持
 * 2. 数据代理
 * 3. 模板编译
 * 4. 发布订阅
 * 5. 双向绑定 v-model
 * 6. 计算属性和观察者
 */

(function(exports) {
    exports.Mvvm = function(options) {
        this.$options = options;
        let data = this._data = this.$options.data;

        proxy(this._data, this); // 数据代理
        observe(data); // 数据劫持
        new Compile(this.$options.el, this);
    }


    function Observe(data) {
        let dep = new Dep();
        for(let key in data) {
            let val = data[key];
            observe(val); // 递归劫持

            Object.defineProperty(data, key, {
                configurable: true,
                get() {
                    Dep.target && dep.addSub(Dep.target); // 订阅 !important
                    return val;
                },
                set(newVal) {
                    if(val === newVal) {
                        return;
                    }

                    val = newVal; // get()的时候返回，闭包
                    observe(newVal); // 递归劫持
                    dep.notify(); // 发布
                }
            })
        }
    }

    function observe(data) {
        if(!data || typeof data !== 'object') {
            return;
        }
        return new Observe(data);
    }

    function proxy(source, proxier) {
        for(let key in source) {
            Object.defineProperty(proxier, key, {
                configurable: true,
                get() {
                    return source[key];
                },
                set(newVal) {
                    source[key] = newVal;
                }
            })
        }
    }

    // function Compile(el, vm) {
    //     vm.$el = document.querySelector(el);
    //     let template = vm.$options.template;
    //     template = template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function(match, p1) {
    //         let paths = p1.split('.');
    //         let val = vm;
    //         paths.forEach(path => {
    //             val = val[path]
    //         });
            
    //         return val;
    //     });
    //     // console.log('template', template);
    //     vm.$el.innerHTML = template;
    // }

    function Compile(el, vm) {
        vm.$el = document.querySelector(el);
        let template = vm.$options.template;
        let div = document.createElement('div');
        div.innerHTML = template;

        replace(div);
        vm.$el.appendChild(div.childNodes[0]);

        function replace(frag) {
            frag.childNodes.forEach(node => {
                let text = node.textContent;
                let reg = /\{\{\s*([\w.]+)\s*\}\}/g;

                if(node.nodeType === 3 && reg.test(text)) { // 文本节点
                    // function replaceText() {
                    //     node.textContent = txt.replace(reg, (matched, p1) => {
                    //         new Watcher(vm, p1, replaceText)
                    //     })
                    // }
                    // let exp = RegExp.$1;
                    // let paths = exp.split('.');
                    // let val = vm;
                    // paths.forEach(path => {
                    //     val = val[path];
                    // })

                    node.textContent = text.replace(reg, function(match, p1) {
                        new Watcher(vm, p1, newVal => {
                            node.textContent = text.replace(reg, newVal);
                        })
                        return getValFromExp(vm, p1);
                    });
                    
                }

                if(node.childNodes && node.childNodes.length) {
                    replace(node);
                }
            })
        }
    }

    function getValFromExp(obj, exp) {
        let paths = exp.split('.');
        let val = obj;
        paths.forEach(path => {
            val = val[path];
        });
        return val;
    }
    // 发布订阅
    function Dep() {
        this.subs = [];
    }

    Dep.prototype = {
        addSub(sub) {
            this.subs.push(sub);
        },
        notify() {
            this.subs.forEach(sub => {
                sub.update()
            })
        }
    }

    function Watcher(vm, exp, fn) {
        this.fn = fn;
        this.vm = vm;
        this.exp = exp;

        Dep.target = this;
        let val = getValFromExp(vm, exp);

        Dep.target = null;
    }
    Watcher.prototype.update = function() {
        let val = getValFromExp(this.vm, this.exp);
        this.fn(val);
    }
}) (window);
