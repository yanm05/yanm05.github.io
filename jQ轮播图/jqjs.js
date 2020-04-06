            function SimpleSwiper(selecter, options) {
                this.$root = $(selecter);
                this.current = 0;
                this.w = this.$root.width();
                this.h = this.$root.height();
                this.$items = this.$root.find(".swiper-wrapper .swiper-slide");
                this.$wrap = this.$root.find(".swiper-wrapper");
                this.$pagination = this.$root.find(".swiper-pagination");
 
                this.$prevButton = this.$root.find(".swiper-button-prev");
                this.$nextButton = this.$root.find(".swiper-button-next");
 
                this.init();
                this.drawDot();
                this.bindDotsClick();
                this.bindButtonClick();
                this.onMouse()
                if(options==true){
                    this.automaticallyRound()
                }
                console.log(options)
                
            }
 
            SimpleSwiper.prototype.init = function() {
                this.$wrap.css("width", this.$items.length * this.w + "px");
                this.$items.css("width", this.w + "px");
            };
            SimpleSwiper.prototype.drawDot = function() {
                var _this = this;
                this.$items.each(function(index, element) {
                    // console.log(_this);
                    if (_this.current === index) {
                        _this.$pagination.append("<span class='active'></span>");
                    } else {
                        _this.$pagination.append("<span></span>");
                    }
                });
                _this.$dots = this.$pagination.find("span");
            };
 
            SimpleSwiper.prototype.bindDotsClick = function() {
                var _this = this;
                this.$dots.click(function() {
                    // console.log($(this).index());
                    var index = $(this).index();
                    _this.move(index);
                });
            };
 
            // 高亮小点点
            SimpleSwiper.prototype.activePoint = function(index) {
                this.$dots
                    .eq(index)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            };
 
            // 显示第几个
            SimpleSwiper.prototype.showPic = function(index) {
                if (this.current < index) {
                    // 如果即将显示的 在后面
                    // 准备后面的图片
                    this.$root
                        .find(".swiper-wrapper .swiper-slide")
                        .eq(0)
                        .after(this.$items.eq(index));
 
                    // 移动到后面一张
                    this.nextPic();
                } else {
                    // 如果即将显示的 在前面
                    this.$root
                        .find(".swiper-wrapper .swiper-slide")
                        .eq(0)
                        .before(this.$items.eq(index));
                    this.prevPic();
                }
            };
 
            SimpleSwiper.prototype.move = function(index) {
                // 准备即将要显示的图片
                this.showPic(index);
                // 高亮即将要显示的点点
                this.activePoint(index);
                // 改变当前索引
                this.current = index;
            };
 
            SimpleSwiper.prototype.nextPic = function() {
                var _this = this;
                // this是实例对象
                this.$wrap.animate({ left: -this.w + "px" }, 300, function() {
                    // console.log(this); this是dom对象wrap 可以用父级函数的_this代表实例对象
                    _this.$wrap.append(_this.$root.find(".swiper-wrapper .swiper-slide").eq(0)).css("left", "0px");
                });
            };
 
            SimpleSwiper.prototype.prevPic = function() {
                var _this = this;
                this.$wrap.css("left", -this.w + "px").animate({ left: "0px" }, 300);
            };
 
            SimpleSwiper.prototype.handleNext = function(e) {
                // console.log(e.data.obj);
                var _this;
                if (e && e.data.obj) {
                    _this = e.data.obj;
                } else {
                    _this = this;
                }
                // 事件函数 this函数运行时所挂在的对象 this是
                var nextIndex = _this.current + 1 > _this.$items.length - 1 ? 0 : _this.current + 1;
                _this.move(nextIndex);
                
            };
            SimpleSwiper.prototype.handlePrev = function(e) {
                var _this;
                if (e && e.data.obj) {
                    _this = e.data.obj;
                } else {
                    _this = this;
                }
 
                var prevIndex = _this.current - 1 < 0 ? _this.$items.length - 1 : _this.current - 1;
                _this.move(prevIndex);
            };
            SimpleSwiper.prototype.bindButtonClick = function() {
                console.log({ obj: this })
                this.$nextButton.on("click", { obj: this }, this.handleNext);
                this.$prevButton.on("click", { obj: this }, this.handlePrev);
            };
            SimpleSwiper.prototype.onMouse=function(){
                var _this=this;
                this.$root.mouseenter(function(){
                    _this.$prevButton.show();
                    _this.$nextButton.show();

                })
                this.$root.mouseleave(function(){
                    _this.$prevButton.hide();
                    _this.$nextButton.hide();
                })
                
            }
            SimpleSwiper.prototype.automaticallyRound=function(){
                var _this=this;
                this.timer=setInterval(function(){
                    _this.handleNext();
                },2000)
            };

           