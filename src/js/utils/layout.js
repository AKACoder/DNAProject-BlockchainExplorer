import { BaseVar } from "./baseVar"

function createOrientationChangeProxy(fn, scope) {
    return function() {
        /*
         * 如果是Android浏览器，我们设想一种场景，手机从 竖屏-横屏-竖屏-横屏 时，
         * 这个过程经历了四次切换，但实际我们只需要处理最后一次切横屏的结果，
         * 那么，延迟300ms执行回调函数，可以在最开始时清除冗余的orientationChangedTimeout。
         */
        clearTimeout(scope.orientationChangedTimeout);
        let args = Array.prototype.slice.call(arguments, 0);
        scope.orientationChangedTimeout = setTimeout($.proxy(function() {
            /*
             * 再设想一种场景，手机从 竖屏-横屏-竖屏 时，在这个过程，系统并未改变任何东西，
             * 将lastOrientation保存下来，能有效的避免垃圾操作产生的回调处理
             */
            let ori = window.orientation;
            if (ori !== scope.lastOrientation) {
                fn.apply(scope, args); // 这里才是真正执行回调函数
            }
            scope.lastOrientation = ori;
        }, scope), $.os.android ? 300 : 0);
    };
}

const LayoutHelper = {


    PageLayout: function () {
        BaseVar.$body.css({
            "height": BaseVar.$window.height()
        });

        return this
    },

    OrientationChangePageLayout: function () {
        let _this = this
        let _timer = null

        _this.PageLayout()

        window.addEventListener('orientationchange', function () {
            if(null !== _timer) clearTimeout(_timer)
            _timer = setTimeout(function () {
                _this.PageLayout()
            }, 300)
        }, false);
    }
}

export {
    LayoutHelper
}